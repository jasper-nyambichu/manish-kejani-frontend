// src/components/common/TrustBadges.tsx
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, RotateCcw, Lock } from 'lucide-react';

const badges = [
  {
    icon:  Truck,
    label: 'Fast Delivery',
    sub:   'Same-day in Kisii',
    to:    '/shipping',
    color: 'text-info',
    bg:    'bg-info/10',
  },
  {
    icon:  ShieldCheck,
    label: 'Quality Guarantee',
    sub:   'Every item checked',
    to:    '/return-policy',
    color: 'text-success',
    bg:    'bg-success/10',
  },
  {
    icon:  RotateCcw,
    label: 'Easy Returns',
    sub:   '7-day return policy',
    to:    '/return-policy',
    color: 'text-warning',
    bg:    'bg-warning/10',
  },
  {
    icon:  Lock,
    label: 'Secure Payments',
    sub:   'M-Pesa · Visa · Cash',
    to:    '/how-to-buy',
    color: 'text-primary',
    bg:    'bg-primary/10',
  },
];

const TrustBadges = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {badges.map(({ icon: Icon, label, sub, to, color, bg }) => (
      <Link
        key={label}
        to={to}
        className="flex items-center gap-3 p-3 bg-card rounded-card border border-border hover:border-primary/40 hover:shadow-sm transition-all"
      >
        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${bg}`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground leading-tight">{label}</p>
          <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{sub}</p>
        </div>
      </Link>
    ))}
  </div>
);

export default TrustBadges;
