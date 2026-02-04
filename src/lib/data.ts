import { getTopPosts } from './reddit';
import { Post, PostCategory } from './reddit';

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

export type TimeRange = '실시간' | '오늘' | '이번 주';
export { Post, PostCategory };

let posts: Post[] = [];

const mockComments: Comment[] = [];

export const getPosts = async (
  category: PostCategory | '전체',
): Promise<Post[]> => {
  posts = await getTopPosts(category);
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

