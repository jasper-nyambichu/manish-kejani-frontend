import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const BestSellers = () => {
  const featured = products.filter((p) => p.isFeatured);

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="bg-surface rounded-t-card px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-surface-foreground" />
            <span className="font-body font-bold text-surface-foreground text-sm md:text-base">Best Sellers</span>
          </div>
          <a href="#" className="text-xs font-body font-semibold text-primary hover:underline">
            See All →
          </a>
        </div>
        <div className="bg-card rounded-b-card border border-t-0 border-border p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
