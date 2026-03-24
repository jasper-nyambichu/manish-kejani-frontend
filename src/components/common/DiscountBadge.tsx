const DiscountBadge = ({ discount }: { discount: number }) => (
  <div className="bg-primary text-primary-foreground text-xs font-body font-bold px-2 py-0.5 rounded-badge">
    -{discount}%
  </div>
);

export default DiscountBadge;
