import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { products, categories } from "@/data/products";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { ChevronRight, SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";

type SortOption = "popular" | "price-low" | "price-high" | "newest";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [stockFilter, setStockFilter] = useState<string>("all");

  const category = categories.find((c) => c.slug === slug);
  const categoryName = category?.name || slug?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "All Products";

  const filtered = useMemo(() => {
    let result = category
      ? products.filter((p) => p.category === category.name)
      : products;

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (stockFilter !== "all") {
      result = result.filter((p) => p.stock === stockFilter);
    }

    switch (sortBy) {
      case "price-low": return [...result].sort((a, b) => a.price - b.price);
      case "price-high": return [...result].sort((a, b) => b.price - a.price);
      case "newest": return [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default: return [...result].sort((a, b) => b.reviews - a.reviews);
    }
  }, [category, sortBy, priceRange, stockFilter]);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{categoryName}</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="flex gap-4">
            {/* Sidebar filters (desktop) */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="bg-card rounded-card border border-border p-4 sticky top-24">
                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Category</h3>
                <ul className="space-y-1 mb-6">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        to={`/category/${cat.slug}`}
                        className={`block text-sm py-1 transition-colors ${
                          cat.slug === slug ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat.name} ({cat.productCount})
                      </Link>
                    </li>
                  ))}
                </ul>

                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Price Range</h3>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="w-full h-8 px-2 text-xs bg-secondary border border-border rounded-input"
                    placeholder="Min"
                  />
                  <span className="text-xs text-muted-foreground">–</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full h-8 px-2 text-xs bg-secondary border border-border rounded-input"
                    placeholder="Max"
                  />
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Availability</h3>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All" },
                    { value: "in-stock", label: "In Stock" },
                    { value: "low-stock", label: "Low Stock" },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="radio"
                        name="stock"
                        checked={stockFilter === opt.value}
                        onChange={() => setStockFilter(opt.value)}
                        className="accent-primary"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1">
              {/* Header */}
              <div className="bg-card rounded-card border border-border p-4 mb-4 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h1 className="font-display text-xl text-foreground">{categoryName}</h1>
                  <p className="text-xs text-muted-foreground mt-0.5">{filtered.length} products found</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-1.5 text-sm text-foreground border border-border rounded-button px-3 py-1.5 hover:bg-secondary transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>
                  {/* View mode toggle */}
                  <div className="hidden sm:flex items-center border border-border rounded-button overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`w-8 h-8 flex items-center justify-center transition-colors ${
                        viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                      }`}
                      title="Grid view"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`w-8 h-8 flex items-center justify-center transition-colors ${
                        viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"
                      }`}
                      title="List view"
                    >
                      <LayoutList className="w-4 h-4" />
                    </button>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="text-sm bg-secondary border border-border rounded-button px-3 py-1.5 text-foreground"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>

              {/* Mobile filters */}
              {showFilters && (
                <div className="lg:hidden bg-card rounded-card border border-border p-4 mb-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Price Range</h3>
                    <div className="flex gap-2">
                      <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])} className="w-full h-8 px-2 text-xs bg-secondary border border-border rounded-input" />
                      <span className="text-xs self-center">–</span>
                      <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} className="w-full h-8 px-2 text-xs bg-secondary border border-border rounded-input" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Stock</h3>
                    <div className="flex gap-3">
                      {["all", "in-stock", "low-stock"].map((v) => (
                        <label key={v} className="flex items-center gap-1 text-xs cursor-pointer">
                          <input type="radio" name="stock-m" checked={stockFilter === v} onChange={() => setStockFilter(v)} className="accent-primary" />
                          {v === "all" ? "All" : v === "in-stock" ? "In Stock" : "Low Stock"}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Products grid / list */}
              {filtered.length > 0 ? (
                viewMode === "grid" ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filtered.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filtered.map((product) => (
                      <div key={product.id} className="bg-card rounded-card border border-border p-4 flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 rounded-button object-cover bg-secondary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-medium text-foreground truncate">{product.name}</p>
                          <p className="text-xs font-body text-muted-foreground">{product.category}</p>
                        </div>
                        <span className="font-body font-bold text-foreground whitespace-nowrap">KSh {product.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="bg-card rounded-card border border-border p-12 text-center">
                  <p className="text-muted-foreground">No products found matching your filters.</p>
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
