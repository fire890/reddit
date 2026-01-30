import type { Comment as CommentType } from '@/lib/data';
import Comment from './Comment';

type CommentListProps = {
  comments: CommentType[];
};

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-6 pt-6">
      {comments.length > 0 ? (
        comments.map(comment => <Comment key={comment.id} comment={comment} />)
      ) : (
        <p className="py-8 text-center text-muted-foreground">
          아직 댓글이 없습니다. 첫 댓글을 남겨주세요!
        </p>
      )}
    </div>
  );
}
