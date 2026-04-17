// src/pages/public/ContactUs.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MessageCircle, Phone, MapPin, Mail, Send, ChevronRight, Clock } from 'lucide-react';
import { toast } from 'sonner';

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }
    const text = `Hi Manish Kejani 👋\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;
    window.open(`https://wa.me/254719769263?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    toast.success('Opening WhatsApp with your message...');
    setForm({ name: '', email: '', message: '' });
  };

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
              <span className="text-foreground">Contact Us</span>
            </nav>
            <h1 className="font-display text-3xl md:text-5xl text-foreground leading-tight mb-4">
              Get in <span className="text-primary underline decoration-primary/40 underline-offset-4">Touch</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              We'd love to hear from you. Reach us through any of the channels below or send a message directly.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="container mx-auto px-4 -mt-2 pb-12 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: MessageCircle,
                label: 'WhatsApp',
                value: '0719 769 263',
                sub: 'Fastest response',
                href: 'https://wa.me/254719769263',
                color: 'text-success',
                bg: 'bg-success/10',
              },
              {
                icon: Phone,
                label: 'Call Us',
                value: '0719 769 263',
                sub: 'Mon – Sat, 8AM – 6PM',
                href: 'tel:+254719769263',
                color: 'text-info',
                bg: 'bg-info/10',
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'info@manishhouseholds.co.ke',
                sub: 'Response within 24hrs',
                href: 'mailto:info@manishhouseholds.co.ke',
                color: 'text-primary',
                bg: 'bg-primary/10',
              },
              {
                icon: MapPin,
                label: 'Visit Store',
                value: 'Market Plaza Rm 214',
                sub: 'Kisii Town, Kenya',
                href: '/about',
                color: 'text-warning',
                bg: 'bg-warning/10',
              },
            ].map(({ icon: Icon, label, value, sub, href, color, bg }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex flex-col items-center text-center p-6 bg-card rounded-card border border-border hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className="text-xs font-bold text-foreground mb-1">{label}</p>
                <p className="text-xs text-muted-foreground leading-tight mb-0.5">{value}</p>
                <p className="text-[10px] text-muted-foreground">{sub}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="container mx-auto px-4 pb-14 max-w-2xl">
          <div className="bg-card rounded-card border border-border p-8">
            <h2 className="font-display text-2xl text-foreground mb-2 text-center">Send a Message</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full h-11 px-4 text-sm bg-secondary border border-border rounded-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full h-11 px-4 text-sm bg-secondary border border-border rounded-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full px-4 py-3 text-sm bg-secondary border border-border rounded-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
              <button type="submit"
                className="w-full flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm">
                <Send className="w-4 h-4" />
                Send via WhatsApp
              </button>
            </form>
            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>Business hours: Monday – Saturday, 8:00 AM – 6:00 PM EAT</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
