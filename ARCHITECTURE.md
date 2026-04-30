# Frontend Architecture Skeleton

## Project Overview

This document describes the complete frontend architecture for the `manish-kejani-frontend` e-commerce application. The project is built with modern best practices, focusing on scalability, maintainability, and performance.

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.x |
| Language | TypeScript | 5.x |
| Build Tool | Vite | 6.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | Radix UI | Latest |
| State Management | Zustand | 5.x |
| Data Fetching | TanStack React Query | 5.x |
| Routing | React Router DOM | 7.x |
| HTTP Client | Axios | 1.x |
| Animations | Framer Motion | 12.x |
| Icons | Lucide React | Latest |
| Toasts | Sonner | Latest |

---

## Directory Structure

```
manish-kejani-frontend/
├── public/                      # Static assets
│   └── assets/                  # Images, fonts, etc.
│
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── App.tsx                  # Root app shell with routing
│   ├── index.css                # Global styles & Tailwind
│   ├── App.css                  # App-specific styles
│   │
│   ├── components/              # Reusable UI components
│   │   ├── layout/              # Layout components
│   │   │   ├── Navbar.tsx       # Main navigation header
│   │   │   ├── Footer.tsx       # Site footer
│   │   │   └── AdminLayout.tsx  # Admin dashboard layout
│   │   │
│   │   ├── sections/            # Page sections
│   │   │   ├── HeroBanner.tsx   # Homepage hero
│   │   │   ├── FlashDeals.tsx   # Flash sale section
│   │   │   ├── BestSellers.tsx  # Best selling products
│   │   │   ├── NewArrivals.tsx  # New products section
│   │   │   ├── CategoryStrip.tsx # Category navigation
│   │   │   ├── PromoBanner.tsx  # Promotional banners
│   │   │   ├── RecentlyViewed.tsx # User history
│   │   │   └── StatCounters.tsx # Statistics display
│   │   │
│   │   ├── product/             # Product-related components
│   │   │   ├── ProductCard.tsx  # Product display card
│   │   │   ├── ReviewForm.tsx   # Product review form
│   │   │   └── ReviewList.tsx   # Product reviews
│   │   │
│   │   ├── common/              # Shared components
│   │   │   ├── CountdownTimer.tsx    # Sale countdown
│   │   │   ├── DiscountBadge.tsx     # Discount label
│   │   │   ├── ImageLightbox.tsx     # Image gallery
│   │   │   ├── LoadingSpinner.tsx    # Loading state
│   │   │   ├── RatingStars.tsx       # Star ratings
│   │   │   ├── ScrollToTop.tsx       # Scroll helper
│   │   │   ├── SearchSuggestions.tsx # Search autocomplete
│   │   │   ├── StaticPageLayout.tsx  # CMS pages
│   │   │   ├── StockBadge.tsx        # Stock status
│   │   │   ├── TrustBadges.tsx       # Trust indicators
│   │   │   └── WhatsAppButton.tsx    # Contact button
│   │   │
│   │   └── ui/                  # Base UI components (Radix)
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── select.tsx
│   │       ├── tabs.tsx
│   │       ├── toast.tsx
│   │       ├── tooltip.tsx
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── label.tsx
│   │       ├── separator.tsx
│   │       ├── sonner.tsx
│   │       ├── toaster.tsx
│   │       └── ...
│   │
│   ├── constants/               # App constants
│   │   ├── categories.ts        # Category definitions
│   │   └── routes.ts            # Route paths
│   │
│   ├── contexts/                # React contexts
│   │   └── AuthProvider.tsx     # Auth context
│   │
│   ├── data/                    # Static data
│   │   └── products.ts          # Sample products
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx       # Mobile detection
│   │   ├── use-toast.ts         # Toast notifications
│   │   ├── useAuth.ts           # Authentication
│   │   ├── useCart.ts           # Cart operations
│   │   ├── useCategories.ts     # Categories data
│   │   ├── useProduct.ts        # Product operations
│   │   ├── usePromotions.ts    # Promotions data
│   │   ├── useRecentlyViewed.ts # History tracking
│   │   ├── useReviews.ts        # Product reviews
│   │   ├── useSearchHistory.ts  # Search history
│   │   ├── useWhatsApp.ts       # WhatsApp integration
│   │   ├── useWishlist.ts       # Wishlist management
│   │   ├── useAdminProducts.ts  # Admin product CRUD
│   │   └── useAdminPromotions.ts # Admin promotions
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── api.ts               # Public API client
│   │   ├── adminApi.ts          # Admin API client
│   │   └── utils.ts             # Helper functions
│   │
│   ├── pages/                   # Route pages
│   │   ├── public/              # Customer-facing pages
│   │   │   ├── AboutUs.tsx
│   │   │   ├── BestSellersPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CategoryPage.tsx
│   │   │   └── ...
│   │   │
│   │   └── admin/               # Admin dashboard pages
│   │       ├── Dashboard.tsx
│   │       ├── Products.tsx
│   │       ├── AddProduct.tsx
│   │       ├── EditProduct.tsx
│   │       ├── Categories.tsx
│   │       ├── Customers.tsx
│   │       ├── Promotions.tsx
│   │       └── AdminLogin.tsx
│   │
│   ├── store/                   # Zustand stores
│   │   ├── authStore.ts         # Authentication state
│   │   ├── cartStore.ts         # Shopping cart
│   │   └── wishlistStore.ts    # User wishlist
│   │
│   ├── types/                   # TypeScript definitions
│   │   ├── product.types.ts
│   │   ├── category.types.ts
│   │   ├── promotion.types.ts
│   │   └── user.types.ts
│   │
│   └── auth/                    # Authentication
│       ├── authStorage.ts      # Token storage
│       └── types.ts             # Auth types
│
├── test/                        # Test files
│   ├── example.test.ts
│   └── setup.ts
│
├── package.json                 # Dependencies
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript config
├── tsconfig.app.json            # App TS config
├── tsconfig.node.json           # Node TS config
├── eslint.config.js             # ESLint config
├── vercel.json                  # Vercel deployment
├── index.html                   # HTML entry
└── README.md                    # Project readme
```

---

## Component Architecture

### Layer 1: Base UI Components (`src/components/ui/`)

Low-level components built on Radix UI primitives. These are unstyled, accessible building blocks.

```typescript
// Example: Button component
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("...", {
  variants: {
    variant: { default: "...", destructive: "...", outline: "..." },
    size: { default: "...", sm: "...", lg: "...", icon: "..." },
  },
});
```

### Layer 2: Common Components (`src/components/common/`)

Pre-styled, reusable components that combine UI primitives with business logic.

### Layer 3: Feature Components (`src/components/product/`, `src/components/sections/`)

Domain-specific components that implement business logic and compose lower layers.

### Layer 4: Page Components (`src/pages/`)

Full pages that compose feature components into complete views.

---

## State Management

### Global State (Zustand)

```typescript
// store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find(item => item.id === product.id);
        if (existing) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, { id: product.id, product, quantity }] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter(item => item.id !== id) }),
      updateQuantity: (id, quantity) => set({
        items: get().items.map(item =>
          item.id === id ? { ...item, quantity } : item
        ),
      }),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
);
```

### Server State (React Query)

```typescript
// hooks/useProduct.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

---

## API Layer

### Public API Client (`src/lib/api.ts`)

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const productApi = {
  getAll: (params?: ProductParams) => api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  getByCategory: (categoryId: string) => api.get(`/products?category=${categoryId}`),
  search: (query: string) => api.get(`/products/search?q=${query}`),
};

export const cartApi = {
  getCart: () => api.get('/cart'),
  addToCart: (data: AddToCartDto) => api.post('/cart', data),
  updateCart: (id: string, data: UpdateCartDto) => api.put(`/cart/${id}`, data),
  removeFromCart: (id: string) => api.delete(`/cart/${id}`),
};

export default api;
```

### Admin API Client (`src/lib/adminApi.ts`)

```typescript
import axios from 'axios';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_URL || '/admin/api',
  headers: { 'Content-Type': 'application/json' },
});

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const adminProductApi = {
  getAll: (params?: AdminProductParams) => api.get('/products', { params }),
  create: (data: CreateProductDto) => api.post('/products', data),
  update: (id: string, data: UpdateProductDto) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
  toggleStatus: (id: string) => api.patch(`/products/${id}/toggle`),
};

export const adminCategoryApi = {
  getAll: () => api.get('/categories'),
  create: (data: CreateCategoryDto) => api.post('/categories', data),
  update: (id: string, data: UpdateCategoryDto) => api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

export default adminApi;
```

---

## Routing Structure

### Public Routes (`src/App.tsx`)

```typescript
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:slug" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}
```

### Admin Routes (`src/pages/admin/AdminLayout.tsx`)

```typescript
function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

// Admin Routes
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="products" element={<Products />} />
  <Route path="products/add" element={<AddProduct />} />
  <Route path="products/:id/edit" element={<EditProduct />} />
  <Route path="categories" element={<Categories />} />
  <Route path="orders" element={<Orders />} />
  <Route path="customers" element={<Customers />} />
  <Route path="promotions" element={<Promotions />} />
</Route>
```

---

## Authentication Flow

### Auth Context (`src/contexts/AuthProvider.tsx`)

```typescript
interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  logout: () => void;
  register: (data: RegisterDto) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: LoginDto) => {
    const response = await api.post('/auth/login', credentials);
    setAuthToken(response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isAdmin: user?.role === 'admin', login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Protected Routes

```typescript
function ProtectedRoute({ children, adminOnly = false }: Props) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
```

---

## Cart & Wishlist Management

### Cart Store

```typescript
// Features:
// - Add/remove items
// - Update quantities
// - Calculate totals
// - Persist to localStorage
// - Sync with backend (optional)
```

### Wishlist Store

```typescript
// Features:
// - Add/remove products
// - Persist to localStorage
// - Move to cart functionality
```

---

## Admin Dashboard Features

### Product Management

- List all products with pagination & filters
- Add new product with images
- Edit existing product
- Delete product (soft delete)
- Toggle active status
- Bulk actions

### Category Management

- CRUD operations
- Reorder categories
- Set featured categories

### Order Management

- View all orders
- Update order status
- Filter by status/date

### Customer Management

- View customer list
- View customer details
- Manage customer accounts

### Promotions

- Create promotions (coupons, flash sales)
- Set schedules
- Track usage

---

## Performance Optimization

### Code Splitting

```typescript
const ProductDetail = lazy(() => import('@/pages/public/ProductDetail'));
const CartPage = lazy(() => import('@/pages/public/CartPage'));
```

### Image Optimization

- Use `srcset` for responsive images
- Implement lazy loading
- Use WebP format with fallbacks

### Data Caching

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Bundle Optimization

- Analyze bundle size with `vite-bundle-visualizer`
- Tree-shake unused code
- Use dynamic imports

---

## Accessibility (a11y)

### Best Practices

- Use semantic HTML
- Implement proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios (WCAG 2.1 AA)
- Add focus indicators
- Support screen readers

### Radix UI Components

All Radix UI components are accessible by default:
- Proper focus management
- ARIA attributes
- Keyboard navigation
- Screen reader support

---

## Testing Strategy

### Unit Tests

```typescript
// test/example.test.ts
import { describe, it, expect } from 'vitest';

describe('Cart Store', () => {
  it('should add item to cart', () => {
    const store = useCartStore.getState();
    store.addItem(mockProduct);
    expect(store.items).toHaveLength(1);
  });
});
```

### Component Tests

- Test user interactions
- Test edge cases
- Test error states

---

## Environment Variables

```env
# .env
VITE_API_URL=http://localhost:3000
VITE_ADMIN_API_URL=http://localhost:3000/admin
VITE_IMAGE_CDN_URL=https://cdn.example.com
```

---

## Build & Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Best Practices

### Code Organization

1. **Colocation**: Keep related files together
2. **Barrel files**: Use `index.ts` for clean imports
3. **Single responsibility**: One component per file

### Naming Conventions

- Components: `PascalCase` (e.g., `ProductCard.tsx`)
- Hooks: `camelCase` with `use` prefix (e.g., `useCart.ts`)
- Utils: `camelCase` (e.g., `formatCurrency.ts`)
- Types: `PascalCase` (e.g., `ProductType.ts`)

### TypeScript Guidelines

- Use explicit types over `any`
- Enable strict mode
- Use interfaces for object shapes
- Use type aliases for unions

### Git Conventions

- Use feature branches
- Write descriptive commit messages
- Review code before merging

---

## Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com)
- [Zustand](https://docs.pmnd.rs/zustand)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com)

---

## License

This project is proprietary and confidential.
