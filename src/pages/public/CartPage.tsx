import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShoppingCart, ChevronRight, Trash2, MessageCircle, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

const CartPage = () => {
  const { items, removeItem, updateQty, clearCart, totalItems, totalPrice } = useCartStore();
  const { number } = useWhatsApp();
  
  const [modalItemDelete, setModalItemDelete] = useState<string | null>(null);
  const [modalClearCart, setModalClearCart] = useState(false);

  const total      = totalPrice();
  const itemsCount = totalItems();

  const handleOrderAll = () => {
    const text = items.map(i =>
      `• ${i.name} x${i.quantity} — KSh ${(i.price * i.quantity).toLocaleString()}`
    ).join('\n');
    const waNumber = number || import.meta.env.VITE_WHATSAPP_NUMBER;
    if (!waNumber) return;
    const message = `Hi Manish Kejani 👋\n\nI'd like to order the following:\n\n${text}\n\n*Total: KSh ${total.toLocaleString()}*\n\nPlease confirm availability and delivery. Thank you!`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Cart</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 pb-8">
          {items.length === 0 ? (
            <div className="bg-card rounded-card border border-border p-16 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="font-display text-2xl text-foreground mb-2">Your Cart is Empty</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Click the 🛒 on any product to add it to your cart.
              </p>
              <Link to="/"
                className="inline-block px-6 py-2.5 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">

              {/* Cart items */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h1 className="font-display text-xl text-foreground">
                    My Cart <span className="text-muted-foreground text-base font-body">({itemsCount} items)</span>
                  </h1>
                  <button onClick={() => setModalClearCart(true)}
                    className="text-xs font-body text-destructive hover:underline flex items-center gap-1">
                    <Trash2 className="w-3 h-3" /> Clear cart
                  </button>
                </div>

                {items.map((item) => (
                  <div key={item.id} className="bg-card rounded-card border border-border p-4 flex gap-4">
                    {/* Image */}
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-button overflow-hidden bg-secondary">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            No image
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-body text-muted-foreground">{item.category}</p>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-sm font-body font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mb-1">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-sm font-body font-bold text-primary">
                          KSh {item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs font-body text-muted-foreground line-through">
                            KSh {item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Qty controls + remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border rounded-button overflow-hidden">
                          <button onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-body font-medium">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-body font-bold text-foreground">
                            KSh {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button onClick={() => setModalItemDelete(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-card rounded-card border border-border p-5 sticky top-24">
                  <h2 className="font-display text-lg text-foreground mb-4">Order Summary</h2>

                  <div className="space-y-2 mb-4">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm font-body">
                        <span className="text-muted-foreground truncate max-w-[160px]">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="text-foreground font-medium flex-shrink-0">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <hr className="border-border mb-4" />

                  <div className="flex justify-between font-body font-bold text-foreground mb-5">
                    <span>Total</span>
                    <span className="text-primary text-lg">KSh {total.toLocaleString()}</span>
                  </div>

                  <button onClick={handleOrderAll}
                    className="w-full h-12 bg-primary text-primary-foreground rounded-button font-body font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <MessageCircle className="w-5 h-5" />
                    Order via WhatsApp
                  </button>

                  <Link to="/"
                    className="w-full h-10 mt-3 border border-border text-foreground rounded-button font-body text-sm flex items-center justify-center gap-2 hover:bg-secondary transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                    Continue Shopping
                  </Link>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
      <Footer />
      
      <ConfirmationModal
        isOpen={modalItemDelete !== null}
        title="Are You Sure\nWant To Delete?"
        message="This item will be removed from your cart. You can always add it back later if needed."
        onConfirm={() => {
          if (modalItemDelete) removeItem(modalItemDelete);
          setModalItemDelete(null);
        }}
        onCancel={() => setModalItemDelete(null)}
      />

      <ConfirmationModal
        isOpen={modalClearCart}
        title="Clear Entire Cart?"
        message="Are you sure you want to remove all items from your cart? This action cannot be undone."
        onConfirm={() => {
          clearCart();
          setModalClearCart(false);
        }}
        onCancel={() => setModalClearCart(false)}
      />
    </div>
  );
};

export default CartPage;
