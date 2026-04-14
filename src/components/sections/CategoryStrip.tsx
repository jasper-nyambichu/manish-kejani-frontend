// src/components/sections/CategoryStrip.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { useCategories } from '@/hooks/useCategories';

const CategoryStrip = () => {
  const { data: categories = [], isLoading } = useCategories();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.6;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-6 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="min-w-[80px] h-20 bg-secondary rounded-card animate-pulse flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 bg-card border-b border-border">
      <div className="container mx-auto px-4 relative group">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll categories left"
          className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center z-20 bg-gradient-to-r from-white/90 via-white/60 to-transparent hover:from-white hover:via-white/80 transition-all cursor-pointer"
        >
          <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200 hover:shadow-lg transition-shadow active:scale-90">
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </span>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll categories right"
          className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-center z-20 bg-gradient-to-l from-white/90 via-white/60 to-transparent hover:from-white hover:via-white/80 transition-all cursor-pointer"
        >
          <span className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200 hover:shadow-lg transition-shadow active:scale-90">
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </span>
        </button>

        <div ref={scrollRef} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide px-4">
          {categories.map((cat: any, i: number) => (
            <motion.div
              key={cat._id ?? cat.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="flex flex-col items-center gap-1.5 min-w-[80px] px-3 py-3 rounded-card hover:bg-secondary transition-colors group/item"
              >
                <div className="w-12 h-12 bg-secondary group-hover/item:bg-primary/10 rounded-full flex items-center justify-center text-xl transition-colors">
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
