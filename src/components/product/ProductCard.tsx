// src/components/product/ProductCard.tsx
import { Star, MessageCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/product.types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { toast } from 'sonner';

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
  const addItem           = useCartStore(s => s.addItem);
  const isInCart          = useCartStore(s => s.isInCart);

  const toggleWishlist  = useWishlistStore(s => s.toggleItem);
  const isInWishlist    = useWishlistStore(s => s.isInWishlist);

  const productId    = product.id ?? product._id;
  const imageUrl     = product.images?.[0]?.url ?? (product as any).image ?? '';
  const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
  const status       = product.status ?? (product as any).stock ?? 'in_stock';
  const discount     = product.discountPercent ?? (product as any).discount;
  const isNewArrival = product.isNewArrival ?? (product as any).isNew;
  const inCart       = isInCart(productId);
  const inWishlist   = isInWishlist(productId);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({
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
    
    if (inWishlist) {
      toast.success('Removed from wishlist');
    } else {
      toast.custom(() => (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          className="bg-white dark:bg-card shadow-2xl rounded-2xl p-5 flex flex-col items-center justify-center gap-3 border border-gray-100 min-w-[250px]"
        >
          <div className="w-12 h-12 rounded-full bg-[#f68b1e]/10 flex items-center justify-center">
             <Heart className="w-6 h-6 fill-[#f68b1e] text-[#f68b1e]" />
          </div>
          <div className="text-center">
             <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1 text-sm">Added to Wishlist!</h3>
             <p className="text-xs text-gray-500 line-clamp-1">{product.name}</p>
          </div>
        </motion.div>
      ), { duration: 3000, position: 'top-center' });
    }
  };

  const waNumber   = import.meta.env.VITE_WHATSAPP_NUMBER ?? '254719769263';
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hi, I'd like to order: ${product.name} (KSh ${product.price})`
  )}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
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
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      className="bg-[#fff] dark:bg-card rounded-[4px] border-none overflow-hidden group relative hover:shadow-[0_4px_20px_0_rgba(0,0,0,0.2)] hover:z-10 transition-shadow duration-300 flex flex-col h-full"
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

      {/* Wishlist heart — always visible top-right */}
      <button
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center hover:scale-110 transition-transform"
        title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
      >
        <Heart className={`w-3.5 h-3.5 transition-colors ${inWishlist ? 'fill-primary text-primary' : 'text-gray-400'}`} />
      </button>

      {/* Image */}
      <Link to={`/product/${productId}`}>
        <div className="aspect-square overflow-hidden bg-white dark:bg-secondary/10 p-2">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply dark:mix-blend-normal"
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
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs font-body text-muted-foreground mb-1">{categoryName}</p>

        <Link to={`/product/${productId}`}>
          <h3 className="text-sm font-body font-medium text-foreground line-clamp-2 leading-tight mb-2 min-h-[2.5rem] hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Spacer - pushes everything below to the bottom */}
        <div className="flex-1" />

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

        {/* Stock + Order */}
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-badge ${stockStyles[status] ?? 'bg-secondary text-muted-foreground'}`}>
            {stockLabels[status] ?? status}
          </span>
          <button
            onClick={() => {
              window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            }}
            className="flex items-center gap-1 text-xs font-body font-medium text-primary hover:scale-105 hover:underline transition-all duration-300 relative z-[21]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Order
          </button>
        </div>
      </div>

      {/* Jumia Hover Overlay Add to Cart */}
      <div className="absolute overflow-hidden bottom-0 left-0 w-full p-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-white dark:bg-card shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#f68b1e] hover:brightness-110 text-white font-bold text-[13px] uppercase py-2.5 rounded-[4px] shadow-sm transition-all"
        >
          {inCart ? 'ADDED TO CART' : 'ADD TO CART'}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
