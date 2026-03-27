// src/components/sections/HeroBanner.tsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useCategories';

const heroSlides = [
  {
    title: 'Your Kitchen, Transformed.',
    subtitle: 'Premium glassware, cookware & dining sets crafted for the modern home.',
    cta: 'Shop Kitchenware',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
  },
  {
    title: 'Cozy Beddings, Beautiful Spaces.',
    subtitle: 'Luxurious duvets, pillows & towels for your perfect sanctuary.',
    cta: 'Shop Bedding',
    image: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1200&h=600&fit=crop',
  },
  {
    title: 'Elevate Your Home Décor.',
    subtitle: 'Curated collections to make every corner of your home shine.',
    cta: 'Explore Décor',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const { data: categories = [] } = useCategories();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-4">
          {/* Category sidebar (desktop) */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-card rounded-card border border-border overflow-hidden">
              <ul className="divide-y divide-border">
                {categories.map((cat: any) => (
                  <li key={cat._id ?? cat.id}>
                    <Link
                      to={`/category/${cat.slug}`}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-body font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Hero slider */}
          <div className="flex-1 relative rounded-card overflow-hidden" style={{ minHeight: 340 }}>
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
                <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-display text-3xl md:text-5xl text-card leading-tight max-w-md">
                  {slide.title}
                </motion.h1>
                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-3 text-sm md:text-base font-body text-card/80 max-w-sm">
                  {slide.subtitle}
                </motion.p>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                  <Link to="/category/glasses-drinkware"
                    className="inline-block mt-5 px-6 py-2.5 bg-primary text-primary-foreground rounded-button font-body font-semibold text-sm hover:opacity-90 transition-opacity">
                    {slide.cta}
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <button onClick={() => setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-card/30 backdrop-blur-sm rounded-full flex items-center justify-center text-card hover:bg-card/50 transition z-10">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrent((prev) => (prev + 1) % heroSlides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-card/30 backdrop-blur-sm rounded-full flex items-center justify-center text-card hover:bg-card/50 transition z-10">
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {heroSlides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-card/50'}`} />
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="hidden xl:flex flex-col gap-3 w-52 flex-shrink-0">
            <a href="https://wa.me/254719769263" target="_blank" rel="noopener noreferrer"
              className="bg-card rounded-card border border-border p-4 flex items-center gap-3 hover:border-primary transition-colors">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center text-success text-lg">💬</div>
              <div>
                <p className="text-sm font-body font-semibold text-foreground">WhatsApp</p>
                <p className="text-[11px] font-body text-muted-foreground">Text to Order</p>
              </div>
            </a>
            <div className="bg-card rounded-card border border-border p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary text-lg">🏪</div>
              <div>
                <p className="text-sm font-body font-semibold text-foreground">Visit Store</p>
                <p className="text-[11px] font-body text-muted-foreground">Kisii Town</p>
              </div>
            </div>
            <div className="bg-card rounded-card border border-border p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center text-info text-lg">🚚</div>
              <div>
                <p className="text-sm font-body font-semibold text-foreground">Delivery</p>
                <p className="text-[11px] font-body text-muted-foreground">Within Kisii</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
