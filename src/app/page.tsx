'use client';

import { useEffect, useState } from 'react';
import PostList from '@/components/posts/PostList';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPosts, Post, PostCategory } from '@/lib/data';

const CATEGORIES: (PostCategory | '전체')[] = ['전체', '정치', '투자', '연예', '뻘글'];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<PostCategory | '전체'>('전체');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const fetchedPosts = await getPosts(category);
      setPosts(fetchedPosts);
      setLoading(false);
    };

    fetchPosts();

    const intervalId = setInterval(fetchPosts, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(intervalId);
  }, [category]);

  return (
    <div className="w-full">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          인기 번역글
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Reddit의 인기 게시글을 카테고리별로 확인해 보세요.
        </p>
      </div>

      <div className="mb-8 flex flex-col items-center gap-6">
        <Tabs
          defaultValue={category}
          onValueChange={value => setCategory(value as PostCategory | '전체')}
        >
          <TabsList className="grid w-full grid-cols-5">
            {CATEGORIES.map(cat => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <PostList posts={loading ? [] : posts} />
    </div>
  );
}
