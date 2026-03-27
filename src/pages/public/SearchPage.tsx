// src/pages/public/SearchPage.tsx
import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useSearchProducts } from '@/hooks/useProduct';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Search, ChevronRight } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query  = searchParams.get('q') ?? '';
  const [sortBy, setSortBy] = useState('rating');
  const [page,   setPage]   = useState(1);

  const { data, isLoading, isError } = useSearchProducts(query, { sort: sortBy, page, limit: 20 });
  const products   = data?.products   ?? [];
  const pagination = data?.pagination ?? { total: 0, pages: 1 };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Search Results</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="bg-card rounded-card border border-border p-4 mb-4 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="font-display text-xl text-foreground">
                {query ? `Results for "${query}"` : 'Search Products'}
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isLoading ? 'Searching...' : `${pagination.total} products found`}
              </p>
            </div>
            {products.length > 0 && (
              <select value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }}
                className="text-sm bg-secondary border border-border rounded-button px-3 py-1.5 text-foreground">
                <option value="rating">Top Rated</option>
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-64 bg-secondary rounded-card animate-pulse" />
              ))}
            </div>
          ) : isError ? (
            <div className="bg-card rounded-card border border-border p-16 text-center">
              <p className="text-destructive font-body">Search failed. Please try again.</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
            <div className="bg-card rounded-card border border-border p-16 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-lg text-foreground mb-2">
                {query ? 'No products found' : 'Start searching'}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {query ? `We couldn't find anything matching "${query}".` : 'Type a keyword above to find products.'}
              </p>
              <Link to="/" className="text-primary hover:underline text-sm font-medium">← Browse All Products</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
