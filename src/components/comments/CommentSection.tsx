'use client';

import type { Comment } from '@/lib/data';
import { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Separator } from '@/components/ui/separator';

type CommentSectionProps = {
  initialComments: Comment[];
  postId: string;
};

export default function CommentSection({
  initialComments,
  postId,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: new Date().toISOString(), // simple unique id for demo
      postId,
      author: '익명', // Anonymous
      content,
      createdAt: new Date().toISOString(),
    };
    setComments(prevComments => [newComment, ...prevComments]);
  };

  return (
    <div>
      <h2 className="font-headline text-2xl font-bold">
        댓글 ({comments.length.toLocaleString()})
      </h2>
      <div className="py-6">
        <CommentForm onAddComment={handleAddComment} />
      </div>
      <Separator className="my-2" />
      <CommentList comments={comments} />
    </div>
  );
}
