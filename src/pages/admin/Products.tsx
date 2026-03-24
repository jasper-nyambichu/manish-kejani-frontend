import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Eye } from "lucide-react";
import { products as allProducts, categories } from "@/data/products";
import StockBadge from "@/components/common/StockBadge";

const Products = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [search, categoryFilter]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-sm font-body text-muted-foreground">{filtered.length} products</p>
        </div>
        <Link
          to="/admin/products/add"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-4 py-2.5 rounded-button text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-card border border-border rounded-input font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 px-3 bg-card border border-border rounded-input font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-card rounded-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-body font-semibold text-foreground">Product</th>
                <th className="text-left px-4 py-3 font-body font-semibold text-foreground hidden sm:table-cell">Category</th>
                <th className="text-right px-4 py-3 font-body font-semibold text-foreground">Price</th>
                <th className="text-center px-4 py-3 font-body font-semibold text-foreground hidden md:table-cell">Stock</th>
                <th className="text-center px-4 py-3 font-body font-semibold text-foreground hidden lg:table-cell">Rating</th>
                <th className="text-right px-4 py-3 font-body font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-button object-cover bg-secondary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-body font-medium text-foreground truncate max-w-[200px]">{product.name}</p>
                        <p className="text-xs font-body text-muted-foreground sm:hidden">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body text-muted-foreground hidden sm:table-cell">{product.category}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-body font-bold text-foreground">KSh {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="block text-xs font-body text-muted-foreground line-through">
                        KSh {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <StockBadge stock={product.stock} />
                  </td>
                  <td className="px-4 py-3 text-center hidden lg:table-cell">
                    <span className="font-body text-muted-foreground">{product.rating} ⭐</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/product/${product.id}`}
                        className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center font-body text-muted-foreground">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
