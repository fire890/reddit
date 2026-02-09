
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import admin from 'firebase-admin';

// Firebase Admin SDK 초기화
// Vercel 환경 변수에서 서비스 계정 키를 가져옵니다.
// 환경 변수는 Base64로 인코딩된 JSON 문자열이어야 합니다.
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!, 'base64').toString('utf-8')
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 번역 함수
async function translateText(text: string): Promise<string> {
  if (!text) return '';
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
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
