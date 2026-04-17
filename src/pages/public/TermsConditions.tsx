// src/pages/public/TermsConditions.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, ChevronDown, Scale } from 'lucide-react';

const sections = [
  {
    title: '1. Use of the Website',
    body: 'You may use this website for lawful purposes only. You must not use it in any way that breaches applicable laws, infringes intellectual property rights, or transmits harmful or offensive content.',
  },
  {
    title: '2. Product Information',
    body: 'We make every effort to display product information accurately. However, we do not warrant that product descriptions, prices, or availability are error-free. We reserve the right to correct errors and update information at any time.',
  },
  {
    title: '3. Ordering & Payment',
    body: 'Orders are placed via WhatsApp or the website cart. An order is confirmed only after we acknowledge it via WhatsApp. We reserve the right to cancel orders due to stock unavailability or pricing errors.',
  },
  {
    title: '4. Pricing',
    body: 'All prices are in Kenyan Shillings (KSh) and are inclusive of applicable taxes. Delivery fees are charged separately and communicated at the time of order confirmation.',
  },
  {
    title: '5. Intellectual Property',
    body: 'All content on this website — including logos, images, text, and design — is the property of Manish Kejani Households & Décor and may not be reproduced without written permission.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'To the fullest extent permitted by law, Manish Kejani shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or our products.',
  },
  {
    title: '7. Changes to Terms',
    body: 'We may update these Terms at any time. Continued use of the website after changes constitutes acceptance of the updated Terms.',
  },
  {
    title: '8. Governing Law',
    body: 'These Terms are governed by the laws of Kenya. Any disputes shall be subject to the exclusive jurisdiction of Kenyan courts.',
  },
];

const TermsConditions = () => {
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
              <span className="text-foreground">Terms & Conditions</span>
            </nav>
            <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-4">
              Terms & <span className="text-primary underline decoration-primary/40 underline-offset-4">Conditions</span>
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: January 2025</p>
          </div>
        </section>

        {/* Intro */}
        <section className="container mx-auto px-4 py-10 max-w-3xl">
          <div className="bg-primary/5 border border-primary/20 rounded-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accessing or using <strong className="text-foreground">manishhouseholds.co.ke</strong>, you agree to be bound by these Terms and Conditions. Please read them carefully before using our website or placing an order.
            </p>
          </div>
        </section>

        {/* Accordion Sections */}
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
                  <div className="px-5 pb-5 pt-4 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    {s.body}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-8 text-center">
            Questions?{' '}
            <Link to="/contact" className="text-primary hover:underline font-medium">Contact us</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
