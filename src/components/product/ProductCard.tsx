import { type Product } from "@/data/products";
import { Heart, Star, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const StockBadge = ({ stock }: { stock: Product["stock"] }) => {
  const styles = {
    "in-stock": "bg-success/10 text-success",
    "low-stock": "bg-warning/10 text-warning",
    "out-of-stock": "bg-destructive/10 text-destructive",
  };
  const labels = {
    "in-stock": "In Stock",
    "low-stock": "Low Stock",
    "out-of-stock": "Out of Stock",
  };
  return (
    <span className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-badge ${styles[stock]}`}>
      {labels[stock]}
    </span>
  );
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-card rounded-card border border-border overflow-hidden group relative"
    >
      {/* Discount badge */}
      {product.discount && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs font-body font-bold px-2 py-0.5 rounded-badge">
          -{product.discount}%
        </div>
      )}

      {/* New badge */}
      {product.isNew && !product.discount && (
        <div className="absolute top-2 left-2 z-10 bg-info text-primary-foreground text-xs font-body font-bold px-2 py-0.5 rounded-badge">
          NEW
        </div>
      )}

      {/* Wishlist */}
      <button className="absolute top-2 right-2 z-10 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image - clickable link to PDP */}
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-body text-muted-foreground mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-body font-medium text-foreground line-clamp-2 leading-tight mb-2 min-h-[2.5rem] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-warning fill-warning" : "text-border"}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-body text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-base font-body font-bold text-foreground">
            KSh {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs font-body text-muted-foreground line-through">
              KSh {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock + WhatsApp */}
        <div className="flex items-center justify-between">
          <StockBadge stock={product.stock} />
          <a
            href={`https://wa.me/254719769263?text=Hi, I'd like to order: ${encodeURIComponent(product.name)} (KSh ${product.price})`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-body font-medium text-primary hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Order
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
