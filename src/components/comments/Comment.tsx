'use client';

import type { Comment as CommentType } from '@/lib/data';
import { User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { anonymizeAuthor } from '@/lib/utils';

type CommentProps = {
  comment: CommentType;
};

export default function Comment({ comment }: CommentProps) {
  const timeAgo = comment.createdAt
    ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: ko })
    L : '';

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
