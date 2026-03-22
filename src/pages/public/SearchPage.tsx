import { useSearchParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { Search, ChevronRight } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("popular");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    let filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
    switch (sortBy) {
      case "price-low": return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high": return [...filtered].sort((a, b) => b.price - a.price);
      default: return [...filtered].sort((a, b) => b.reviews - a.reviews);
    }
  }, [query, sortBy]);

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
                {query ? `Results for "${query}"` : "Search Products"}
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">{results.length} products found</p>
            </div>
            {results.length > 0 && (
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-secondary border border-border rounded-button px-3 py-1.5 text-foreground"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            )}
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-card border border-border p-16 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-lg text-foreground mb-2">
                {query ? "No products found" : "Start searching"}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {query ? `We couldn't find anything matching "${query}".` : "Type a keyword above to find products."}
              </p>
              <Link to="/" className="text-primary hover:underline text-sm font-medium">
                ← Browse All Products
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
