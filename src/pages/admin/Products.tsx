// src/pages/admin/Products.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2, Eye } from 'lucide-react';
import { useAdminProducts, useAdminCategories, useDeleteProduct } from '@/hooks/useAdminProducts';
import StockBadge from '@/components/common/StockBadge';

const Products = () => {
  const [search,         setSearch]         = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page,           setPage]           = useState(1);

  const params: Record<string, string> = { page: String(page), limit: '20' };
  if (search)                          params.search   = search;
  if (categoryFilter !== 'all')        params.category = categoryFilter;

  const { data, isLoading, isError }   = useAdminProducts(params);
  const { data: categoriesData }       = useAdminCategories();
  const deleteProduct                  = useDeleteProduct();

  const products   = data?.products   ?? [];
  const pagination = data?.pagination ?? { total: 0, pages: 1 };
  const categories = categoriesData   ?? [];

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    deleteProduct.mutate(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm font-body text-muted-foreground">
          {pagination.total} products
        </p>
        <Link
          to="/admin/products/add"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-4 py-2.5 rounded-button text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full h-10 pl-10 pr-4 bg-card border border-border rounded-input font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          className="h-10 px-3 bg-card border border-border rounded-input font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">All Categories</option>
          {categories.map((cat: any) => (
            <option key={cat._id ?? cat.id} value={cat._id ?? cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

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
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="px-4 py-3">
                      <div className="h-10 bg-secondary rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center font-body text-destructive text-sm">
                    Failed to load products
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center font-body text-muted-foreground">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product: any) => {
                  const pid = product._id ?? product.id;
                  return (
                  <tr key={pid} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0]?.url ?? product.image ?? ''}
                          alt={product.name}
                          className="w-10 h-10 rounded-button object-cover bg-secondary flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-body font-medium text-foreground truncate max-w-[200px]">
                            {product.name}
                          </p>
                          <p className="text-xs font-body text-muted-foreground sm:hidden">
                            {product.category?.name ?? product.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-body text-muted-foreground hidden sm:table-cell">
                      {product.category?.name ?? product.category}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-body font-bold text-foreground">
                        KSh {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="block text-xs font-body text-muted-foreground line-through">
                          KSh {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <StockBadge stock={product.status ?? product.stock} />
                    </td>
                    <td className="px-4 py-3 text-center hidden lg:table-cell">
                      <span className="font-body text-muted-foreground">
                        {product.rating} ⭐ ({product.reviews ?? 0})
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/product/${pid}`}
                          className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/products/edit/${pid}`}
                          className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(pid, product.name)}
                          disabled={deleteProduct.isPending}
                          className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {pagination.pages > 1 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <p className="text-xs font-body text-muted-foreground">
              Page {page} of {pagination.pages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-8 px-3 text-xs font-body rounded-button border border-border hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
                className="h-8 px-3 text-xs font-body rounded-button border border-border hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;