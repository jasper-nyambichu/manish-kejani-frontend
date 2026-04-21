import { toast } from 'sonner';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const showBrandedToast = (message: string, type: 'cart' | 'success' = 'cart') => {
  toast.custom((t) => (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-card border-l-4 border-primary rounded-lg shadow-xl shadow-primary/5 p-4 flex items-center gap-4 min-w-[300px] cursor-pointer"
      onClick={() => toast.dismiss(t)}
    >
      <div className="bg-primary/10 p-2.5 rounded-full text-primary flex-shrink-0">
        {type === 'cart' ? <ShoppingCart className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
      </div>
      <div>
        <p className="text-[13px] font-bold text-foreground uppercase tracking-wide opacity-90 mb-0.5">
          {type === 'cart' ? 'Cart Updated' : 'Success'}
        </p>
        <p className="text-sm font-medium text-foreground">{message}</p>
      </div>
    </motion.div>
  ), {
    duration: 4000,
  });
};
