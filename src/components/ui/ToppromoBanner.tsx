import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck, Zap } from 'lucide-react';

const MESSAGES = [
  {
    icon: <Truck className="w-3.5 h-3.5 flex-shrink-0" />,
    text: 'Free delivery within Kisii for orders placed before 2PM today',
    highlight: 'Order now →',
  },
  {
    icon: <Zap className="w-3.5 h-3.5 flex-shrink-0" />,
    text: 'Flash deals are live — limited stock available',
    highlight: 'Shop flash deals →',
  },
  {
    icon: <Truck className="w-3.5 h-3.5 flex-shrink-0" />,
    text: 'Same-day delivery available · Quality guaranteed · 7-day returns',
    highlight: null,
  },
];

const TopPromoBanner = () => {
  const [visible, setVisible] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('promo_banner_dismissed');
    if (!dismissed) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(t);
  }, [visible]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('promo_banner_dismissed', '1');
  };

  const msg = MESSAGES[msgIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-primary text-primary-foreground overflow-hidden"
        >
          <div className="container mx-auto px-4 h-9 flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={msgIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-xs font-medium"
                >
                  {msg.icon}
                  <span className="truncate">{msg.text}</span>
                  {msg.highlight && (
                    <span className="font-bold underline underline-offset-2 flex-shrink-0 cursor-pointer">
                      {msg.highlight}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={dismiss}
              className="flex-shrink-0 w-5 h-5 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopPromoBanner;
