// src/components/product/ReviewList.tsx
import { useState } from 'react';
import { Star, Trash2, BadgeCheck } from 'lucide-react';
import { useReviews, useDeleteReview } from '@/hooks/useReviews';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Props {
  productId: string;
  totalReviews: number;
  averageRating: number;
}

const ReviewList = ({ productId, totalReviews, averageRating }: Props) => {
  const [page, setPage] = useState(1);
  const { user, isAuthenticated } = useAuth();
  const { data, isLoading } = useReviews(productId, page);
  const { mutate: deleteReview, isPending: deleting } = useDeleteReview(productId);

  const reviews    = data?.reviews    ?? [];
  const pagination = data?.pagination ?? { pages: 1, total: 0 };

  const handleDelete = (reviewId: string) => {
    if (!confirm('Delete your review?')) return;
    deleteReview(reviewId, {
      onSuccess: () => toast.success('Review deleted'),
      onError:   () => toast.error('Failed to delete review'),
    });
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-4xl font-bold text-foreground">{averageRating.toFixed(1)}</p>
          <div className="flex justify-center mt-1">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(averageRating) ? 'text-warning fill-warning' : 'text-border'}`} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{totalReviews} review{totalReviews !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-secondary rounded-card animate-pulse" />)}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">No reviews yet. Be the first to review this product.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review: any) => {
            const reviewId  = review.id ?? review._id;
            const reviewerId = review.user?.id ?? review.user;
            const isOwner   = isAuthenticated && user?.id === reviewerId;

            return (
              <div key={reviewId} className="border-b border-border pb-4 last:border-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground">
                        {review.user?.username ?? 'Customer'}
                      </span>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-success bg-success/10 px-1.5 py-0.5 rounded-badge">
                          <BadgeCheck className="w-3 h-3" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'text-warning fill-warning' : 'text-border'}`} />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        {new Date(review.createdAt).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mt-2 leading-relaxed">{review.comment}</p>
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => handleDelete(reviewId)}
                      disabled={deleting}
                      className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 p-1"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="h-8 px-3 text-xs border border-border rounded-button hover:bg-secondary disabled:opacity-40">
            Previous
          </button>
          <span className="text-xs text-muted-foreground">{page} / {pagination.pages}</span>
          <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
            className="h-8 px-3 text-xs border border-border rounded-button hover:bg-secondary disabled:opacity-40">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
