// src/pages/public/ShippingDelivery.tsx
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, Truck, MapPin, AlertCircle } from 'lucide-react';

const zones = [
  { location: 'Kisii Town (CBD)',  time: 'Same day — orders before 2 PM', fee: 'KSh 100 – 200', color: 'text-success', bg: 'bg-success/10' },
  { location: 'Kisii Outskirts',   time: 'Same day or next business day',  fee: 'KSh 200 – 400', color: 'text-warning', bg: 'bg-warning/10' },
  { location: 'Other Counties',    time: '2 – 5 business days via courier', fee: 'Quoted on request', color: 'text-info', bg: 'bg-info/10' },
];

const processSteps = [
  'Place your order via WhatsApp or the website cart.',
  'We confirm availability and delivery fee via WhatsApp.',
  'Our delivery team contacts you before arrival.',
  'Inspect your items upon delivery before payment.',
];

const ShippingDelivery = () => (
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
            <span className="text-foreground">Shipping & Delivery</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-4">
            Shipping & <span className="text-primary underline decoration-primary/40 underline-offset-4">Delivery</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Fast, reliable delivery within Kisii and beyond. Here's everything you need to know.
          </p>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="container mx-auto px-4 py-14 max-w-4xl border-b border-border">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Delivery Zones</h2>
          <p className="text-sm text-muted-foreground">We deliver across Kisii and can ship nationwide via courier.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {zones.map(({ location, time, fee, color, bg }) => (
            <div key={location} className="flex flex-col items-center text-center p-6 bg-card rounded-card border border-border hover:border-primary/40 hover:shadow-sm transition-all">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${bg}`}>
                <MapPin className={`w-5 h-5 ${color}`} />
              </div>
              <p className="font-display text-base text-foreground mb-2">{location}</p>
              <p className="text-xs text-muted-foreground mb-1">{time}</p>
              <p className={`text-xs font-bold ${color}`}>{fee}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery Process */}
      <section className="container mx-auto px-4 py-14 max-w-3xl border-b border-border">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Delivery Process</h2>
          <p className="text-sm text-muted-foreground">What happens after you place your order.</p>
        </div>
        <div className="space-y-3">
          {processSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-card rounded-card border border-border">
              <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-sm text-muted-foreground pt-0.5">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Important Notes */}
      <section className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Important Notes</h2>
        </div>
        <div className="space-y-3">
          {[
            'Delivery fees are not included in product prices.',
            'Large or fragile items may incur additional handling fees.',
            'We are not responsible for delays caused by incorrect delivery addresses.',
            'Orders are not processed on Sundays and public holidays.',
          ].map(note => (
            <div key={note} className="flex items-start gap-3 p-4 bg-card rounded-card border border-border">
              <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 h-11 px-6 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity">
            <Truck className="w-4 h-4" /> Ask About Delivery
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default ShippingDelivery;
