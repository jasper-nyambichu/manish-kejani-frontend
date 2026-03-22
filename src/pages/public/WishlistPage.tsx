import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Heart, ChevronRight } from "lucide-react";

const WishlistPage = () => {
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
          <div className="bg-card rounded-card border border-border p-16 text-center">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-display text-2xl text-foreground mb-2">Your Wishlist is Empty</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Save your favourite items here. Create an account to sync your wishlist across devices.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                to="/"
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-button font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </Link>
              <Link
                to="/login"
                className="px-6 py-2.5 border border-border text-foreground rounded-button font-semibold text-sm hover:bg-secondary transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
