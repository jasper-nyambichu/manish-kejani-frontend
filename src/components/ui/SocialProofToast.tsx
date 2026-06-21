// src/components/ui/SocialProofToast.tsx
// Rotating activity notifications (Jumia-style) — drives FOMO and signals demand.
// Shows simulated recent purchases and live viewer counts using your real product data.
// Pulls from the featured products API so toasts always show real product names/images.

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { useFeaturedProducts } from '@/hooks/useProduct';

// Kenyan first names for realistic localisation
const KENYAN_NAMES = [
  'Wanjiku', 'Akinyi', 'Njeri', 'Wambui', 'Otieno',
  'Kamau', 'Muthoni', 'Odhiambo', 'Chebet', 'Nzioka',
  'Adhiambo', 'Waweru', 'Kipchoge', 'Nyambura', 'Kariuki',
];

const KISII_AREAS = [
  'Kisii Town', 'Suneka', 'Ogembo', 'Keroka', 'Nyamache',
  'Nairobi', 'Nakuru', 'Mombasa', 'Eldoret', 'Kisumu',
];

const MINUTES_AGO = [2, 3, 5, 7, 8, 11, 14, 17, 22, 28];

type ToastType = 'purchase' | 'viewing';

interface ToastData {
  id:        number;
  type:      ToastType;
  name:      string;
  area:      string;
  product:   string;
  image:     string;
  price:     number;
  minutes:   number;
  viewers:   number;
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const SocialProofToast = () => {
  const [toast, setToast]   = useState<ToastData | null>(null);
  const [visible, setVisible] = useState(false);
  const { data: products = [] } = useFeaturedProducts(12);

  const showNext = useCallback(() => {
    if (!products.length) return;

    const product = pick(products as any[]);
    const imageUrl = product.images?.[0]?.url ?? product.image ?? '';
    const type: ToastType = Math.random() > 0.4 ? 'purchase' : 'viewing';

    setToast({
      id:      Date.now(),
      type,
      name:    pick(KENYAN_NAMES),
      area:    pick(KISII_AREAS),
      product: product.name,
      image:   imageUrl,
      price:   product.price,
      minutes: pick(MINUTES_AGO),
      viewers: Math.floor(Math.random() * 24) + 6, // 6–30
    });
    setVisible(true);

    // Hide after 4.5s, then schedule next appearance
    setTimeout(() => setVisible(false), 4500);
  }, [products]);

  useEffect(() => {
    if (!products.length) return;

    // First toast after 8s so page has time to settle
    const first = setTimeout(showNext, 8000);

    // Subsequent toasts every 18–28s (varied to feel organic)
    const interval = setInterval(() => {
      const delay = 18000 + Math.random() * 10000;
      setTimeout(showNext, delay);
    }, 28000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [products.length, showNext]);

  if (!toast) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, x: -80, y: 0 }}
          animate={{ opacity: 1, x: 0,  y: 0 }}
          exit={{   opacity: 0, x: -80, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-24 left-4 z-50 max-w-[280px] pointer-events-none"
        >
          <div className="bg-card border border-border rounded-xl shadow-lg p-3 flex items-center gap-3">
            {/* Product thumbnail */}
            {toast.image ? (
              <img
                src={toast.image}
                alt={toast.product}
                className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-border"
              />
            ) : (
              <div className="w-11 h-11 rounded-lg bg-secondary flex-shrink-0 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-muted-foreground" />
              </div>
            )}

            {/* Text */}
            <div className="flex-1 min-w-0">
              {toast.type === 'purchase' ? (
                <>
                  <p className="text-xs font-semibold text-foreground leading-tight">
                    <span className="text-primary">{toast.name}</span> from {toast.area}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    just ordered <span className="font-medium text-foreground">{toast.product}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {toast.minutes} min ago · KSh {toast.price.toLocaleString()}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-primary flex-shrink-0" />
                    <p className="text-xs font-semibold text-foreground">
                      {toast.viewers} people viewing this
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {toast.product}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-xs text-green-600 font-medium">Active right now</p>
                  </div>
                </>
              )}
            </div>

            {/* Icon badge */}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              toast.type === 'purchase' ? 'bg-primary/10' : 'bg-green-500/10'
            }`}>
              {toast.type === 'purchase'
                ? <ShoppingBag className="w-3 h-3 text-primary" />
                : <Eye className="w-3 h-3 text-green-600" />
              }
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofToast;