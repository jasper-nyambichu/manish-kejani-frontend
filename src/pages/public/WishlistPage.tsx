// src/pages/public/WishlistPage.tsx
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Heart, ChevronRight, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, removeItem, clearWishlist } = useWishlistStore();

  const handleOrder = (e: React.MouseEvent, name: string, price: number) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast.error('Please sign in to place an order');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Wishlist</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 pb-8">
          {items.length === 0 ? (
            <div className="bg-card rounded-card border border-border p-16 text-center">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="font-display text-2xl text-foreground mb-2">Your Wishlist is Empty</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Click the ❤️ on any product to save it here.
              </p>
              <Link to="/"
                className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity">
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-display text-xl text-foreground">
                  My Wishlist <span className="text-muted-foreground text-base font-body">({items.length} items)</span>
                </h1>
                <button onClick={clearWishlist}
                  className="text-xs font-body text-destructive hover:underline flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Clear all
                </button>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-card rounded-card border border-border overflow-hidden group">
                    <div className="relative">
                      <Link to={`/product/${item.id}`}>
                        <div className="aspect-square overflow-hidden bg-secondary">
                          {item.image ? (
                            <img src={item.image} alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                              No image
                            </div>
                          )}
                        </div>
                      </Link>
                      <button onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-destructive/10 hover:text-destructive transition-colors"
                        title="Remove from wishlist">
                        <Heart className="w-4 h-4 fill-primary" />
                      </button>
                    </div>

                    <div className="p-3">
                      <p className="text-xs font-body text-muted-foreground mb-1">{item.category}</p>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-sm font-body font-medium text-foreground line-clamp-2 leading-tight mb-2 hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-base font-body font-bold text-foreground">
                          KSh {item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs font-body text-muted-foreground line-through">
                            KSh {item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <a href={`https://wa.me/254719769263?text=Hi, I'd like to order: ${encodeURIComponent(item.name)} (KSh ${item.price})`}
                          target="_blank" rel="noopener noreferrer"
                          onClick={e => handleOrder(e, item.name, item.price)}
                          className="flex-1 flex items-center justify-center gap-1.5 h-9 bg-primary text-primary-foreground rounded-button font-body text-xs font-semibold hover:opacity-90 transition-opacity">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {isAuthenticated ? 'Order' : 'Sign in'}
                        </a>
                        <Link to={`/product/${item.id}`}
                          className="flex items-center justify-center gap-1.5 h-9 px-3 border border-border text-foreground rounded-button font-body text-xs hover:bg-secondary transition-colors">
                          <ShoppingBag className="w-3.5 h-3.5" />
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
