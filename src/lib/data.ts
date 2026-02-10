
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase'; // Make sure firebase.ts is set up

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

export type PostCategory = '정치' | '투자' | '연예' | '뻘글';
export interface Post {
  id: string;
  author: string;
  originalTitle: string;
  originalContent: string;
  translatedTitle: string;
  translatedContent: string;
  upvotes: number; // This might not be available from our Firestore data
  commentsCount: number; // This might not be available from our Firestore data
  createdAt: string;
  category: PostCategory;
  url: string;
  permalink: string;
}

export type TimeRange = '실시간' | '오늘' | '이번 주';

let posts: Post[] = [];

const mockComments: Comment[] = [];

// Fetches the latest translated posts from Firestore
export const getTranslatedHotPosts = async (): Promise<Post[]> => {
  try {
    // Ensure the db object is available
    if (!db) {
      console.error('Firestore database is not initialized.');
      return [];
    }
    const postsCollection = collection(db, 'reddit_posts');
    const q = query(postsCollection, orderBy('createdAt', 'desc'), limit(25));
    const querySnapshot = await getDocs(q);

    const firestorePosts = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const createdAt = (data.createdAt as Timestamp).toDate().toISOString();

      return {
        id: doc.id,
        author: data.author,
        originalTitle: data.original_title,
        originalContent: data.original_selftext,
        translatedTitle: data.translated_title,
        translatedContent: data.translated_selftext,
        upvotes: data.upvotes ?? 0, // Default value
        commentsCount: data.commentsCount ?? 0, // Default value
        createdAt: createdAt,
        category: '뻘글' as PostCategory, // Default category
        url: data.url,
        permalink: data.permalink,
      };
    });
    return firestorePosts;
  } catch (error) {
    console.error('Error fetching translated posts from Firestore:', error);
    return [];
  }
};

export const getPosts = async (
  category: PostCategory | '전체',
): Promise<Post[]> => {
  // For now, we ignore the category and return all hot posts.
  // In the future, you could implement category filtering based on subreddit
  // or use another AI call to categorize posts.
  posts = await getTranslatedHotPosts();
  return posts;
};

export const getPostById = async (id: string): Promise<Post | undefined> => {
  if (posts.length === 0) {
    await getPosts('전체');
  }
  return posts.find(p => p.id === id);
};

export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  return mockComments
    .filter(c => c.postId === postId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3); // Get only the top 3 comments
};
