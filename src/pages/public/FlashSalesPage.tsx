// src/pages/public/FlashSalesPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Zap, ChevronRight } from 'lucide-react';
import { useFlashDeals } from '@/hooks/useProduct';

const pad = (n: number) => String(n).padStart(2, '0');

const Countdown = () => {
  const [time, setTime] = useState({ h: 9, m: 29, s: 59 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-1 text-sm font-bold text-primary-foreground">
      <span className="bg-primary-foreground/20 rounded px-2 py-1">{pad(time.h)}</span>
      <span>:</span>
      <span className="bg-primary-foreground/20 rounded px-2 py-1">{pad(time.m)}</span>
      <span>:</span>
      <span className="bg-primary-foreground/20 rounded px-2 py-1">{pad(time.s)}</span>
    </div>
  );
};

const FlashSalesPage = () => {
  const { data, isLoading } = useFlashDeals(40);
  const products = data?.products ?? [];

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-secondary/60 to-background overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/5 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-primary/5 pointer-events-none" />
          <div className="relative container mx-auto px-4 pt-14 pb-12 text-center max-w-2xl">
            <nav className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">Flash Sales</span>
            </nav>
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary fill-primary" />
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-3">
              Flash <span className="text-primary underline decoration-primary/40 underline-offset-4">Sales</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-4">Limited-time deals — grab them before they're gone.</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs text-muted-foreground font-medium">Ends in:</span>
              <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                <span className="bg-primary text-primary-foreground rounded px-2.5 py-1"><Countdown /></span>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="container mx-auto px-4 pb-12">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-64 bg-secondary rounded-card animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center bg-card rounded-card border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-primary" />
              </div>
              <p className="font-display text-xl text-foreground mb-2">No Flash Deals Right Now</p>
              <p className="text-sm text-muted-foreground mb-6">Check back soon — new deals drop daily.</p>
              <Link to="/" className="inline-flex items-center gap-2 h-10 px-5 bg-primary text-primary-foreground rounded-button text-sm font-semibold hover:opacity-90 transition-opacity">
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {products.map((product: any) => (
                <ProductCard key={product._id ?? product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FlashSalesPage;
