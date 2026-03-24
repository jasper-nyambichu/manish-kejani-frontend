import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviews?: number;
}

const RatingStars = ({ rating, size = 14, showValue, reviews }: RatingStarsProps) => (
  <div className="flex items-center gap-1">
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < Math.floor(rating) ? "text-warning fill-warning" : "text-border"}
        />
      ))}
    </div>
    {showValue && <span className="text-xs font-body text-muted-foreground">{rating}</span>}
    {reviews !== undefined && (
      <span className="text-[11px] font-body text-muted-foreground">({reviews})</span>
    )}
  </div>
);

export default RatingStars;
