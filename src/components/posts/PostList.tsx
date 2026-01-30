import type { Post } from '@/lib/data';
import PostListItem from './PostListItem';

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      {posts.map(post => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}
