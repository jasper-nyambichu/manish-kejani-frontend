// src/components/common/StockBadge.tsx
type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'coming_soon' | string;

const styles: Record<string, string> = {
  in_stock:     'bg-success/10 text-success',
  low_stock:    'bg-warning/10 text-warning',
  out_of_stock: 'bg-destructive/10 text-destructive',
  coming_soon:  'bg-info/10 text-info',
  // legacy hyphen support
  'in-stock':     'bg-success/10 text-success',
  'low-stock':    'bg-warning/10 text-warning',
  'out-of-stock': 'bg-destructive/10 text-destructive',
};

const labels: Record<string, string> = {
  in_stock:     'In Stock',
  low_stock:    'Low Stock',
  out_of_stock: 'Out of Stock',
  coming_soon:  'Coming Soon',
  'in-stock':     'In Stock',
  'low-stock':    'Low Stock',
  'out-of-stock': 'Out of Stock',
};

const StockBadge = ({ stock }: { stock: StockStatus }) => (
  <span className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-badge ${styles[stock] ?? 'bg-secondary text-muted-foreground'}`}>
    {labels[stock] ?? stock}
  </span>
);

export default StockBadge;
