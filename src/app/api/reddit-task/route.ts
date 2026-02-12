import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import admin from 'firebase-admin';

// Firebase Admin SDK 초기화 - 쪼개놓은 3개의 변수를 직접 사용합니다.
if (!admin.apps.length) {
  const projectId = process.env.FB_PROJECT_ID;
  const clientEmail = process.env.FB_CLIENT_EMAIL;
  const privateKey = process.env.FB_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          // Vercel에서 줄바꿈(\n) 문자가 깨지는 것을 방지하는 처리
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
      console.log('Firebase Admin SDK initialized successfully');
    } catch (e) {
      console.error('Failed to initialize Firebase Admin SDK:', e);
    }
  } else {
    console.warn('Firebase configuration is missing (FB_PROJECT_ID, FB_CLIENT_EMAIL, or FB_PRIVATE_KEY)');
  }
}

const db = admin.apps.length ? admin.firestore() : null;
// Gemini API 키가 있는 경우에만 genAI 클라이언트를 초기화합니다.
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// 번역 함수
async function translateText(text: string): Promise<string> {
  // 번역할 텍스트가 없거나 genAI 클라이언트가 초기화되지 않은 경우 원본 텍스트를 반환합니다.
  if (!text || !genAI) return text;
  try {
    // 최신 Gemini 모델을 사용합니다.
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
    const prompt = `Translate the following English text to Korean. Retain original formatting like Markdown, newlines, and spacing:

"${text}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error translating text:', error);
    return text; // 번역 실패 시 원본 텍스트 반환
  }
}

export async function GET(req: NextRequest) {
  // CRON 시크릿 키 인증
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // db 또는 genAI가 구성되지 않은 경우 오류를 반환합니다.
  if (!db || !genAI) {
    return NextResponse.json(
      { message: 'Server not configured for Firebase or Gemini.' },
      { status: 500 }
    );
  }

  try {
    // Reddit Hot 게시물 5개 가져오기
    const response = await fetch('https://www.reddit.com/r/all/hot.json?limit=5');
    if (!response.ok) {
      throw new Error(`Failed to fetch from Reddit: ${response.statusText}`);
    }
    const { data } = await response.json();
    const posts = data.children.map((child: any) => child.data);

    // 번역 및 Firestore 저장 작업을 병렬로 처리
    const processingPromises = posts.map(async (post: any) => {
      const { id, title, selftext, permalink, url, author, subreddit } = post;

      // Firestore에 이미 존재하는지 확인
      const docRef = db.collection('reddit_posts').doc(id);
      const docSnap = await docRef.get();
      if (docSnap.exists) {
        console.log(`Post ${id} already exists. Skipping.`);
        return;
      }
      
      // 제목과 본문 병렬 번역
      const [translatedTitle, translatedSelftext] = await Promise.all([
        translateText(title),
        translateText(selftext),
      ]);

      // Firestore에 저장
      const postData = {
        original_title: title,
        original_selftext: selftext,
        translated_title: translatedTitle,
        translated_selftext: translatedSelftext,
        permalink: `https://www.reddit.com${permalink}`,
        url,
        author,
        subreddit,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await docRef.set(postData);
      console.log(`Post ${id} translated and saved.`);
    });

    await Promise.all(processingPromises);

    return NextResponse.json({ message: 'Reddit posts processed successfully' });
  } catch (error) {
    console.error('Error processing Reddit posts:', error);
    if (error instanceof Error) {
        return NextResponse.json({ message: `Internal Server Error: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unknown internal server error occurred' }, { status: 500 });
  }
}
