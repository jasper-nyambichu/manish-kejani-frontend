// src/pages/public/ProductDetail.tsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProduct, useRelatedProducts } from '@/hooks/useProduct';
import { useAuth } from '@/hooks/useAuth';
import { useCartStore } from '@/store/cartStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ImageLightbox from '@/components/common/ImageLightbox';
import { Star, ShoppingCart, Share2, ChevronRight, Truck, ShieldCheck, RotateCcw, MessageCircle, Minus, Plus, Check, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const stockLabels: Record<string, string> = {
  in_stock:     '✓ In Stock',
  low_stock:    '⚡ Few Left – Order Now',
  out_of_stock: '✗ Out of Stock',
  coming_soon:  '🕐 Coming Soon',
};

const stockColors: Record<string, string> = {
  in_stock:     'text-success',
  low_stock:    'text-warning',
  out_of_stock: 'text-destructive',
  coming_soon:  'text-info',
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const addItem  = useCartStore(s => s.addItem);
  const isInCart = useCartStore(s => s.isInCart);
  const { data: product, isLoading, isError } = useProduct(id!);
  const { data: relatedProducts = [] } = useRelatedProducts(id!, 6);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen,   setLightboxOpen]  = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

if (isLoading) return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <LoadingSpinner className="py-32" />
      <Footer />
    </div>
  );

  if (isError || !product) return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-foreground mb-4">Product Not Found</h1>
        <Link to="/" className="text-primary hover:underline font-body">← Back to Home</Link>
      </div>
      <Footer />
    </div>
  );

  const images      = product.images?.length > 0 ? product.images.map((img: { url: string }) => img.url) : [];
  const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
  const categorySlug = typeof product.category === 'object' ? product.category.slug : (product.category as string)?.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  const status       = product.status ?? 'in_stock';
  const discount     = product.discountPercent ?? 0;
  const productId    = product.id ?? product._id;
  const imageUrl     = product.images?.[0]?.url ?? '';
  const inCart       = isInCart(productId);

  const handleAddToCart = () => {
    addItem({
      id:            productId,
      name:          product.name,
      price:         product.price,
      originalPrice: product.originalPrice,
      image:         imageUrl,
      category:      typeof product.category === 'object' ? product.category.name : product.category as string,
      rating:        product.rating,
      reviews:       product.reviews,
      stock:         status,
      discount:      discount,
    });
    toast.success(`${product.name} added to cart`);
  };

  const waNumber   = import.meta.env.VITE_WHATSAPP_NUMBER ?? '254719769263';
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hi, I'd like to order:\n\n*${product.name}*\nQuantity: ${quantity}\nPrice: KSh ${(product.price * quantity).toLocaleString()}\n\nPlease confirm availability.`
  )}`;

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/category/${categorySlug}`} className="hover:text-primary transition-colors">{categoryName}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>

        {/* Product main */}
        <div className="container mx-auto px-4 pb-8">
          <div className="bg-card rounded-card border border-border overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">

              {/* Image gallery */}
              <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r border-border">
                <div
                  className="aspect-square rounded-lg overflow-hidden bg-secondary mb-3 relative cursor-zoom-in group"
                  onClick={() => images.length > 0 && setLightboxOpen(true)}
                >
                  {images.length > 0 ? (
                    <>
                      <motion.img key={selectedImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-body">No image</div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 flex-wrap">
                    {images.map((img, i) => (
                      <button key={i} onClick={() => setSelectedImage(i)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-primary' : 'border-border'}`}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-border">
                <h1 className="font-display text-xl md:text-2xl text-foreground leading-tight mb-2">{product.name}</h1>
                <p className="text-xs text-muted-foreground mb-3">
                  Category: <Link to={`/category/${categorySlug}`} className="text-primary hover:underline">{categoryName}</Link>
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-warning fill-warning' : 'text-border'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="bg-secondary rounded-lg p-4 mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-primary">KSh {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">KSh {product.originalPrice.toLocaleString()}</span>
                    )}
                    {discount > 0 && (
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-badge">-{discount}%</span>
                    )}
                  </div>
                </div>

                {/* Stock */}
                <div className="mb-4">
                  <span className={`text-sm font-medium ${stockColors[status] ?? 'text-foreground'}`}>
                    {stockLabels[status] ?? status}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-foreground">Qty:</span>
                  <div className="flex items-center border border-border rounded-button">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast.error('Please sign in to place an order');
                        navigate('/login');
                        return;
                      }
                      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity">
                    <MessageCircle className="w-5 h-5" />
                    {isAuthenticated ? 'Order via WhatsApp' : 'Sign in to Order'}
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className={`w-12 h-12 border rounded-button flex items-center justify-center transition-colors ${
                      inCart
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:text-primary hover:border-primary'
                    }`}
                    title={inCart ? 'Added to cart' : 'Add to cart'}
                  >
                    {inCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  </button>
                  <button className="w-12 h-12 border border-border rounded-button flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Delivery sidebar */}
              <div className="p-4 md:p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Delivery & Returns</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Delivery within Kisii</p>
                      <p className="text-xs text-muted-foreground">Same-day delivery for orders before 2pm</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Quality Guarantee</p>
                      <p className="text-xs text-muted-foreground">All products are quality checked</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RotateCcw className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Easy Returns</p>
                      <p className="text-xs text-muted-foreground">7-day return for defective items</p>
                    </div>
                  </div>
                </div>
                <hr className="my-4 border-border" />
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Seller Info</h3>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground">Manish Kejani</p>
                  <p className="text-xs text-muted-foreground">Market Plaza Room 214, Kisii</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-warning fill-warning" />
                    <span className="text-xs text-muted-foreground">4.8 seller rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4 pb-8">
          <div className="bg-card rounded-card border border-border overflow-hidden">
            <div className="flex border-b border-border">
              {(['description', 'specs', 'reviews'] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-medium text-center capitalize transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                  {tab === 'reviews' ? `Reviews (${product.reviews})` : tab}
                </button>
              ))}
            </div>
            <div className="p-4 md:p-6">
              {activeTab === 'description' && (
                <div className="text-sm text-foreground leading-relaxed space-y-3">
                  <p>{product.description || `Premium quality ${product.name} from Manish Kejani Households & Décor.`}</p>
                  {!product.description && (
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>High quality materials</li>
                      <li>Elegant and modern design</li>
                      <li>Easy to clean and maintain</li>
                      <li>Perfect for gifting</li>
                    </ul>
                  )}
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="space-y-2">
                  {[
                    ['Category', categoryName],
                    ['Price', `KSh ${product.price.toLocaleString()}`],
                    ['Rating', `${product.rating} / 5`],
                    ['Availability', stockLabels[status] ?? status],
                    ...(product.sku ? [['SKU', product.sku]] : []),
                    ...(product.specifications ?? []).map(s => [s.label, s.value]),
                  ].map(([label, value]) => (
                    <div key={label} className="flex py-2 border-b border-border last:border-0">
                      <span className="w-1/3 text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-foreground">{product.rating}</p>
                      <div className="flex mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-warning fill-warning' : 'text-border'}`} />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{product.reviews} reviews</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">Customer reviews will appear here once orders are placed.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="container mx-auto px-4 pb-8">
            <h2 className="font-display text-xl text-foreground mb-4">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {relatedProducts.map((p: any) => (
                <ProductCard key={p._id ?? p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Image Lightbox */}
      {lightboxOpen && images.length > 0 && (
        <ImageLightbox
          images={images}
          currentIndex={selectedImage}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setSelectedImage(i => (i - 1 + images.length) % images.length)}
          onNext={() => setSelectedImage(i => (i + 1) % images.length)}
        />
      )}

      {/* Sticky mobile WhatsApp bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-card border-t border-border p-3 z-40">
        <button
          onClick={() => {
            if (!isAuthenticated) {
              toast.error('Please sign in to place an order');
              navigate('/login');
              return;
            }
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
          }}
          className="flex items-center justify-center gap-2 w-full h-12 bg-primary text-primary-foreground rounded-button font-semibold text-sm">
          <MessageCircle className="w-5 h-5" />
          {isAuthenticated
            ? `Order via WhatsApp — KSh ${(product.price * quantity).toLocaleString()}`
            : 'Sign in to Order'}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
