import ProductCard from '@/components/product/ProductCard';
import { Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
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
    <span className="font-body font-bold text-primary-foreground text-xs md:text-sm">
      Time Left: {pad(time.hours)}h : {pad(time.minutes)}m : {pad(time.seconds)}s
    </span>
  );
};

const FlashDeals = () => {
  const { data, isLoading } = useFlashDeals(18);
  const products = data?.products ?? [];
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
        <div className="bg-primary rounded-t-card px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            <span className="font-body font-bold text-primary-foreground text-sm md:text-base">Flash Sales | Live Now</span>
          </div>
          <CountdownTimer />
          <a href="/flash-sales" className="text-xs font-body font-semibold text-primary-foreground hover:underline hidden md:block">See All →</a>
        </div>
        <div className="bg-card rounded-b-card border border-t-0 border-border p-3 md:p-0 relative">

          {/* Left arrow – desktop only, appears after scrolling right */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white rounded-full items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-shadow cursor-pointer active:scale-95 -ml-1"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}

          {/* Right arrow – desktop only, appears when more content */}
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
              {/* Mobile: 2-col grid skeleton */}
              <div className="grid grid-cols-2 gap-2 md:hidden">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-52 bg-secondary rounded-card animate-pulse" />
                ))}
              </div>
              {/* Desktop: horizontal skeleton */}
              <div className="hidden md:flex overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="min-w-[180px] h-72 bg-secondary animate-pulse border-r border-border last:border-r-0 flex-shrink-0" />
                ))}
              </div>
            </>
          ) : products.length === 0 ? (
            <p className="text-center font-body text-muted-foreground py-8">No flash deals at the moment</p>
          ) : (
            <>
              {/* Mobile: 2-column grid (like Jumia mobile) */}
              <div className="grid grid-cols-2 gap-2 md:hidden">
                {products.slice(0, 6).map((product) => (
                  <div key={product.id ?? (product as any)._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Desktop: horizontal scroll with arrows (like Jumia desktop) */}
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

export default FlashDeals;
