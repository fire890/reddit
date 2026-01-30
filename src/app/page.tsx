import PostList from '@/components/posts/PostList';
import { getPosts } from '@/lib/data';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="w-full">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          인기 번역글
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          매 시간 Reddit의 인기 게시글이 한국어로 번역되어 업데이트 됩니다.
        </p>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
