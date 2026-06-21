// src/components/ui/CartOrderModal.tsx
// Multi-product WhatsApp order modal for the cart page.
// Same two-step pattern as WhatsAppOrderModal:
//   Step 1 → capture customer name, phone, delivery location
//   Step 2 → opt-in prompt for future updates
// Each cart item gets its own product URL + image in the message.

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, User, Phone, MapPin, Loader2, Bell, BellOff, CheckCircle2, ShoppingCart } from 'lucide-react';
import type { CartItem } from '@/store/cartStore';

interface CartOrderModalProps {
  isOpen:    boolean;
  onClose:   () => void;
  items:     CartItem[];
  total:     number;
  waNumber:  string;
}

type Step = 'form' | 'optin';

const CartOrderModal = ({
  isOpen,
  onClose,
  items,
  total,
  waNumber,
}: CartOrderModalProps) => {
  const [step,     setStep]     = useState<Step>('form');
  const [name,     setName]     = useState('');
  const [phone,    setPhone]    = useState('');
  const [location, setLocation] = useState('');
  const [sending,  setSending]  = useState(false);
  const [errors,   setErrors]   = useState<Record<string, string>>({});

  // Reset all state whenever modal opens — same fix as WhatsAppOrderModal
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setName('');
      setPhone('');
      setLocation('');
      setSending(false);
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())     e.name     = 'Please enter your name';
    if (!phone.trim())    e.phone    = 'Please enter your phone number';
    if (!location.trim()) e.location = 'Please enter your delivery location';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildOrderMessage = () => {
    const SITE = 'https://www.manishhouseholds.co.ke';

    const itemLines = items.map((item, i) => {
      const lines = [
        `*${i + 1}. ${item.name}*`,
        `   Qty: ${item.quantity} × KSh ${item.price.toLocaleString()} = KSh ${(item.price * item.quantity).toLocaleString()}`,
        `   🔗 ${SITE}/product/${item.id}`,
      ];
      if (item.image) lines.push(`   🖼️ ${item.image}`);
      return lines.join('\n');
    }).join('\n\n');

    return [
      '🛍️ *CART ORDER - Manish Households*',
      '─────────────────────',
      '*Customer Details:*',
      `*Name:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
      `*Delivery location:* ${location.trim()}`,
      '─────────────────────',
      `*Order Items (${items.length}):*`,
      '',
      itemLines,
      '',
      '─────────────────────',
      `*ORDER TOTAL: KSh ${total.toLocaleString()}*`,
      '─────────────────────',
      'Hello! I would like to order all the above items. Kindly confirm availability and delivery details. Thank you! 🙏',
    ].join('\n');
  };

  const buildOptInMessage = () => [
    '✅ *SUBSCRIBE - Manish Households Updates*',
    '─────────────────────',
    `*Name:* ${name.trim()}`,
    `*Phone:* ${phone.trim()}`,
    '─────────────────────',
    'Hi! I just placed a cart order and I would like to receive updates about new arrivals, flash deals, and restocks from Manish Households. Please add me to your updates list. Thank you! 🌻',
    '',
    '_Reply STOP at any time to unsubscribe._',
  ].join('\n');

  const handleSubmit = () => {
    if (!validate()) return;
    setSending(true);
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(buildOrderMessage())}`;
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setSending(false);
      setStep('optin');
    }, 400);
  };

  const handleOptIn = () => {
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(buildOptInMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleClose = () => {
    if (sending) return;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{   opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-4 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-50"
          >
            <div className="bg-card rounded-t-2xl md:rounded-2xl border border-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

              <AnimatePresence mode="wait">

                {/* ── STEP 1: CUSTOMER DETAILS FORM ── */}
                {step === 'form' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0  }}
                    exit={{   opacity: 0, x: -20 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-primary/5 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <ShoppingCart className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Order via WhatsApp</p>
                          <p className="text-xs text-muted-foreground">{items.length} item{items.length !== 1 ? 's' : ''} · KSh {total.toLocaleString()} total</p>
                        </div>
                      </div>
                      <button onClick={handleClose} className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Cart items summary — scrollable */}
                    <div className="px-5 py-3 border-b border-border bg-secondary/30 overflow-y-auto max-h-36 flex-shrink-0">
                      <p className="text-xs font-semibold text-foreground mb-2">Items in your order:</p>
                      <div className="space-y-1.5">
                        {items.map(item => (
                          <div key={item.id} className="flex items-center gap-2">
                            {item.image && (
                              <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover border border-border flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {item.quantity} × KSh {item.price.toLocaleString()} = <span className="font-semibold text-primary">KSh {(item.price * item.quantity).toLocaleString()}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form fields */}
                    <div className="px-5 py-4 space-y-3 overflow-y-auto flex-1">
                      <p className="text-xs text-muted-foreground">Fill in your details so we can process your order immediately.</p>

                      <div>
                        <label className="text-xs font-medium text-foreground mb-1 block">Your Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="text" value={name}
                            onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: '' })); }}
                            placeholder="e.g. Jane Wanjiru"
                            className={`w-full h-10 pl-9 pr-3 text-sm bg-secondary border rounded-lg outline-none transition-colors ${errors.name ? 'border-destructive' : 'border-border focus:border-primary'}`} />
                        </div>
                        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-medium text-foreground mb-1 block">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="tel" value={phone}
                            onChange={e => { setPhone(e.target.value); setErrors(v => ({ ...v, phone: '' })); }}
                            placeholder="e.g. 0712 345 678"
                            className={`w-full h-10 pl-9 pr-3 text-sm bg-secondary border rounded-lg outline-none transition-colors ${errors.phone ? 'border-destructive' : 'border-border focus:border-primary'}`} />
                        </div>
                        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-medium text-foreground mb-1 block">Delivery Location in Kisii</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="text" value={location}
                            onChange={e => { setLocation(e.target.value); setErrors(v => ({ ...v, location: '' })); }}
                            placeholder="e.g. Mwembe, near KCB bank"
                            className={`w-full h-10 pl-9 pr-3 text-sm bg-secondary border rounded-lg outline-none transition-colors ${errors.location ? 'border-destructive' : 'border-border focus:border-primary'}`} />
                        </div>
                        {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 pb-5 pt-2 space-y-2 flex-shrink-0 border-t border-border bg-card">
                      <button onClick={handleSubmit} disabled={sending}
                        className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70">
                        {sending ? (
                          <><Loader2 className="w-4 h-4 animate-spin" />Opening WhatsApp...</>
                        ) : (
                          <><MessageCircle className="w-4 h-4" />Send Order on WhatsApp</>
                        )}
                      </button>
                      <p className="text-center text-xs text-muted-foreground">Your details are only shared with the seller via WhatsApp</p>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 2: OPT-IN PROMPT ── */}
                {step === 'optin' && (
                  <motion.div
                    key="optin"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0  }}
                    exit={{   opacity: 0, x: 20  }}
                    transition={{ duration: 0.18 }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-primary/5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Order Sent! 🎉</p>
                          <p className="text-xs text-muted-foreground">We'll confirm on WhatsApp shortly</p>
                        </div>
                      </div>
                      <button onClick={handleClose} className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Opt-in body */}
                    <div className="px-5 py-6 text-center space-y-3">
                      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Bell className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Stay in the loop, {name.trim().split(' ')[0]}!
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Get notified on WhatsApp when we restock items, launch flash deals, or have exclusive offers.
                        </p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3 text-left space-y-1.5">
                        {[
                          '🔔 New arrivals & restocks',
                          '⚡ Flash deals before they sell out',
                          '🎁 Exclusive customer-only offers',
                        ].map(item => (
                          <p key={item} className="text-xs text-foreground">{item}</p>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">No spam. Reply STOP at any time to unsubscribe.</p>
                    </div>

                    {/* CTA buttons */}
                    <div className="px-5 pb-5 space-y-2">
                      <button onClick={handleOptIn}
                        className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                        <Bell className="w-4 h-4" />
                        Yes, keep me updated!
                      </button>
                      <button onClick={handleClose}
                        className="w-full h-10 text-muted-foreground text-xs flex items-center justify-center gap-1.5 hover:text-foreground transition-colors">
                        <BellOff className="w-3.5 h-3.5" />
                        No thanks
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartOrderModal;