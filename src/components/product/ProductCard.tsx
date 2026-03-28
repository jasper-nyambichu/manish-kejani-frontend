// src/components/product/ProductCard.tsx
import { Heart, Star, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/product.types';
import { useWishlistStore } from '@/store/wishlistStore';

interface ProductCardProps {
  product: Product;
}

const stockStyles: Record<string, string> = {
  in_stock:     'bg-success/10 text-success',
  low_stock:    'bg-warning/10 text-warning',
  out_of_stock: 'bg-destructive/10 text-destructive',
  coming_soon:  'bg-info/10 text-info',
};

const stockLabels: Record<string, string> = {
  in_stock:     'In Stock',
  low_stock:    'Low Stock',
  out_of_stock: 'Out of Stock',
  coming_soon:  'Coming Soon',
};

const ProductCard = ({ product }: ProductCardProps) => {
  const toggleItem   = useWishlistStore(s => s.toggleItem);
  const isInWishlist = useWishlistStore(s => s.isInWishlist);

  const productId = product.id ?? product._id;
  const imageUrl  = product.images?.[0]?.url ?? (product as any).image ?? '';
  const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
  const status       = product.status ?? (product as any).stock ?? 'in_stock';
  const discount     = product.discountPercent ?? (product as any).discount;
  const isNewArrival = product.isNewArrival ?? (product as any).isNew;
  const inWishlist   = isInWishlist(productId);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem({
      id:            productId,
      name:          product.name,
      price:         product.price,
      originalPrice: product.originalPrice,
      image:         imageUrl,
      category:      categoryName as string,
      rating:        product.rating,
      reviews:       product.reviews,
      stock:         status,
      discount:      discount,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-card rounded-card border border-border overflow-hidden group relative"
    >
      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground text-xs font-body font-bold px-2 py-0.5 rounded-badge">
          -{discount}%
        </div>
      )}

      {/* New badge */}
      {isNewArrival && !discount && (
        <div className="absolute top-2 left-2 z-10 bg-info text-primary-foreground text-xs font-body font-bold px-2 py-0.5 rounded-badge">
          NEW
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={handleWishlist}
        className={`absolute top-2 right-2 z-10 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors ${
          inWishlist ? 'text-primary' : 'text-muted-foreground hover:text-primary'
        }`}
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className={`w-4 h-4 ${inWishlist ? 'fill-primary' : ''}`} />
      </button>

      {/* Image */}
      <Link to={`/product/${productId}`}>
        <div className="aspect-square overflow-hidden bg-secondary">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs font-body">
              No image
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-body text-muted-foreground mb-1">{categoryName}</p>

        <Link to={`/product/${productId}`}>
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
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-warning fill-warning' : 'text-border'}`}
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
          <span className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-badge ${stockStyles[status] ?? 'bg-secondary text-muted-foreground'}`}>
            {stockLabels[status] ?? status}
          </span>
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
