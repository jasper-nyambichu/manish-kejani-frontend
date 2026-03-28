// src/components/layout/Navbar.tsx
import { useState } from 'react';
import { Search, User, Heart, Menu, X, Phone, MapPin, MessageCircle, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth';
import { useCategories } from '@/hooks/useCategories';
import { useWishlistStore } from '@/store/wishlistStore';
import { toast } from 'sonner';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [userMenuOpen,   setUserMenuOpen]   = useState(false);
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();
  const { data: categories = [] }         = useCategories();
  const wishlistCount                     = useWishlistStore(s => s.items.length);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-surface text-surface-foreground">
        <div className="container mx-auto px-4 flex items-center justify-between h-8 text-xs font-body">
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Market Plaza Room 214, Kisii
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              0719 769 263
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link>
            {isAuthenticated ? (
              <Link to="/profile" className="hover:text-primary transition-colors">
                Hi, {user?.username}
              </Link>
            ) : (
              <Link to="/login" className="hover:text-primary transition-colors">My Account</Link>
            )}
            <a href="https://wa.me/254719769263" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary font-medium">
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Order
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 flex items-center gap-4 h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Manish Kejani" className="h-12 w-auto" />
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 hidden md:flex">
            <div className="relative w-full max-w-2xl">
              <input type="text" placeholder="Search kitchenware, bedding, décor..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-12 bg-secondary text-foreground rounded-button font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <button type="submit"
                className="absolute right-0 top-0 h-10 w-12 bg-primary text-primary-foreground rounded-r-button flex items-center justify-center hover:opacity-90 transition-opacity">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 text-sm font-body font-medium text-foreground hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                  <span className="max-w-[80px] truncate">{user?.username}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-card border border-border rounded-card shadow-lg z-50 overflow-hidden">
                    <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-body text-foreground hover:bg-secondary transition-colors">
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    <Link to="/wishlist" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-body text-foreground hover:bg-secondary transition-colors">
                      <Heart className="w-4 h-4" /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                    </Link>
                    <hr className="border-border" />
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-body text-destructive hover:bg-destructive/10 transition-colors">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex items-center gap-1.5 text-sm font-body font-medium text-foreground hover:text-primary transition-colors">
                <User className="w-5 h-5" />
                <span>Account</span>
              </Link>
            )}

            {/* Wishlist icon */}
            <Link to="/wishlist" className="relative hidden md:flex items-center text-foreground hover:text-primary transition-colors">
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-primary text-primary' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden px-4 pb-3">
          <div className="relative">
            <input type="text" placeholder="Search products..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-4 pr-12 bg-secondary text-foreground rounded-button font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <button type="submit"
              className="absolute right-0 top-0 h-10 w-12 bg-primary text-primary-foreground rounded-r-button flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Category nav bar */}
      <nav className="hidden md:block bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm font-body font-medium">
            {(categories as any[]).map((cat: any) => (
              <li key={cat._id ?? cat.id}>
                <Link to={`/category/${cat.slug}`}
                  className="whitespace-nowrap px-3 py-1.5 rounded-button hover:bg-secondary hover:text-primary transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="px-4 py-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 py-2 text-sm font-body font-medium text-foreground"
                  onClick={() => setMobileMenuOpen(false)}>
                  <User className="w-4 h-4" /> {user?.username}
                </Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 py-2 text-sm font-body font-medium text-destructive w-full">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 py-2 text-sm font-body font-medium text-foreground"
                onClick={() => setMobileMenuOpen(false)}>
                <User className="w-4 h-4" /> My Account
              </Link>
            )}
            <Link to="/wishlist" className="flex items-center gap-2 py-2 text-sm font-body font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}>
              <Heart className="w-4 h-4" /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <hr className="border-border" />
            <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider pt-2">Categories</p>
            {(categories as any[]).map((cat: any) => (
              <Link key={cat._id ?? cat.id} to={`/category/${cat.slug}`}
                className="block py-1.5 text-sm font-body text-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}>
                {cat.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
