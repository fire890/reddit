'use client';

import type { Comment as CommentType } from '@/lib/data';
import { User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { anonymizeAuthor } from '@/lib/utils';

type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (comment.createdAt) {
      const date = new Date(comment.createdAt);
      setTimeAgo(formatDistanceToNow(date, { addSuffix: true, locale: ko }));
    }
  }, [comment.createdAt]);

  if (!timeAgo) {
    return (
      <div className="flex items-start space-x-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 border-b border-border/50 pb-4 last:border-b-0">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
          <User className="size-4 text-muted-foreground" />
        </div>
        <span className="text-sm font-bold">{anonymizeAuthor(comment.author)}</span>
        <time dateTime={comment.createdAt} className="text-xs text-muted-foreground">
          {timeAgo}
        </time>
      </div>
      <p className="ml-10 whitespace-pre-wrap text-foreground">
        {comment.content}
      </p>
    </div>
  );
}
