import ProductCard from '@/components/product/ProductCard';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNewArrivals } from '@/hooks/useProduct';

const NewArrivals = () => {
  const { data, isLoading } = useNewArrivals(8);
  const products = data?.products ?? [];

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="bg-secondary rounded-t-card px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-body font-bold text-foreground text-sm md:text-base">New Arrivals</span>
          </div>
          <a href="#" className="text-xs font-body font-semibold text-primary hover:underline">See All →</a>
        </div>
        <div className="bg-card rounded-b-card border border-t-0 border-border p-4">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-48 bg-secondary rounded-card animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-center font-body text-muted-foreground py-8">No new arrivals yet</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {products.map((product, i) => (
                <motion.div key={product.id ?? (product as any)._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }}>
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

export default NewArrivals;
