// src/pages/public/CookiePolicy.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, ChevronDown, Cookie, Settings, BarChart2, Lock } from 'lucide-react';

const cookieTypes = [
  {
    icon: Lock,
    label: 'Essential Cookies',
    desc: 'Required for the website to function — keeping you logged in, cart contents.',
    control: 'Cannot be disabled',
    color: 'text-destructive',
    bg: 'bg-destructive/10',
  },
  {
    icon: Settings,
    label: 'Preference Cookies',
    desc: 'Remember your settings and preferences such as recently viewed products.',
    control: 'Can be disabled',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    icon: BarChart2,
    label: 'Analytics Cookies',
    desc: 'Help us understand how visitors use the site so we can improve it.',
    control: 'Can be disabled',
    color: 'text-info',
    bg: 'bg-info/10',
  },
];

const faqs = [
  {
    title: 'What Are Cookies?',
    body: 'Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your experience on future visits.',
  },
  {
    title: 'How to Control Cookies',
    body: 'You can control and delete cookies through your browser settings. Note that disabling essential cookies may affect website functionality. Most browsers allow you to view stored cookies, delete all or specific cookies, and block cookies from specific or all websites.',
  },
  {
    title: 'Third-Party Cookies',
    body: 'We may use third-party services such as Google Analytics that set their own cookies. These are governed by the respective third-party privacy policies and are outside our direct control.',
  },
];

const CookiePolicy = () => {
  const [open, setOpen] = useState<number | null>(null);

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
              <span className="text-foreground">Cookie Policy</span>
            </nav>
            <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-4">
              Cookie <span className="text-primary underline decoration-primary/40 underline-offset-4">Policy</span>
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: January 2025</p>
          </div>
        </section>

        {/* Intro */}
        <section className="container mx-auto px-4 py-10 max-w-3xl">
          <div className="bg-primary/5 border border-primary/20 rounded-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This Cookie Policy explains what cookies are, how <strong className="text-foreground">Manish Kejani</strong> uses them, and how you can control them on your device.
            </p>
          </div>
        </section>

        {/* Cookie Types */}
        <section className="container mx-auto px-4 pb-14 max-w-4xl border-b border-border">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Cookies We Use</h2>
            <p className="text-sm text-muted-foreground">Three types of cookies are used on this website.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {cookieTypes.map(({ icon: Icon, label, desc, control, color, bg }) => (
              <div key={label} className="flex flex-col items-center text-center p-6 bg-card rounded-card border border-border hover:border-primary/40 hover:shadow-sm transition-all">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${bg}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className="font-display text-base text-foreground mb-2">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{desc}</p>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-badge ${bg} ${color}`}>
                  {control}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="container mx-auto px-4 py-14 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Cookie Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-border rounded-card overflow-hidden bg-card">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/40 transition-colors"
                >
                  <span className="text-sm font-semibold text-primary">{f.title}</span>
                  <ChevronDown className={`w-4 h-4 text-primary flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <div className="px-5 pb-5 pt-4 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    {f.body}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-8 text-center">
            For more information, see our{' '}
            <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>{' '}
            or{' '}
            <Link to="/contact" className="text-primary hover:underline font-medium">contact us</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
