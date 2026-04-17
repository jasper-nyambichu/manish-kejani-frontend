// src/pages/public/HowToBuy.tsx
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, Search, ShoppingCart, MessageCircle, Truck, CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';

const steps = [
  { icon: Search,        num: '01', title: 'Browse & Find',       desc: 'Use the search bar or browse categories to find products. Filter by price, availability and rating.' },
  { icon: ShoppingCart,  num: '02', title: 'Add to Cart',          desc: 'Click "Add to Cart" on any product. Review all items in your cart before ordering.' },
  { icon: MessageCircle, num: '03', title: 'Order via WhatsApp',   desc: 'Click "Order via WhatsApp" — a pre-filled message with your order details is sent directly to us.' },
  { icon: Truck,         num: '04', title: 'Confirm & Receive',    desc: 'We confirm availability and delivery details. Pay on delivery or via M-Pesa. Delivered same-day or next day.' },
];

const payments = [
  { icon: Smartphone,  label: 'M-Pesa',           sub: 'Paybill or Till Number', color: 'text-success', bg: 'bg-success/10' },
  { icon: Banknote,    label: 'Cash on Delivery',  sub: 'Pay when you receive',   color: 'text-warning', bg: 'bg-warning/10' },
  { icon: CreditCard,  label: 'Visa / Mastercard', sub: 'Card payments accepted', color: 'text-info',    bg: 'bg-info/10'    },
];

const HowToBuy = () => (
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
            <span className="text-foreground">How to Buy</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-4">
            Shopping Made <span className="text-primary underline decoration-primary/40 underline-offset-4">Simple</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Follow these four easy steps to get your household goods delivered to your door.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-4 py-14 max-w-4xl border-b border-border">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">How It Works</h2>
          <p className="text-sm text-muted-foreground">From browsing to delivery in four simple steps.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, num, title, desc }) => (
            <div key={num} className="group flex flex-col items-center text-center p-6 bg-card rounded-card border border-border hover:border-primary/40 hover:shadow-md transition-all">
              <div className="relative mb-4">
                <div className="w-14 h-14 rounded-full border-2 border-primary/30 bg-primary/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/15 transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {num.replace('0', '')}
                </span>
              </div>
              <p className="font-display text-base text-foreground mb-2">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="container mx-auto px-4 py-14 max-w-4xl border-b border-border">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Payment Methods</h2>
          <p className="text-sm text-muted-foreground">We offer flexible payment options for your convenience.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl mx-auto">
          {payments.map(({ icon: Icon, label, sub, color, bg }) => (
            <div key={label} className="flex flex-col items-center text-center p-6 bg-card rounded-card border border-border hover:border-primary/40 hover:shadow-sm transition-all">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="font-semibold text-foreground text-sm mb-1">{label}</p>
              <p className="text-xs text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Tips for a Smooth Experience</h2>
        </div>
        <div className="space-y-3">
          {[
            'Create an account to save your wishlist and view order history.',
            'Order before 2:00 PM for same-day delivery within Kisii.',
            'Check product availability status before ordering.',
            'Use the search bar for faster product discovery.',
            'Save items to your wishlist and order when ready.',
          ].map(tip => (
            <div key={tip} className="flex items-start gap-3 p-4 bg-card rounded-card border border-border">
              <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default HowToBuy;
