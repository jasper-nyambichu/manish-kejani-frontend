import ProductCard from '@/components/product/ProductCard';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFlashDeals } from '@/hooks/useProduct';

const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 9, minutes: 29, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0)   { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <span className="font-body font-bold text-primary-foreground">
      Time Left: {pad(time.hours)}h : {pad(time.minutes)}m : {pad(time.seconds)}s
    </span>
  );
};

const FlashDeals = () => {
  const { data, isLoading } = useFlashDeals(6);
  const products = data?.products ?? [];

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-t-card px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            <span className="font-body font-bold text-primary-foreground text-sm md:text-base">Flash Sales | Live Now</span>
          </div>
          <CountdownTimer />
          <a href="#" className="text-xs font-body font-semibold text-primary-foreground hover:underline hidden md:block">See All →</a>
        </div>
        <div className="bg-card rounded-b-card border border-t-0 border-border p-4">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-secondary rounded-card animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-center font-body text-muted-foreground py-8">No flash deals at the moment</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {products.map((product, i) => (
                <motion.div key={product.id ?? (product as any)._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;
