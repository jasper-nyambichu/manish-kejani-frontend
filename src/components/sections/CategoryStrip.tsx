import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

const CategoryStrip = () => {
  return (
    <section className="py-6 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-1.5 min-w-[80px] px-3 py-3 rounded-card hover:bg-secondary transition-colors group"
              >
                <div className="w-12 h-12 bg-secondary group-hover:bg-primary/10 rounded-full flex items-center justify-center text-xl transition-colors">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-body font-medium text-foreground text-center leading-tight whitespace-nowrap">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryStrip;
