import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <section className="relative bg-gradient-to-b from-secondary/60 to-background overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/5 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-primary/5 pointer-events-none" />
          <div className="relative container mx-auto px-4 py-32 text-center max-w-xl">
            <p className="font-display text-8xl text-primary mb-4">404</p>
            <h1 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              Page <span className="text-primary underline decoration-primary/40 underline-offset-4">Not Found</span>
            </h1>
            <p className="text-sm text-muted-foreground mb-10 max-w-sm mx-auto">
              The page you're looking for doesn't exist or may have been moved.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/" className="flex items-center gap-2 h-11 px-6 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity">
                <Home className="w-4 h-4" /> Back to Home
              </Link>
              <Link to="/search" className="flex items-center gap-2 h-11 px-6 border border-border text-foreground rounded-button font-semibold text-sm hover:bg-secondary transition-colors">
                <Search className="w-4 h-4" /> Search Products
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
