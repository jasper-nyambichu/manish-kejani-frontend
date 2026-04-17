// src/pages/public/DisputeResolution.tsx
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronRight, MessageCircle, Mail, ShieldCheck, HeartHandshake } from 'lucide-react';

const DisputeResolution = () => (
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
            <span className="text-foreground">Dispute Resolution</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-4">
            Dispute <span className="text-primary underline decoration-primary/40 underline-offset-4">Resolution</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            We are committed to resolving any disputes fairly and promptly. Here's how the process works.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-4 py-14 max-w-3xl border-b border-border">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">Resolution Process</h2>
          <p className="text-sm text-muted-foreground">Three steps to resolve any issue quickly and fairly.</p>
        </div>
        <div className="space-y-5">
          {[
            {
              icon: MessageCircle,
              step: '01',
              title: 'Contact Us Directly',
              body: 'Most issues are resolved quickly by contacting our team via WhatsApp (0719 769 263) or visiting our store. Provide your order details and a clear description of the issue.',
              color: 'text-success', bg: 'bg-success/10',
            },
            {
              icon: Mail,
              step: '02',
              title: 'Formal Complaint',
              body: 'If unresolved within 48 hours, email info@manishhouseholds.co.ke with your full name, order reference, a description of the dispute, and supporting evidence (photos, screenshots).',
              color: 'text-info', bg: 'bg-info/10',
            },
            {
              icon: ShieldCheck,
              step: '03',
              title: 'Resolution',
              body: 'We acknowledge within 24 hours and aim to resolve within 5 business days. Possible outcomes include replacement, refund, or store credit.',
              color: 'text-primary', bg: 'bg-primary/10',
            },
          ].map(({ icon: Icon, step, title, body, color, bg }) => (
            <div key={step} className="flex gap-5 p-6 bg-card rounded-card border border-border hover:border-primary/40 hover:shadow-sm transition-all">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="font-display text-base text-foreground mb-2">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commitments */}
      <section className="container mx-auto px-4 py-14 max-w-3xl">
        <div className="bg-card rounded-card border border-border p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-xl text-foreground">Our Commitments</h2>
          </div>
          <div className="space-y-3">
            {[
              'We treat all complaints with fairness and confidentiality.',
              'We do not retaliate against customers who raise legitimate complaints.',
              'We continuously improve our processes based on feedback.',
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            For returns, see our{' '}
            <Link to="/return-policy" className="text-primary hover:underline font-medium">Return Policy</Link>.
          </p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default DisputeResolution;
