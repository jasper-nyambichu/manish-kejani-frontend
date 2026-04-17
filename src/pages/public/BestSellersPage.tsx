// src/pages/public/BestSellersPage.tsx
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { useFeaturedProducts } from '@/hooks/useProduct';

const BestSellersPage = () => {
  const { data: products = [], isLoading } = useFeaturedProducts(40);

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
              <span className="text-foreground">Best Sellers</span>
            </nav>
            <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-3">
              Best <span className="text-primary underline decoration-primary/40 underline-offset-4">Sellers</span>
            </h1>
            <p className="text-sm text-muted-foreground">Our most loved products — trusted by thousands of customers.</p>
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
              <p className="text-muted-foreground mb-4">No featured products yet.</p>
              <Link to="/" className="text-primary hover:underline text-sm">← Back to Home</Link>
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

export default BestSellersPage;
