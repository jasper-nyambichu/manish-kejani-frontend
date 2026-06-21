// src/components/ui/FlashSaleCountdown.tsx
// Live ticking countdown display for flash sale sections.
// Auto-generates a deadline at the end of today (midnight) so it's always valid.
// Drop this wherever a countdown is needed — just pass a deadline prop.

import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';

interface FlashSaleCountdownProps {
  deadline?: Date;   // defaults to end of today
  label?:    string; // defaults to "Flash Deal Ends In"
  compact?:  boolean; // smaller inline variant for product cards
}

const pad = (n: number) => String(n).padStart(2, '0');

// Animated digit — flips when value changes
const Digit = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-foreground text-background rounded-md min-w-[36px] h-9 flex items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{   y:  16,  opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="text-sm font-bold font-mono absolute"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wide">{label}</span>
  </div>
);

const CompactDigit = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-baseline gap-0.5">
    <span className="text-xs font-bold font-mono text-primary">{value}</span>
    <span className="text-[9px] text-muted-foreground">{label}</span>
  </div>
);

const FlashSaleCountdown = ({
  deadline,
  label = 'Flash Deal Ends In',
  compact = false,
}: FlashSaleCountdownProps) => {
  // Default deadline: end of today
  const defaultDeadline = (() => {
    const d = new Date();
    d.setHours(23, 59, 59, 999);
    return d;
  })();

  const { hours, minutes, seconds, expired } = useCountdown(deadline ?? defaultDeadline);

  if (expired) return (
    <span className="text-xs text-destructive font-medium">Deal ended</span>
  );

  if (compact) return (
    <div className="flex items-center gap-1">
      <Zap className="w-3 h-3 text-primary fill-primary" />
      <CompactDigit value={pad(hours)}   label="h" />
      <span className="text-xs text-muted-foreground">:</span>
      <CompactDigit value={pad(minutes)} label="m" />
      <span className="text-xs text-muted-foreground">:</span>
      <CompactDigit value={pad(seconds)} label="s" />
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        <Zap className="w-4 h-4 text-primary fill-primary" />
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      <div className="flex items-end gap-1">
        <Digit value={pad(hours)}   label="HRS" />
        <span className="text-foreground font-bold pb-4 text-sm">:</span>
        <Digit value={pad(minutes)} label="MIN" />
        <span className="text-foreground font-bold pb-4 text-sm">:</span>
        <Digit value={pad(seconds)} label="SEC" />
      </div>
    </div>
  );
};

export default FlashSaleCountdown;