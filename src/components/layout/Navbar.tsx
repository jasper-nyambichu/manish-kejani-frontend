// src/components/layout/Navbar.tsx
import { useState, useRef, useEffect } from 'react';
import { User, ShoppingCart, Menu, X, Phone, MapPin, ChevronDown, HelpCircle, Star, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth';
import { useCategories } from '@/hooks/useCategories';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import SearchSuggestions from '@/components/common/SearchSuggestions';
import { useSearchHistory } from '@/hooks/useSearchHistory';

interface CategoryItem {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  icon?: React.ReactNode;
}

const Navbar = () => {
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);
  const [userMenuOpen,    setUserMenuOpen]    = useState(false);
  const [helpMenuOpen,    setHelpMenuOpen]    = useState(false);
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();
  const { data: categories = [] }         = useCategories();
  const cartCount                         = useCartStore(s => s.totalItems());
  const { save: saveHistory }             = useSearchHistory();

  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      // Only change direction if scroll delta exceeds a threshold to prevent flickering
      if (delta > 10 && currentScrollY > 80) {
        setScrollDirection('down');
      } else if (delta < -10) {
        setScrollDirection('up');
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Holds the commit fns registered by SearchSuggestions
  const desktopCommitFnRef = useRef<(() => void) | null>(null);
  const mobileCommitFnRef  = useRef<(() => void) | null>(null);

  const handleSearch = (query: string) => {
    saveHistory(query);
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <>
    <header className={`sticky top-0 z-50 transition-transform duration-300 ${scrollDirection === 'down' ? 'md:-translate-y-8' : 'translate-y-0'}`}>
      {/* Top bar */}
      <div className="bg-[#f1f1f2] md:block hidden py-1 h-8">
        <div className="container mx-auto px-4 flex items-center justify-between h-8 text-xs font-body max-w-7xl">
          <div className="flex items-center gap-1 cursor-pointer hover:underline text-[#f68b1e] font-bold">
            <Star className="w-3.5 h-3.5 fill-[#f68b1e]" />
            <span>Sell on Manish Kejani</span>
          </div>
          <div className="flex items-center gap-6 font-bold text-gray-500">
             <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> Market Plaza Room 214, Kisii</span>
             <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5"/> 0719 769 263</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-3">
        <div className="container mx-auto px-4 flex items-center gap-2 md:gap-4 max-w-7xl">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1">
            <img src={logo} alt="Manish Kejani" className="h-10 w-auto" />
            <Star className="w-6 h-6 text-white fill-[#f68b1e] hidden xl:block" />
          </Link>

          {/* Desktop search */}
          <div className="flex-1 hidden md:flex items-center gap-2 mx-4 lg:mx-8">
            <div className="flex-1 relative h-10 border border-gray-400 rounded focus-within:border-primary transition-colors bg-white">
              <SearchSuggestions
                categoryId=""
                onSearch={handleSearch}
                registerCommit={fn => { desktopCommitFnRef.current = fn; }}
              />
            </div>
            <button
              type="button"
              onClick={() => desktopCommitFnRef.current?.()}
              className="h-10 px-6 bg-[#f68b1e] text-white font-bold rounded shadow-sm hover:bg-[#e07b1a] transition-colors uppercase text-sm"
              aria-label="Search"
            >
              Search
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-7 ml-auto text-gray-700">
            
            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative hidden md:flex items-center cursor-pointer hover:text-primary transition-colors" onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
                <div className="flex items-center gap-1.5 h-full py-2">
                  <User className="w-6 h-6" />
                  <span className="font-bold text-sm hidden lg:block max-w-[100px] truncate">Hi, {user?.username}</span>
                  <ChevronDown className="w-4 h-4 hidden lg:block" />
                </div>
                {userMenuOpen && (
                  <div className="absolute right-0 top-[100%] mt-0 pt-2 w-48 z-50">
                    <div className="bg-white border border-gray-200 rounded shadow-lg overflow-hidden flex flex-col">
                      <Link to="/profile" onClick={() => setUserMenuOpen(false)}
                        className="px-4 py-3 text-sm font-body text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                        My Account
                      </Link>
                      <button onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm font-body text-[#f68b1e] hover:bg-gray-50 transition-colors font-medium border-t border-gray-100">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative hidden md:flex items-center cursor-pointer hover:text-primary transition-colors" onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
                <div className="flex items-center gap-1.5 h-full py-2">
                  <User className="w-6 h-6" />
                  <span className="font-bold text-sm hidden lg:block">Account</span>
                  <ChevronDown className="w-4 h-4 hidden lg:block" />
                </div>
                {userMenuOpen && (
                  <div className="absolute right-0 top-[100%] mt-0 pt-2 w-48 z-50">
                    <div className="bg-white border border-gray-200 rounded shadow-lg p-3">
                      <Link to="/login" onClick={() => setUserMenuOpen(false)}
                        className="block w-full py-2.5 bg-[#f68b1e] text-white text-center rounded font-bold hover:bg-[#e07b1a] transition-colors shadow-sm text-sm">
                        Sign In
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Help Menu */}
            <div className="relative hidden lg:flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors h-full py-2" onMouseEnter={() => setHelpMenuOpen(true)} onMouseLeave={() => setHelpMenuOpen(false)}>
              <HelpCircle className="w-6 h-6" />
              <span className="font-bold text-sm">Help</span>
              <ChevronDown className="w-4 h-4" />
              {helpMenuOpen && (
                <div className="absolute right-0 top-[100%] mt-0 pt-2 w-48 z-50">
                  <div className="bg-white border border-gray-200 rounded shadow-lg overflow-hidden flex flex-col">
                    <a href="https://wa.me/254719769263" target="_blank" rel="noopener noreferrer"
                      className="px-4 py-3 text-sm font-body text-gray-700 hover:bg-gray-50 transition-colors font-medium text-center">
                      Order via WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist icon */}
            <Link to="/wishlist" className="hidden md:flex items-center gap-2 hover:text-primary transition-colors py-2 group">
              <Heart className="w-6 h-6 text-gray-700 group-hover:text-primary" />
              <span className="font-bold text-sm hidden lg:block text-gray-700 group-hover:text-primary">Wishlist</span>
            </Link>

            {/* Cart icon */}
            <Link to="/cart" className="flex items-center gap-2 hover:text-primary transition-colors py-2 group">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-[#f68b1e] text-white rounded-full text-[10px] flex items-center justify-center font-bold shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-bold text-sm hidden md:block text-gray-700 group-hover:text-primary">Cart</span>
            </Link>

            {/* Mobile menu toggle */}
            <button className="md:hidden text-foreground ml-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pt-3 flex w-full items-center gap-2">
          <div className="flex-1 relative h-10 border border-gray-400 rounded focus-within:border-primary transition-colors bg-white">
            <SearchSuggestions
              categoryId=""
              onSearch={handleSearch}
              registerCommit={fn => { mobileCommitFnRef.current = fn; }}
            />
          </div>
          {/* We do NOT include the Search button on mobile to save space, standard mobile Jumia behavior! */}
        </div>
      </div>

      {/* Category nav */}
      <nav className={`hidden md:block bg-white border-b border-gray-200 shadow-sm transition-all duration-300 ${scrollDirection === 'down' ? 'max-h-0 opacity-0 overflow-hidden border-transparent' : 'max-h-14 opacity-100 overflow-visible'}`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <ul className="flex items-center gap-4 overflow-x-auto py-2.5 text-sm font-body font-medium scrollbar-hide text-gray-600">
            {(categories as CategoryItem[]).map((cat: CategoryItem) => (
              <li key={cat._id ?? cat.id}>
                <Link to={`/category/${cat.slug}`}
                  className="whitespace-nowrap hover:text-[#f68b1e] transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>

    {/* Mobile Sidebar Overlay - OUTSIDE header to avoid transform issues */}
    <div 
      className={`md:hidden fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${
        mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setMobileMenuOpen(false)}
      aria-hidden="true"
    />

    {/* Mobile Sidebar Panel - OUTSIDE header to avoid transform issues */}
    <div
      className={`md:hidden fixed inset-y-0 left-0 w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <span className="font-bold text-lg font-body text-gray-800">Manish Kejani</span>
        <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 p-1 hover:text-[#f68b1e] transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="px-4 py-4 space-y-2 overflow-y-auto flex-1">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="flex items-center gap-3 py-2.5 text-sm font-body font-bold text-gray-700 hover:text-[#f68b1e] transition-colors"
              onClick={() => setMobileMenuOpen(false)}>
              <User className="w-5 h-5" /> Hi, {user?.username}
            </Link>
            <Link to="/wishlist" className="flex items-center gap-3 py-2.5 text-sm font-body font-bold text-gray-700 hover:text-[#f68b1e] transition-colors"
              onClick={() => setMobileMenuOpen(false)}>
              <Heart className="w-5 h-5" /> My Wishlist
            </Link>
            <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 py-2.5 text-sm font-body font-bold text-[#f68b1e] w-full hover:opacity-80 transition-opacity">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="flex items-center gap-3 py-2.5 text-sm font-body font-bold text-gray-700 hover:text-[#f68b1e] transition-colors"
            onClick={() => setMobileMenuOpen(false)}>
            <User className="w-5 h-5" /> Sign In
          </Link>
        )}
        <a href="https://wa.me/254719769263" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2.5 text-sm font-body font-bold text-gray-700 hover:text-[#f68b1e] transition-colors">
          <HelpCircle className="w-5 h-5" /> Order via WhatsApp
        </a>
        <hr className="border-gray-200 my-4" />
        <p className="text-xs font-body font-bold text-gray-400 uppercase tracking-wider mb-2">Our Categories</p>
        {(categories as CategoryItem[]).map((cat: CategoryItem) => (
          <Link key={cat._id ?? cat.id} to={`/category/${cat.slug}`}
            className="flex items-center gap-3 py-2.5 text-sm font-body font-medium text-gray-700 hover:text-[#f68b1e] hover:bg-gray-50 rounded transition-colors"
            onClick={() => setMobileMenuOpen(false)}>
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default Navbar;
