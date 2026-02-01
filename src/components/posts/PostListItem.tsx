import Link from 'next/link';
import type { Post } from '@/lib/data';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowBigUp, MessageSquare, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { anonymizeAuthor } from '@/lib/utils';

type PostListItemProps = {
  post: Post;
};

export default function PostListItem({ post }: PostListItemProps) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <Link href={`/posts/${post.id}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden bg-card transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="flex-grow">
          <CardTitle className="font-headline text-xl transition-colors group-hover:text-primary">
            {post.translatedTitle}
          </CardTitle>
          <CardDescription>
            by {anonymizeAuthor(post.author)} • {timeAgo}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <Link
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink className="size-4" />
              <span>원문</span>
            </Link>
            <div className="flex items-center gap-1">
              <ArrowBigUp className="size-4" />
              <span>{post.upvotes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="size-4" />
              <span>{post.commentsCount.toLocaleString()}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
