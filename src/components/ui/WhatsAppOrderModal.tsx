// src/components/ui/WhatsAppOrderModal.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, User, Phone, MapPin, Loader2, Bell, BellOff, CheckCircle2 } from 'lucide-react';
import type { Product } from '@/types/product.types';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  quantity: number;
  waNumber: string;
}

// Step 1: Order form | Step 2: Opt-in prompt after order is sent
type Step = 'form' | 'optin';

const WhatsAppOrderModal = ({
  isOpen,
  onClose,
  product,
  quantity,
  waNumber,
}: WhatsAppOrderModalProps) => {
  const [step, setStep]         = useState<Step>('form');
  const [name, setName]         = useState('');
  const [phone, setPhone]       = useState('');
  const [location, setLocation] = useState('');
  const [sending, setSending]   = useState(false);
  const [errors, setErrors]     = useState<Record<string, string>>({});

  const productId = product.id ?? product._id;
  const imageUrl  = product.images?.[0]?.url ?? '';
  const total     = product.price * quantity;
  const discount  = product.discountPercent ?? 0;

  // Reset everything whenever the modal opens — this is the reliable fix.
  // resetAndClose's setTimeout approach fails because onClose() unmounts the
  // component before the timeout fires, so state never actually clears.
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
    const productUrl = `https://www.manishhouseholds.co.ke/product/${productId}`;
    const lines = [
      '🛍️ *NEW ORDER - Manish Households*',
      '─────────────────────',
      `*Product:* ${product.name}`,
      `*Price:* KSh ${product.price.toLocaleString()}`,
      `*Quantity:* ${quantity}`,
      `*Total:* KSh ${total.toLocaleString()}`,
    ];
    if (product.originalPrice && discount > 0) {
      lines.push(`*You save:* KSh ${((product.originalPrice - product.price) * quantity).toLocaleString()} (${discount}% OFF 🔥)`);
    }
    lines.push('─────────────────────');
    lines.push('*Customer Details:*');
    lines.push(`*Name:* ${name.trim()}`);
    lines.push(`*Phone:* ${phone.trim()}`);
    lines.push(`*Delivery location:* ${location.trim()}`);
    lines.push('─────────────────────');
    lines.push(`🔗 *Product page:* ${productUrl}`);
    if (imageUrl) lines.push(`🖼️ *Product image:* ${imageUrl}`);
    lines.push('─────────────────────');
    lines.push('Hello! I would like to order the above product. Kindly confirm availability and delivery details. Thank you! 🙏');
    return lines.join('\n');
  };

  // The opt-in message the customer sends to subscribe to updates.
  // Owner sees this + the customer's name/number and adds them to their
  // WhatsApp Business broadcast list for future deal/restock notifications.
  const buildOptInMessage = () => {
    return [
      '✅ *SUBSCRIBE - Manish Households Updates*',
      '─────────────────────',
      `*Name:* ${name.trim()}`,
      `*Phone:* ${phone.trim()}`,
      '─────────────────────',
      'Hi! I just placed an order and I would like to receive updates about new arrivals, flash deals, and restocks from Manish Households. Please add me to your updates list. Thank you! 🌻',
      '',
      '_Reply STOP at any time to unsubscribe._',
    ].join('\n');
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSending(true);
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(buildOrderMessage())}`;
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setSending(false);
      // Transition to opt-in step instead of closing
      setStep('optin');
    }, 400);
  };

  const handleOptIn = () => {
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(buildOptInMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    resetAndClose();
  };

  const handleOptOut = () => {
    resetAndClose();
  };

  const resetAndClose = () => {
    // Just close — useEffect on isOpen handles the state reset on next open
    onClose();
  };

  const handleClose = () => {
    if (sending) return;
    resetAndClose();
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
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-4 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md z-50"
          >
            <div className="bg-card rounded-t-2xl md:rounded-2xl border border-border shadow-2xl overflow-hidden">

              {/* ── STEP 1: ORDER FORM ── */}
              <AnimatePresence mode="wait">
                {step === 'form' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.18 }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-primary/5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Order via WhatsApp</p>
                          <p className="text-xs text-muted-foreground">We'll confirm within minutes</p>
                        </div>
                      </div>
                      <button onClick={handleClose} className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Product summary */}
                    <div className="flex items-center gap-3 px-5 py-3 bg-secondary/40 border-b border-border">
                      {imageUrl && (
                        <img src={imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-border flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {quantity}&nbsp;•&nbsp;
                          <span className="text-primary font-semibold">KSh {total.toLocaleString()}</span>
                        </p>
                      </div>
                    </div>

                    {/* Form fields */}
                    <div className="px-5 py-4 space-y-3">
                      <p className="text-xs text-muted-foreground">Fill in your details so we can prepare your order immediately.</p>

                      <div>
                        <label className="text-xs font-medium text-foreground mb-1 block">Your Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="text" value={name} onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: '' })); }}
                            placeholder="e.g. Jane Wanjiru"
                            className={`w-full h-10 pl-9 pr-3 text-sm bg-secondary border rounded-lg outline-none transition-colors ${errors.name ? 'border-destructive' : 'border-border focus:border-primary'}`} />
                        </div>
                        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-medium text-foreground mb-1 block">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="tel" value={phone} onChange={e => { setPhone(e.target.value); setErrors(v => ({ ...v, phone: '' })); }}
                            placeholder="e.g. 0712 345 678"
                            className={`w-full h-10 pl-9 pr-3 text-sm bg-secondary border rounded-lg outline-none transition-colors ${errors.phone ? 'border-destructive' : 'border-border focus:border-primary'}`} />
                        </div>
                        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="text-xs font-medium text-foreground mb-1 block">Delivery Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input type="text" value={location} onChange={e => { setLocation(e.target.value); setErrors(v => ({ ...v, location: '' })); }}
                            placeholder="e.g. Mwembe, near KCB bank"
                            className={`w-full h-10 pl-9 pr-3 text-sm bg-secondary border rounded-lg outline-none transition-colors ${errors.location ? 'border-destructive' : 'border-border focus:border-primary'}`} />
                        </div>
                        {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-5 pb-5 pt-1 space-y-2">
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
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
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
                        <p className="text-sm font-semibold text-foreground">Stay in the loop, {name.trim().split(' ')[0]}!</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Get notified on WhatsApp when we restock items, launch flash deals, or have exclusive offers — just for our customers.
                        </p>
                      </div>

                      {/* What they'll receive */}
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
                      <button onClick={handleOptOut}
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

export default WhatsAppOrderModal;