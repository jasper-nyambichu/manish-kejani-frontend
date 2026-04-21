// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthProvider";
import { useAdminAuth } from "@/store/authStore";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

// Public pages
import Index from "./pages/public/Index";
import ProductDetail from "./pages/public/ProductDetail";
import CategoryPage from "./pages/public/CategoryPage";
import SearchPage from "./pages/public/SearchPage";
import CartPage from "./pages/public/CartPage";
import LoginPage from "./pages/public/LoginPage";
import VerifyEmailPage from "./pages/public/VerifyEmailPage";
import GoogleAuthSuccess from "./pages/public/GoogleAuthSuccess";
import ProfilePage from "./pages/public/ProfilePage";
import WishlistPage from "./pages/public/WishlistPage";
import NotFound from "./pages/public/NotFound";

// Static / policy pages
import HelpCenter from "./pages/public/HelpCenter";
import ContactUs from "./pages/public/ContactUs";
import HowToBuy from "./pages/public/HowToBuy";
import ShippingDelivery from "./pages/public/ShippingDelivery";
import ReturnPolicy from "./pages/public/ReturnPolicy";
import DisputeResolution from "./pages/public/DisputeResolution";
import AboutUs from "./pages/public/AboutUs";
import TermsConditions from "./pages/public/TermsConditions";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import CookiePolicy from "./pages/public/CookiePolicy";
import FlashSalesPage from "./pages/public/FlashSalesPage";
import BestSellersPage from "./pages/public/BestSellersPage";
import NewArrivalsPage from "./pages/public/NewArrivalsPage";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Categories from "./pages/admin/Categories";
import Promotions from "./pages/admin/Promotions";
import Customers from "./pages/admin/Customers";

const queryClient = new QueryClient();

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Sonner richColors position="top-right" />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/auth/google/success" element={<GoogleAuthSuccess />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* Static / policy pages */}
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/shipping" element={<ShippingDelivery />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/dispute" element={<DisputeResolution />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookie" element={<CookiePolicy />} />
          <Route path="/flash-sales" element={<FlashSalesPage />} />
          <Route path="/best-sellers" element={<BestSellersPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="customers" element={<Customers />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingWhatsApp />
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
