import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = "Yes I'm",
  cancelText = "Not Now",
  onConfirm,
  onCancel,
  isDestructive = true
}: {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-[340px] bg-card rounded-[24px] shadow-2xl p-6 text-center"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-3 leading-tight mt-2 px-2">
              {title.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="text-sm font-body text-muted-foreground mb-8 px-2 leading-relaxed">
              {message}
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={onConfirm}
                className={`w-full py-3.5 rounded-full font-bold text-[15px] transition-colors ${
                  isDestructive 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-[#4378ff] text-white hover:bg-[#4378ff]/90'
                }`}
              >
                {confirmText}
              </button>
              <button
                onClick={onCancel}
                className="w-full py-3.5 rounded-full font-bold text-[15px] text-destructive hover:bg-destructive/5 transition-colors"
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
