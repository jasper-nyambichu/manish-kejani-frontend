// src/pages/public/ReturnPolicy.tsx
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, RotateCcw, CheckCircle, XCircle, MessageCircle, Clock } from 'lucide-react';

const ReturnPolicy = () => (
  <div className="min-h-screen bg-background font-body">
    <Navbar />
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-secondary/60 to-background overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/5 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-primary/5 pointer-events-none" />
        <div className="relative container mx-auto px-4 pt-16 pb-14 text-center max-w-2xl">
          <nav className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Return Policy</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-4">
            Easy <span className="text-primary underline decoration-primary/40 underline-offset-4">Returns</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Your satisfaction is our priority. Returns are simple — here's everything you need to know.
          </p>
        </div>
      </section>

      {/* Return Window Highlight */}
      <section className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="bg-primary/5 border border-primary/20 rounded-card p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-display text-lg text-foreground mb-1">7-Day Return Window</p>
            <p className="text-sm text-muted-foreground">
              Return eligible items within <strong className="text-foreground">7 days</strong> of delivery. Items must be unused and in original packaging.
            </p>
          </div>
        </div>
      </section>

      {/* Eligible vs Non-Returnable */}
      <section className="container mx-auto px-4 pb-14 max-w-4xl border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-card border border-border p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <h2 className="font-display text-lg text-foreground">Eligible Returns</h2>
            </div>
            <div className="space-y-3">
              {[
                'Item received is defective or damaged.',
                'Wrong item delivered.',
                'Item significantly differs from description.',
              ].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-card border border-border p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <h2 className="font-display text-lg text-foreground">Non-Returnable</h2>
            </div>
            <div className="space-y-3">
              {[
                'Used, washed or altered items.',
                'Items without original packaging.',
                'Perishable or consumable goods.',
                'Items marked "Final Sale".',
              ].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="container mx-auto px-4 py-14 max-w-3xl border-b border-border">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">How to Return</h2>
          <p className="text-sm text-muted-foreground">Five simple steps to initiate your return.</p>
        </div>
        <div className="space-y-3">
          {[
            'Contact us via WhatsApp at 0719 769 263 within 7 days of delivery.',
            'Provide your order details and photos of the defective or incorrect item.',
            'Our team reviews and responds within 24 hours.',
            'If approved, return the item to our store or we will arrange collection.',
            'Replacement or refund processed within 3 business days.',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-card rounded-card border border-border">
              <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Refunds */}
      <section className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="bg-card rounded-card border border-border p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <RotateCcw className="w-6 h-6 text-success" />
          </div>
          <h2 className="font-display text-xl text-foreground mb-3">Refunds</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Approved refunds are issued via M-Pesa or cash within <strong className="text-foreground">3 business days</strong>. Original delivery fees are non-refundable unless the return is due to our error.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity">
            <MessageCircle className="w-4 h-4" /> Start a Return
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default ReturnPolicy;
