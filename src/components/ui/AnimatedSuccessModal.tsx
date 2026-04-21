import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';

interface AnimatedSuccessModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
}

export default function AnimatedSuccessModal({ 
  isOpen, 
  title = "Success!", 
  message = "Action completed successfully."
}: AnimatedSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full max-w-sm bg-card rounded-2xl shadow-xl p-8 flex flex-col items-center text-center relative overflow-hidden pointer-events-auto"
          >
             {/* Decorative Background */}
             <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>

             <img src={logo} alt="Logo" className="h-8 mb-6 grayscale contrast-200 opacity-80" />
             
             {/* Animated Tick */}
             <div className="relative mb-6 text-primary flex items-center justify-center">
                <motion.div
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                >
                  <svg className="w-20 h-20" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="25" className="fill-current opacity-20" />
                    <motion.path 
                       fill="none" 
                       stroke="currentColor" 
                       strokeWidth="4" 
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       d="M14 26 L22 34 L36 16"
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 1 }}
                       transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    />
                  </svg>
                </motion.div>
             </div>

             <h3 className="text-xl font-display font-bold text-foreground mb-2">{title}</h3>
             <p className="text-sm font-body text-muted-foreground">{message}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
