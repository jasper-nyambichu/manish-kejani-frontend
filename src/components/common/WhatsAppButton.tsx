import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  productName: string;
  price: number;
  quantity?: number;
  className?: string;
  variant?: "icon" | "full";
}

const WhatsAppButton = ({ productName, price, quantity = 1, className = "", variant = "full" }: WhatsAppButtonProps) => {
  const message = `Hi, I'd like to order: ${productName} (KSh ${(price * quantity).toLocaleString()})${quantity > 1 ? ` × ${quantity}` : ""}`;
  const url = `https://wa.me/254719769263?text=${encodeURIComponent(message)}`;

  if (variant === "icon") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 text-xs font-body font-medium text-primary hover:underline ${className}`}>
        <MessageCircle className="w-3.5 h-3.5" />
        Order
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-success text-primary-foreground font-body font-semibold px-6 py-3 rounded-button hover:opacity-90 transition-opacity ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Order via WhatsApp
    </a>
  );
};

export default WhatsAppButton;
