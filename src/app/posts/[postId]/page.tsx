import { getPostById, getCommentsByPostId, type Post } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArrowBigUp, User } from 'lucide-react';
import CommentSection from '@/components/comments/CommentSection';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

type PostPageProps = {
  params: { postId: string };
};

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostById(params.postId);
  return {
    title: post ? `${post.translatedTitle} | 레딧번역마을` : 'Post Not Found',
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostById(params.postId);

  if (!post) {
    notFound();
  }

  const comments = await getCommentsByPostId(params.postId);
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="font-headline text-3xl md:text-4xl">
            {post.translatedTitle}
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-2">
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <span>{post.author}</span>
              <span className="hidden md:inline-block">•</span>
              <time dateTime={post.createdAt}>{timeAgo}</time>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <ArrowBigUp className="size-4" />
                <span>{post.upvotes.toLocaleString()}</span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-base leading-relaxed text-foreground">
            {post.translatedContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      <CommentSection initialComments={comments} postId={post.id} />
    </div>
  );
}
