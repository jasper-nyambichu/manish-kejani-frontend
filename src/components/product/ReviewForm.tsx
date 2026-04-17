// src/components/product/ReviewForm.tsx
import { useState } from 'react';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { useSubmitReview } from '@/hooks/useReviews';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

interface Props {
  productId: string;
}

const ReviewForm = ({ productId }: Props) => {
  const { isAuthenticated } = useAuth();
  const [rating,  setRating]  = useState(0);
  const [hover,   setHover]   = useState(0);
  const [comment, setComment] = useState('');
  const { mutate, isPending } = useSubmitReview(productId);

  if (!isAuthenticated) {
    return (
      <div className="bg-secondary rounded-card p-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">Sign in to leave a review</p>
        <Link to="/login"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-button text-sm font-semibold hover:opacity-90 transition-opacity">
          Sign In
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { toast.error('Please select a star rating'); return; }
    if (!comment.trim()) { toast.error('Please write a comment'); return; }
    mutate({ rating, comment: comment.trim() }, {
      onSuccess: () => {
        toast.success('Review submitted!');
        setRating(0);
        setComment('');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? 'Failed to submit review');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Your Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  star <= (hover || rating) ? 'text-warning fill-warning' : 'text-border'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Your Review</label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={3}
          maxLength={500}
          className="w-full px-3 py-2 text-sm bg-secondary border border-border rounded-input text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 resize-none"
        />
        <p className="text-xs text-muted-foreground text-right mt-0.5">{comment.length}/500</p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="h-9 px-5 bg-primary text-primary-foreground rounded-button text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
