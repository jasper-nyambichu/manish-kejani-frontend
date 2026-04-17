// src/components/sections/RecentlyViewed.tsx
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

const RecentlyViewed = () => {
  const { items, clear } = useRecentlyViewed();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-t-card border border-b-0 border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-body font-bold text-foreground text-sm">Recently Viewed</span>
          </div>
          <button onClick={clear} className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Clear
          </button>
        </div>

        <div className="bg-card rounded-b-card border border-border relative">
          <button onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full items-center justify-center shadow border border-gray-100 -ml-1">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full items-center justify-center shadow border border-gray-100 -mr-1">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide scroll-smooth">
            {items.map(item => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="flex-shrink-0 w-[140px] p-3 border-r border-border last:border-r-0 hover:bg-secondary/50 transition-colors group"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-2">
                  {item.image ? (
                    <img src={item.image} alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                  )}
                </div>
                <p className="text-xs font-body text-foreground line-clamp-2 leading-tight mb-1">{item.name}</p>
                <p className="text-xs font-bold text-foreground">KSh {item.price.toLocaleString()}</p>
                {item.rating > 0 && (
                  <div className="flex items-center gap-0.5 mt-1">
                    <Star className="w-2.5 h-2.5 text-warning fill-warning" />
                    <span className="text-[10px] text-muted-foreground">{item.rating}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
