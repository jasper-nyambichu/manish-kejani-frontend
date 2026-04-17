// src/pages/public/PrivacyPolicy.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, ChevronDown, ShieldCheck } from 'lucide-react';

const sections = [
  {
    title: '1. Information We Collect',
    items: [
      'Account information: name, email address, phone number.',
      'Order information: products ordered, delivery address, payment method.',
      'Usage data: pages visited, search queries, products viewed.',
      'Device information: browser type, IP address, operating system.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    items: [
      'To process and fulfill your orders.',
      'To communicate with you about your orders and account.',
      'To improve our website and product offerings.',
      'To send promotional emails (only with your consent).',
      'To comply with legal obligations.',
    ],
  },
  {
    title: '3. Information Sharing',
    items: [
      'We do not sell your personal information to third parties.',
      'We may share data with delivery partners solely to fulfill your orders.',
      'We may disclose information if required by law.',
    ],
  },
  {
    title: '4. Data Security',
    items: [
      'We use industry-standard encryption (HTTPS/TLS) to protect data in transit.',
      'Passwords are hashed and never stored in plain text.',
      'Access to personal data is restricted to authorized personnel only.',
    ],
  },
  {
    title: '5. Your Rights',
    items: [
      'Access: request a copy of the personal data we hold about you.',
      'Correction: request correction of inaccurate data.',
      'Deletion: request deletion of your account and associated data.',
      'Opt-out: unsubscribe from marketing emails at any time.',
    ],
  },
  {
    title: '6. Cookies',
    items: [
      'We use cookies to improve your browsing experience.',
      'See our Cookie Policy for full details on what we collect and how to control it.',
    ],
  },
];

const PrivacyPolicy = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
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
              <span className="text-foreground">Privacy Policy</span>
            </nav>
            <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-4">
              Privacy <span className="text-primary underline decoration-primary/40 underline-offset-4">Policy</span>
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: January 2025</p>
          </div>
        </section>

        {/* Intro */}
        <section className="container mx-auto px-4 py-10 max-w-3xl">
          <div className="bg-success/5 border border-success/20 rounded-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-success" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Manish Kejani Households & Décor</strong> is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website.
            </p>
          </div>
        </section>

        {/* Accordion */}
        <section className="container mx-auto px-4 pb-14 max-w-3xl">
          <div className="space-y-3">
            {sections.map((s, i) => (
              <div key={i} className="border border-border rounded-card overflow-hidden bg-card">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/40 transition-colors"
                >
                  <span className="text-sm font-semibold text-primary">{s.title}</span>
                  <ChevronDown className={`w-4 h-4 text-primary flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <div className="px-5 pb-5 pt-4 border-t border-border">
                    <ul className="space-y-2">
                      {s.items.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-8 text-center">
            To exercise your rights or ask questions,{' '}
            <Link to="/contact" className="text-primary hover:underline font-medium">contact us</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
