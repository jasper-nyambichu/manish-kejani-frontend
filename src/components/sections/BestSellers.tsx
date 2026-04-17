import ProductCard from '@/components/product/ProductCard';
import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useFeaturedProducts } from '@/hooks/useProduct';

const BestSellers = () => {
  const { data: products = [], isLoading } = useFeaturedProducts(18);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.querySelector(':scope > div')?.clientWidth ?? 200;
    const visibleCards = Math.floor(el.clientWidth / cardWidth);
    const scrollAmount = cardWidth * visibleCards;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="bg-surface rounded-t-card px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-surface-foreground" />
            <span className="font-body font-bold text-surface-foreground text-sm md:text-base">Best Sellers</span>
          </div>
          <a href="/best-sellers" className="text-xs font-body font-semibold text-primary hover:underline">See All →</a>
        </div>
        <div className="bg-card rounded-b-card border border-t-0 border-border p-3 md:p-0 relative">

          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white rounded-full items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-shadow cursor-pointer active:scale-95 -ml-1"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white rounded-full items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-shadow cursor-pointer active:scale-95 -mr-1"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {isLoading ? (
            <>
              <div className="grid grid-cols-2 gap-2 md:hidden">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-52 bg-secondary rounded-card animate-pulse" />
                ))}
              </div>
              <div className="hidden md:flex overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="min-w-[180px] h-72 bg-secondary animate-pulse border-r border-border last:border-r-0 flex-shrink-0" />
                ))}
              </div>
            </>
          ) : products.length === 0 ? (
            <p className="text-center font-body text-muted-foreground py-8">No featured products yet</p>
          ) : (
            <>
              {/* Mobile: 2-column grid */}
              <div className="grid grid-cols-2 gap-2 md:hidden">
                {products.slice(0, 6).map((product) => (
                  <div key={product.id ?? (product as any)._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Desktop: horizontal scroll with arrows */}
              <div
                ref={scrollRef}
                className="hidden md:flex overflow-x-auto scrollbar-hide scroll-smooth"
              >
                {products.map((product) => (
                  <div
                    key={product.id ?? (product as any)._id}
                    className="w-[180px] flex-shrink-0"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
