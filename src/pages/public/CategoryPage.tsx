// src/pages/public/CategoryPage.tsx
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useProductsByCategory } from '@/hooks/useProduct';
import { useCategories } from '@/hooks/useCategories';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy]           = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice]       = useState('');
  const [maxPrice, setMaxPrice]       = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [page, setPage]               = useState(1);

  const { data: categories = [] } = useCategories();

  const filters: Record<string, any> = { page, limit: 20, sort: sortBy };
  if (minPrice) filters.minPrice = minPrice;
  if (maxPrice) filters.maxPrice = maxPrice;
  if (stockFilter !== 'all') filters.status = stockFilter;

  const { data, isLoading, isError } = useProductsByCategory(slug!, filters);
  const products   = data?.products   ?? [];
  const pagination = data?.pagination ?? { total: 0, pages: 1 };

  const categoryName = (categories as any[]).find((c: any) => c.slug === slug)?.name
    ?? slug?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    ?? 'Products';

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{categoryName}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="flex gap-4">
            {/* Sidebar filters */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="bg-card rounded-card border border-border p-4 sticky top-24">
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Categories</h3>
                <ul className="space-y-1 mb-6">
                  {(categories as any[]).map((cat: any) => (
                    <li key={cat._id ?? cat.id}>
                      <Link to={`/category/${cat.slug}`}
                        className={`block text-sm py-1 transition-colors ${cat.slug === slug ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}`}>
                        {cat.name} ({cat.productCount ?? 0})
                      </Link>
                    </li>
                  ))}
                </ul>

                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Price Range</h3>
                <div className="flex items-center gap-2 mb-4">
                  <input type="number" value={minPrice} onChange={e => { setMinPrice(e.target.value); setPage(1); }}
                    className="w-full h-8 px-2 text-xs bg-secondary border border-border rounded-input" placeholder="Min" />
                  <span className="text-xs text-muted-foreground">–</span>
                  <input type="number" value={maxPrice} onChange={e => { setMaxPrice(e.target.value); setPage(1); }}
                    className="w-full h-8 px-2 text-xs bg-secondary border border-border rounded-input" placeholder="Max" />
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Availability</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all',         label: 'All' },
                    { value: 'in_stock',    label: 'In Stock' },
                    { value: 'low_stock',   label: 'Low Stock' },
                    { value: 'out_of_stock', label: 'Out of Stock' },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input type="radio" name="stock" checked={stockFilter === opt.value}
                        onChange={() => { setStockFilter(opt.value); setPage(1); }} className="accent-primary" />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1">
              <div className="bg-card rounded-card border border-border p-4 mb-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h1 className="font-display text-xl text-foreground">{categoryName}</h1>
                  <p className="text-xs text-muted-foreground mt-0.5">{pagination.total} products found</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-1.5 text-sm text-foreground border border-border rounded-button px-3 py-1.5 hover:bg-secondary transition-colors">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>
                  <select value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }}
                    className="text-sm bg-secondary border border-border rounded-button px-3 py-1.5 text-foreground">
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Mobile filters */}
              {showFilters && (
                <div className="lg:hidden bg-card rounded-card border border-border p-4 mb-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Price Range</h3>
                    <div className="flex gap-2">
                      <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min"
                        className="w-full h-8 px-2 text-xs bg-secondary border border-border rounded-input" />
                      <span className="text-xs self-center">–</span>
                      <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max"
                        className="w-full h-8 px-2 text-xs bg-secondary border border-border rounded-input" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Stock</h3>
                    <div className="flex gap-3 flex-wrap">
                      {['all', 'in_stock', 'low_stock', 'out_of_stock'].map(v => (
                        <label key={v} className="flex items-center gap-1 text-xs cursor-pointer">
                          <input type="radio" name="stock-m" checked={stockFilter === v} onChange={() => setStockFilter(v)} className="accent-primary" />
                          {v === 'all' ? 'All' : v.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-64 bg-secondary rounded-card animate-pulse" />
                  ))}
                </div>
              ) : isError ? (
                <div className="bg-card rounded-card border border-border p-12 text-center">
                  <p className="text-destructive font-body">Failed to load products. Please try again.</p>
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {products.map((product: any) => (
                      <ProductCard key={product._id ?? product.id} product={product} />
                    ))}
                  </div>
                  {pagination.pages > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                        className="h-9 px-4 text-sm font-body border border-border rounded-button hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed">
                        Previous
                      </button>
                      <span className="h-9 px-4 flex items-center text-sm font-body text-muted-foreground">
                        {page} / {pagination.pages}
                      </span>
                      <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
                        className="h-9 px-4 text-sm font-body border border-border rounded-button hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed">
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-card rounded-card border border-border p-12 text-center">
                  <p className="text-muted-foreground font-body">No products found in this category yet.</p>
                  <Link to="/" className="text-primary hover:underline text-sm mt-2 inline-block">← Back to Home</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
