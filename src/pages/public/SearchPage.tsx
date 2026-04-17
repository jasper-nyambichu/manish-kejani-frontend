// src/pages/public/SearchPage.tsx
import { useSearchParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useSearchProducts } from '@/hooks/useProduct';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Search, Star, SlidersHorizontal, X } from 'lucide-react';

interface Filters {
  minPrice:  string;
  maxPrice:  string;
  brands:    string[];
  rating:    number;
  condition: string;
}

const EMPTY_FILTERS: Filters = { minPrice: '', maxPrice: '', brands: [], rating: 0, condition: '' };

const SORT_OPTIONS = [
  { value: 'best_match',    label: 'Best Match'        },
  { value: 'price_asc',     label: 'Price: Low → High' },
  { value: 'price_desc',    label: 'Price: High → Low' },
  { value: 'newest',        label: 'Newest'            },
  { value: 'best_selling',  label: 'Best Selling'      },
  { value: 'most_reviewed', label: 'Most Reviewed'     },
];

const CONDITIONS = ['New', 'Used', 'Refurbished'];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query          = searchParams.get('q') ?? '';
  const categoryParam  = searchParams.get('category') ?? '';

  const [sortBy,      setSortBy]      = useState('best_match');
  const [page,        setPage]        = useState(1);
  const [applied,     setApplied]     = useState<Filters>(EMPTY_FILTERS);
  const [draft,       setDraft]       = useState<Filters>(EMPTY_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const queryFilters = useMemo(() => ({
    sort:  sortBy,
    page,
    limit: 20,
    ...(categoryParam         && { category:  categoryParam }),
    ...(applied.minPrice      && { minPrice:  Number(applied.minPrice) }),
    ...(applied.maxPrice      && { maxPrice:  Number(applied.maxPrice) }),
    ...(applied.brands.length && { brand:     applied.brands.join(',') }),
    ...(applied.rating        && { rating:    applied.rating }),
    ...(applied.condition     && { condition: applied.condition }),
  }), [sortBy, page, categoryParam, applied]);

  const { data, isLoading, isError } = useSearchProducts(query, queryFilters);
  const products   = data?.products   ?? [];
  const pagination = data?.pagination ?? { total: 0, pages: 1 };

  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p: any) => {
      const brand = p.brand ?? p.tags?.find((t: string) => t.startsWith('brand:'))?.replace('brand:', '');
      if (brand) set.add(brand);
    });
    return Array.from(set);
  }, [products]);

  const applyFilters = () => { setApplied({ ...draft }); setPage(1); setSidebarOpen(false); };
  const clearFilters = () => { setDraft(EMPTY_FILTERS); setApplied(EMPTY_FILTERS); setPage(1); };
  const toggleBrand  = (brand: string) => setDraft(d => ({
    ...d,
    brands: d.brands.includes(brand) ? d.brands.filter(b => b !== brand) : [...d.brands, brand],
  }));

  const hasActiveFilters = applied.minPrice || applied.maxPrice || applied.brands.length || applied.rating || applied.condition;

  const Sidebar = () => (
    <aside className="w-full space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base text-foreground">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-xs text-primary hover:underline flex items-center gap-1">
            <X className="w-3 h-3" /> Clear All
          </button>
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground mb-2">Price Range (KSh)</p>
        <div className="flex items-center gap-2">
          <input type="number" min={0} placeholder="Min" value={draft.minPrice}
            onChange={e => setDraft(d => ({ ...d, minPrice: e.target.value }))}
            className="w-full h-8 px-2 text-sm bg-secondary border border-border rounded-button text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40" />
          <span className="text-muted-foreground text-xs">–</span>
          <input type="number" min={0} placeholder="Max" value={draft.maxPrice}
            onChange={e => setDraft(d => ({ ...d, maxPrice: e.target.value }))}
            className="w-full h-8 px-2 text-sm bg-secondary border border-border rounded-button text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40" />
        </div>
      </div>

      {availableBrands.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">Brand</p>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {availableBrands.map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={draft.brands.includes(brand)} onChange={() => toggleBrand(brand)} className="accent-primary w-3.5 h-3.5" />
                <span className="text-sm font-body text-foreground group-hover:text-primary transition-colors">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold text-foreground mb-2">Minimum Rating</p>
        <div className="space-y-1.5">
          {[5, 4, 3, 2, 1].map(star => (
            <label key={star} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="rating" checked={draft.rating === star} onChange={() => setDraft(d => ({ ...d, rating: star }))} className="accent-primary w-3.5 h-3.5" />
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < star ? 'text-warning fill-warning' : 'text-border'}`} />
                ))}
                <span className="text-xs text-muted-foreground ml-1">& up</span>
              </span>
            </label>
          ))}
          {draft.rating > 0 && (
            <button onClick={() => setDraft(d => ({ ...d, rating: 0 }))} className="text-xs text-muted-foreground hover:text-primary">Clear</button>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground mb-2">Condition</p>
        <div className="space-y-1.5">
          {CONDITIONS.map(c => (
            <label key={c} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="condition" checked={draft.condition === c} onChange={() => setDraft(d => ({ ...d, condition: c }))} className="accent-primary w-3.5 h-3.5" />
              <span className="text-sm font-body text-foreground group-hover:text-primary transition-colors">{c}</span>
            </label>
          ))}
          {draft.condition && (
            <button onClick={() => setDraft(d => ({ ...d, condition: '' }))} className="text-xs text-muted-foreground hover:text-primary">Clear</button>
          )}
        </div>
      </div>

      <button onClick={applyFilters} className="w-full h-9 bg-primary text-primary-foreground text-sm font-semibold rounded-button hover:opacity-90 transition-opacity">
        Apply Filters
      </button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        {/* Page header */}
        <section className="relative bg-gradient-to-b from-secondary/60 to-background overflow-hidden">
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-primary/5 pointer-events-none" />
          <div className="relative container mx-auto px-4 pt-10 pb-8">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">Search Results</span>
            </nav>
            <h1 className="font-display text-2xl md:text-3xl text-foreground">
              {query ? <>Results for <span className="text-primary">"{query}"</span></> : 'Search Products'}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {isLoading ? 'Searching...' : `${pagination.total.toLocaleString()} result${pagination.total !== 1 ? 's' : ''}`}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-8">
          {/* Sort bar */}
          <div className="bg-card rounded-card border border-border p-3 mb-4 flex items-center justify-end gap-2">
            <button
              onClick={() => setSidebarOpen(s => !s)}
              className="lg:hidden flex items-center gap-1.5 h-9 px-3 text-sm border border-border rounded-button hover:bg-secondary transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />}
            </button>
            <select
              value={sortBy}
              onChange={e => { setSortBy(e.target.value); setPage(1); }}
              className="text-sm bg-secondary border border-border rounded-button px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className="flex gap-5">
            {/* Desktop sidebar */}
            <div className="hidden lg:block w-52 xl:w-56 flex-shrink-0">
              <div className="bg-card border border-border rounded-card p-4 sticky top-28">
                <Sidebar />
              </div>
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div className="lg:hidden fixed inset-0 z-40 flex">
                <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                <div className="relative z-50 w-[85vw] max-w-xs bg-card h-full overflow-y-auto p-4 shadow-xl flex flex-col">
                  <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <span className="font-display text-base text-foreground">Filters</span>
                    <button onClick={() => setSidebarOpen(false)} className="p-1 rounded hover:bg-secondary transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <Sidebar />
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {Array.from({ length: 12 }).map((_, i) => <div key={i} className="h-64 bg-secondary rounded-card animate-pulse" />)}
                </div>
              ) : isError ? (
                <div className="bg-card rounded-card border border-border p-16 text-center">
                  <p className="text-destructive font-body">Search failed. Please try again.</p>
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {products.map((product: any) => <ProductCard key={product._id ?? product.id} product={product} />)}
                  </div>
                  {pagination.pages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                      <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                        className="h-9 px-4 text-sm border border-border rounded-button hover:bg-secondary disabled:opacity-40">
                        Previous
                      </button>
                      <span className="text-sm text-muted-foreground">{page} / {pagination.pages}</span>
                      <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
                        className="h-9 px-4 text-sm border border-border rounded-button hover:bg-secondary disabled:opacity-40">
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-card rounded-card border border-border p-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h2 className="font-display text-lg text-foreground mb-2">
                    {query ? 'No products found' : 'Start searching'}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    {query ? `We couldn't find anything matching "${query}".` : 'Type a keyword above to find products.'}
                  </p>
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="text-primary hover:underline text-sm font-medium mr-4">Clear Filters</button>
                  )}
                  <Link to="/" className="text-primary hover:underline text-sm font-medium">← Browse All Products</Link>
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

export default SearchPage;
