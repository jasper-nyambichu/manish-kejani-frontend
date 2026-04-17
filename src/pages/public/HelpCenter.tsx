// src/pages/public/HelpCenter.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Search, ChevronDown, ChevronRight,
  BookOpen, MessageCircle, Users,
  Phone, MapPin, Mail, ArrowRight,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────
interface AccordionItem { q: string; a: string; }
interface AccordionGroupProps { title: string; subtitle: string; items: AccordionItem[]; }

// ── Accordion Group ──────────────────────────────────────────
const AccordionGroup = ({ title, subtitle, items }: AccordionGroupProps) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="py-14 border-b border-border last:border-0">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">{title}</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>
      <div className="space-y-3 max-w-3xl mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-border rounded-card overflow-hidden bg-card"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/40 transition-colors"
            >
              <span className="text-sm font-semibold text-primary">{item.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-primary flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── FAQ Data ─────────────────────────────────────────────────
const gettingStarted: AccordionItem[] = [
  {
    q: 'How do I create an account?',
    a: 'Click "Sign In" in the top navigation, then select "Create Account". Fill in your name, email and password. You will receive a verification email — click the link to activate your account.',
  },
  {
    q: 'How do I browse and find products?',
    a: 'Use the search bar at the top of any page, or browse by category using the navigation menu. You can filter results by price, availability and rating on any category or search page.',
  },
  {
    q: 'How do I place an order?',
    a: 'Add items to your cart, then click "Order via WhatsApp" from the cart page. This opens a pre-filled WhatsApp message with your full order details sent directly to our team. We confirm availability and arrange delivery.',
  },
  {
    q: 'Can I save products for later?',
    a: 'Yes. Click the heart icon on any product card or product page to save it to your Wishlist. Access your saved items anytime from the Wishlist link in the navigation bar.',
  },
];

const orderingPayment: AccordionItem[] = [
  {
    q: 'What payment methods do you accept?',
    a: 'We accept M-Pesa (Paybill and Till Number), cash on delivery, Visa and Mastercard. Payment details are confirmed when you place your order via WhatsApp.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Same-day delivery within Kisii Town for orders placed before 2:00 PM. Orders after 2 PM are delivered the next business day. Delivery to other counties takes 2–5 business days via courier.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order is confirmed via WhatsApp, our delivery team will send you updates through the same chat. You will be notified when your order is out for delivery.',
  },
  {
    q: 'Can I cancel or modify my order?',
    a: 'You can cancel or modify your order before it is dispatched. Contact us immediately via WhatsApp at 0719 769 263. Once an order is out for delivery, changes may not be possible.',
  },
];

const returnsWarranty: AccordionItem[] = [
  {
    q: 'What is your return policy?',
    a: 'We accept returns within 7 days of delivery for defective or incorrect items. Items must be unused and in original packaging. Contact us via WhatsApp with photos of the issue to initiate a return.',
  },
  {
    q: 'How do I get a refund?',
    a: 'Approved refunds are processed within 3 business days via M-Pesa or cash. Original delivery fees are non-refundable unless the return is due to our error.',
  },
  {
    q: 'What items cannot be returned?',
    a: 'Used, washed or altered items, items without original packaging, perishable goods, and items marked "Final Sale" on the product page are not eligible for return.',
  },
];

// ── Recent Articles ──────────────────────────────────────────
const articles = [
  { date: 'Jan 10, 2025', title: 'How to Order via WhatsApp in 3 Easy Steps', to: '/how-to-buy' },
  { date: 'Jan 8, 2025',  title: 'Understanding Our Delivery Zones & Fees',   to: '/shipping' },
  { date: 'Jan 5, 2025',  title: 'Returns Made Simple: What You Need to Know', to: '/return-policy' },
  { date: 'Jan 2, 2025',  title: 'Payment Methods We Accept at Manish Kejani', to: '/how-to-buy' },
];

// ── Main Component ───────────────────────────────────────────
const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />

      <main>
        {/* ── Hero Section ── */}
        <section className="relative bg-gradient-to-b from-secondary/60 to-background overflow-hidden">
          {/* Subtle decorative background circles */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary/5 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-primary/5 pointer-events-none" />

          <div className="relative container mx-auto px-4 pt-16 pb-14 text-center max-w-2xl">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-8">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">Help Center</span>
            </nav>

            <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-6">
              How can we{' '}
              <span className="text-primary underline decoration-primary/40 underline-offset-4">
                help you?
              </span>
            </h1>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative max-w-lg mx-auto mb-5">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Start typing your search..."
                className="w-full h-14 pl-6 pr-16 rounded-full border border-border bg-card shadow-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:opacity-90 transition-opacity shadow"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </form>

            <p className="text-sm text-muted-foreground">
              Or <strong className="text-foreground">choose</strong> an option below to find what you need.
            </p>
          </div>
        </section>

        {/* ── 3-Column Quick Access Cards ── */}
        <section className="container mx-auto px-4 -mt-2 pb-4 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: BookOpen,
                label: 'Guides',
                desc: 'Step-by-step guides on ordering, delivery and account management.',
                to: '/how-to-buy',
              },
              {
                icon: MessageCircle,
                label: 'FAQ',
                desc: 'Quick answers to the most common questions from our customers.',
                to: '#faq',
              },
              {
                icon: Users,
                label: 'Contact Us',
                desc: 'Reach our team directly via WhatsApp, phone or email.',
                to: '/contact',
              },
            ].map(({ icon: Icon, label, desc, to }) => (
              <Link
                key={label}
                to={to}
                className="group flex flex-col items-center text-center p-7 bg-card rounded-card border border-border hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center mb-4 group-hover:border-primary group-hover:bg-primary/5 transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-base text-foreground mb-2">{label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Accordion FAQ Sections ── */}
        <section id="faq" className="container mx-auto px-4 max-w-4xl">
          <AccordionGroup
            title="Getting Started"
            subtitle="New to Manish Kejani? Everything you need to know to start shopping with confidence."
            items={gettingStarted}
          />
          <AccordionGroup
            title="Ordering & Payment"
            subtitle="Questions about placing orders, payment methods and delivery timelines."
            items={orderingPayment}
          />
          <AccordionGroup
            title="Returns & Warranty"
            subtitle="Our return process, refund timelines and what qualifies for a return."
            items={returnsWarranty}
          />
        </section>

        {/* ── Recent Articles Strip ── */}
        <section className="bg-secondary/40 border-t border-border mt-4">
          <div className="container mx-auto px-4 py-12 max-w-5xl">
            <h2 className="font-display text-xl text-foreground mb-8 text-center">Helpful Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {articles.map(({ date, title, to }) => (
                <Link
                  key={title}
                  to={to}
                  className="group bg-card rounded-card border border-border p-5 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <p className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wide">{date}</p>
                  <h4 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors mb-3">
                    {title}
                  </h4>
                  <span className="flex items-center gap-1 text-xs text-primary font-medium">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact Strip ── */}
        <section className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="bg-card rounded-card border border-border p-8">
            <h2 className="font-display text-xl text-foreground mb-2 text-center">Still need help?</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Our team is available Monday – Saturday, 8:00 AM – 6:00 PM EAT.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  value: '0719 769 263',
                  href: 'https://wa.me/254719769263',
                  color: 'text-success',
                  bg: 'bg-success/10',
                },
                {
                  icon: Phone,
                  label: 'Call Us',
                  value: '0719 769 263',
                  href: 'tel:+254719769263',
                  color: 'text-info',
                  bg: 'bg-info/10',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'info@manishhouseholds.co.ke',
                  href: 'mailto:info@manishhouseholds.co.ke',
                  color: 'text-primary',
                  bg: 'bg-primary/10',
                },
                {
                  icon: MapPin,
                  label: 'Visit Store',
                  value: 'Market Plaza Rm 214, Kisii',
                  href: '/contact',
                  color: 'text-warning',
                  bg: 'bg-warning/10',
                },
              ].map(({ icon: Icon, label, value, href, color, bg }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex flex-col items-center text-center p-4 rounded-card border border-border hover:border-primary/40 hover:shadow-sm transition-all group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${bg}`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <p className="text-xs font-bold text-foreground mb-1">{label}</p>
                  <p className="text-[11px] text-muted-foreground leading-tight">{value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;
