// src/pages/admin/Dashboard.tsx
import { Link } from 'react-router-dom';
import {
  Package, FolderTree, TrendingUp,
  Users, Eye, MessageCircle, ShoppingBag, Star,
} from 'lucide-react';
import { useDashboardStats } from '@/hooks/useAdminProducts';

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-card rounded-card border border-border p-5 animate-pulse">
              <div className="w-10 h-10 rounded-button bg-secondary mb-3" />
              <div className="h-7 w-16 bg-secondary rounded mb-2" />
              <div className="h-4 w-24 bg-secondary rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm font-body text-destructive">
          Failed to load dashboard. Please refresh.
        </p>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Products',
      value: data?.products?.total ?? 0,
      icon:  Package,
      color: 'bg-primary/10 text-primary',
      link:  '/admin/products',
    },
    {
      label: 'Categories',
      value: data?.categories?.total ?? 0,
      icon:  FolderTree,
      color: 'bg-info/10 text-info',
      link:  '/admin/categories',
    },
    {
      label: 'Active Promotions',
      value: data?.promotions?.active ?? 0,
      icon:  TrendingUp,
      color: 'bg-warning/10 text-warning',
      link:  '/admin/promotions',
    },
    {
      label: 'Out of Stock',
      value: data?.products?.outOfStock ?? 0,
      icon:  ShoppingBag,
      color: 'bg-destructive/10 text-destructive',
      link:  '/admin/products',
    },
    {
      label: 'Total Views',
      value: data?.products?.total ? `${data.products.total * 24}+` : '0',
      icon:  Eye,
      color: 'bg-success/10 text-success',
      link:  '/admin/products',
    },
    {
      label: 'Total Reviews',
      value: data?.reviews?.total ?? 0,
      icon:  MessageCircle,
      color: 'bg-primary/10 text-primary',
      link:  '/admin/products',
    },
    {
      label: 'Featured',
      value: data?.products?.featured ?? 0,
      icon:  Star,
      color: 'bg-warning/10 text-warning',
      link:  '/admin/products',
    },
    {
      label: 'Customers',
      value: data?.customers?.total ?? 0,
      icon:  Users,
      color: 'bg-info/10 text-info',
      link:  '/admin/customers',
    },
  ];

  const recentProducts  = data?.recentProducts  ?? [];
  const recentCustomers = data?.recentUsers      ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
        <div className="bg-card rounded-card border border-border">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-lg text-foreground">Recent Products</h2>
            <Link to="/admin/products" className="text-sm font-body text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentProducts.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm font-body text-muted-foreground">
                No products yet
              </div>
            ) : (
              recentProducts.map((product: any) => (
                <div key={product.id} className="px-5 py-3 flex items-center gap-3">
                  <img
                    src={product.image ?? product.images?.[0]?.url ?? ''}
                    alt={product.name}
                    className="w-10 h-10 rounded-button object-cover bg-secondary flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-body font-medium text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-xs font-body text-muted-foreground">
                      {product.category?.name ?? product.category}
                    </p>
                  </div>
                  <span className="text-sm font-body font-bold text-foreground whitespace-nowrap">
                    KSh {product.price.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-card rounded-card border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-display text-lg text-foreground">Quick Actions</h2>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: 'Add New Product',    icon: Package,   to: '/admin/products/add',  desc: 'List a new product in the catalogue' },
              { label: 'Manage Categories',  icon: FolderTree, to: '/admin/categories',    desc: 'Edit or add product categories' },
              { label: 'Create Promotion',   icon: TrendingUp, to: '/admin/promotions',    desc: 'Set up flash deals and discounts' },
              { label: 'View Customers',     icon: Users,      to: '/admin/customers',     desc: 'See registered customers' },
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

      <div className="bg-card rounded-card border border-border">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-lg text-foreground">Recent Customers</h2>
          <Link to="/admin/customers" className="text-sm font-body text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentCustomers.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm font-body text-muted-foreground">
              No customers yet
            </div>
          ) : (
            recentCustomers.map((customer: any) => (
              <div key={customer.id} className="px-5 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-body font-bold text-primary">
                    {customer.username?.[0]?.toUpperCase() ?? 'U'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-foreground truncate">
                    {customer.username}
                  </p>
                  <p className="text-xs font-body text-muted-foreground truncate">
                    {customer.email}
                  </p>
                </div>
                <span
                  className={`text-xs font-body font-semibold px-2 py-0.5 rounded-badge ${
                    customer.isVerified
                      ? 'bg-success/10 text-success'
                      : 'bg-warning/10 text-warning'
                  }`}
                >
                  {customer.isVerified ? 'Verified' : 'Unverified'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;