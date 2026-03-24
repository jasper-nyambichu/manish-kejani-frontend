import { Package, FolderTree, TrendingUp, Users, Eye, MessageCircle, ShoppingBag, Star } from "lucide-react";
import { products, categories } from "@/data/products";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Products", value: products.length, icon: Package, color: "bg-primary/10 text-primary", link: "/admin/products" },
  { label: "Categories", value: categories.length, icon: FolderTree, color: "bg-info/10 text-info", link: "/admin/categories" },
  { label: "Flash Deals", value: products.filter((p) => p.isFlashDeal).length, icon: TrendingUp, color: "bg-warning/10 text-warning", link: "/admin/promotions" },
  { label: "Low Stock", value: products.filter((p) => p.stock === "low-stock").length, icon: ShoppingBag, color: "bg-destructive/10 text-destructive", link: "/admin/products" },
];

const recentProducts = products.slice(0, 5);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.link}
            className="bg-card rounded-card border border-border p-5 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-button flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-display text-foreground">{stat.value}</p>
            <p className="text-sm font-body text-muted-foreground">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent products */}
        <div className="bg-card rounded-card border border-border">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-lg text-foreground">Recent Products</h2>
            <Link to="/admin/products" className="text-sm font-body text-primary hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-border">
            {recentProducts.map((product) => (
              <div key={product.id} className="px-5 py-3 flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-button object-cover bg-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-foreground truncate">{product.name}</p>
                  <p className="text-xs font-body text-muted-foreground">{product.category}</p>
                </div>
                <span className="text-sm font-body font-bold text-foreground whitespace-nowrap">
                  KSh {product.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-card rounded-card border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display text-lg text-foreground">Quick Actions</h2>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: "Add New Product", icon: Package, to: "/admin/products/add", desc: "List a new product in the catalogue" },
              { label: "Manage Categories", icon: FolderTree, to: "/admin/categories", desc: "Edit or add product categories" },
              { label: "Create Promotion", icon: TrendingUp, to: "/admin/promotions", desc: "Set up flash deals and discounts" },
              { label: "View Customers", icon: Users, to: "/admin/customers", desc: "See registered customers" },
            ].map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="flex items-center gap-4 p-3 rounded-button hover:bg-secondary transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-button flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-body font-medium text-foreground">{action.label}</p>
                  <p className="text-xs font-body text-muted-foreground">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stock alerts */}
      <div className="bg-card rounded-card border border-border">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-display text-lg text-foreground">Stock Alerts</h2>
        </div>
        <div className="divide-y divide-border">
          {products
            .filter((p) => p.stock !== "in-stock")
            .map((product) => (
              <div key={product.id} className="px-5 py-3 flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-button object-cover bg-secondary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-foreground truncate">{product.name}</p>
                </div>
                <span
                  className={`text-xs font-body font-semibold px-2 py-0.5 rounded-badge ${
                    product.stock === "low-stock" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {product.stock === "low-stock" ? "Low Stock" : "Out of Stock"}
                </span>
              </div>
            ))}
          {products.filter((p) => p.stock !== "in-stock").length === 0 && (
            <div className="px-5 py-8 text-center text-sm font-body text-muted-foreground">
              All products are in stock 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
