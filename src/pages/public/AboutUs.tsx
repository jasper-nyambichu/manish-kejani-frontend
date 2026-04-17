// src/pages/public/AboutUs.tsx
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, MapPin, Phone, Star, ShieldCheck, Truck, MessageCircle, RotateCcw } from 'lucide-react';

const AboutUs = () => (
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
            <span className="text-foreground">About Us</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-4">
            About <span className="text-primary underline decoration-primary/40 underline-offset-4">Manish Kejani</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Kisii's premier household goods retailer — quality kitchenware, bedding, home décor and everyday essentials delivered to your door.
          </p>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="container mx-auto px-4 py-14 max-w-3xl border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl text-foreground mb-4">Our Story</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Founded with a passion for beautiful, functional homes, Manish Kejani started as a small shop in Kisii's Market Plaza. Over the years we have grown into a trusted household name — serving thousands of happy customers across Kenya with quality products at fair prices.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground mb-4">Our Mission</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To make every Kenyan home beautiful and functional by providing premium household products that are accessible, affordable, and delivered with exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-14 max-w-4xl border-b border-border">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Why Choose Us</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            We go beyond just selling products — we deliver an experience you can trust.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: ShieldCheck, label: 'Quality Guaranteed',  desc: 'Every product is quality-checked before it reaches you.',          color: 'text-success',  bg: 'bg-success/10'  },
            { icon: Truck,       label: 'Fast Delivery',       desc: 'Same-day delivery within Kisii for orders before 2 PM.',           color: 'text-info',     bg: 'bg-info/10'     },
            { icon: MessageCircle, label: 'WhatsApp Ordering', desc: 'Order easily via WhatsApp — no complicated checkout.',             color: 'text-success',  bg: 'bg-success/10'  },
            { icon: RotateCcw,   label: 'Easy Returns',        desc: '7-day return policy for defective or incorrect items.',            color: 'text-warning',  bg: 'bg-warning/10'  },
          ].map(({ icon: Icon, label, desc, color, bg }) => (
            <div key={label} className="group flex flex-col items-center text-center p-6 bg-card rounded-card border border-border hover:border-primary/40 hover:shadow-md transition-all">
              <div className={`w-14 h-14 rounded-full border-2 border-transparent flex items-center justify-center mb-4 ${bg} group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <p className="font-display text-base text-foreground mb-2">{label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary/40 border-b border-border">
        <div className="container mx-auto px-4 py-14 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+',   label: 'Products'         },
              { value: '2,000+', label: 'Happy Customers'  },
              { value: '4.8',    label: 'Average Rating'   },
              { value: '100%',   label: 'Quality Checked'  },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-3xl md:text-4xl text-primary mb-1">{value}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Store */}
      <section className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="bg-card rounded-card border border-border p-8 text-center">
          <h2 className="font-display text-2xl text-foreground mb-6">Visit Our Store</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span>Market Plaza Room 214, Kisii Town</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-info" />
              </div>
              <span>0719 769 263</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-warning fill-warning" />
              </div>
              <span>4.8 / 5 rating</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link to="/" className="h-11 px-6 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity flex items-center">
              Browse Collection
            </Link>
            <Link to="/contact" className="h-11 px-6 border border-border text-foreground rounded-button font-semibold text-sm hover:bg-secondary transition-colors flex items-center">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default AboutUs;
