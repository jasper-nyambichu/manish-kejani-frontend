// src/components/common/StockBadge.tsx
type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

const styles: Record<StockStatus, string> = {
  "in-stock": "bg-success/10 text-success",
  "low-stock": "bg-warning/10 text-warning",
  "out-of-stock": "bg-destructive/10 text-destructive",
};

const labels: Record<StockStatus, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "out-of-stock": "Out of Stock",
};

const StockBadge = ({ stock }: { stock: StockStatus }) => (
  <span className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-badge ${styles[stock]}`}>
    {labels[stock]}
  </span>
);

export default StockBadge;
