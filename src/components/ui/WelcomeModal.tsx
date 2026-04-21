import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen it in the last 1 day to make it more active
    const lastSeen = localStorage.getItem('welcome_modal_seen');
    const now = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!lastSeen || now - parseInt(lastSeen) > oneDay) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000); // 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden bg-card rounded-2xl shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                localStorage.setItem('welcome_modal_seen', new Date().getTime().toString());
              }}
              className="absolute top-3 right-3 z-10 p-1 bg-foreground/5 hover:bg-foreground/10 rounded-full text-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8 w-full text-center relative overflow-hidden bg-gradient-to-br from-card to-secondary/30">
               {/* Background design element */}
               <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
               <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
               
               <img src={logo} alt="Manish Households" className="h-10 mx-auto mb-6 brightness-150 grayscale contrast-200" />
               
               <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                 Unlock <span className="text-primary">10% Off</span>
               </h2>
               <h3 className="text-xl font-display font-bold text-foreground mb-2">
                 Your First Order
               </h3>
               <p className="text-sm font-body text-muted-foreground mb-6">
                 Join the Manish Households family and get exclusive access to our newest arrivals, deals, and special promotions.
               </p>

               <form onSubmit={(e) => { 
                 e.preventDefault(); 
                 setIsOpen(false); 
                 localStorage.setItem('welcome_modal_seen', new Date().getTime().toString()); 
               }} className="space-y-3">
                 <input 
                   type="email" 
                   placeholder="Enter your email address" 
                   required
                   className="w-full px-4 py-3 bg-background border border-border rounded-button text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                 />
                 <button 
                   type="submit"
                   className="w-full bg-primary text-primary-foreground font-bold text-sm uppercase py-3 rounded-button hover:opacity-90 transition-opacity"
                 >
                   Unlock Offers
                 </button>
               </form>

               <button 
                 onClick={() => {
                   setIsOpen(false);
                   localStorage.setItem('welcome_modal_seen', new Date().getTime().toString());
                 }}
                 className="mt-4 text-xs font-body text-muted-foreground hover:underline"
               >
                 No thanks, I'll pay full price.
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
