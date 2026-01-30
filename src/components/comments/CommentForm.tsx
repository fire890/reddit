'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type CommentFormProps = {
  onAddComment: (content: string) => void;
};

export default function CommentForm({ onAddComment }: CommentFormProps) {
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: '오류',
        description: '댓글 내용을 입력해주세요.',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }
    onAddComment(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="한국 커뮤니티 스타일로 댓글을 달아보세요! (예: ㅋㅋㅋ 인정)"
        rows={3}
      />
      <div className="flex justify-end">
        <Button type="submit">댓글 등록</Button>
      </div>
    </form>
  );
}
