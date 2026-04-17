// src/components/common/StaticPageLayout.tsx
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight } from 'lucide-react';

interface Props {
  title: string;
  breadcrumb: string;
  subtitle?: string;
  children: React.ReactNode;
}

const StaticPageLayout = ({ title, breadcrumb, subtitle, children }: Props) => (
  <div className="min-h-screen bg-background font-body">
    <Navbar />
    <main>
      {/* Hero — matches HelpCenter gradient pattern */}
      <section className="relative bg-gradient-to-b from-secondary/60 to-background overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/5 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-primary/5 pointer-events-none" />
        <div className="relative container mx-auto px-4 pt-16 pb-14 text-center max-w-2xl">
          <nav className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{breadcrumb}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">{subtitle}</p>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="bg-card rounded-card border border-border p-6 md:p-10 space-y-6 text-foreground">
          {children}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default StaticPageLayout;
