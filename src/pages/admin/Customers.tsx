import { useMemo, useState } from "react";
import { Search, Mail, Phone, Calendar, UserCircle } from "lucide-react";
import { useAdminCustomers } from "@/hooks/useAdminProducts";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  ordersCount: number;
}

type ApiCustomer = Record<string, unknown>;

const readString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const readNumber = (value: unknown, fallback = 0): number =>
  typeof value === "number" ? value : fallback;

const normalizeCustomer = (raw: ApiCustomer): Customer => {
  const joinedRaw = readString(raw.joinedDate) || readString(raw.createdAt);
  const joinedDate = joinedRaw ? new Date(joinedRaw).toISOString().slice(0, 10) : "-";
  const idValue = readString(raw.id) || readString(raw._id) || readString(raw.email);

  return {
    id: idValue || crypto.randomUUID(),
    name: readString(raw.name) || readString(raw.username) || "Unknown Customer",
    email: readString(raw.email, "-"),
    phone: readString(raw.phone) || readString(raw.phoneNumber) || "-",
    joinedDate,
    ordersCount:
      readNumber(raw.ordersCount, Number.NaN) ||
      readNumber(raw.orders, Number.NaN) ||
      readNumber(raw.totalOrders, 0),
  };
};

const Customers = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useAdminCustomers();

  const customers = useMemo(() => {
    if (Array.isArray(data)) return data.map((item) => normalizeCustomer(item as ApiCustomer));
    const payload = (data ?? {}) as { customers?: unknown[]; users?: unknown[] };
    if (Array.isArray(payload.customers)) return payload.customers.map((item) => normalizeCustomer(item as ApiCustomer));
    if (Array.isArray(payload.users)) return payload.users.map((item) => normalizeCustomer(item as ApiCustomer));
    return [];
  }, [data]);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm font-body text-muted-foreground">{filtered.length} customers</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-10 pr-4 bg-card border border-border rounded-input font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {isLoading && (
        <div className="bg-card rounded-card border border-border px-4 py-12 text-center font-body text-muted-foreground">
          Loading customers...
        </div>
      )}

      {isError && (
        <div className="bg-card rounded-card border border-border px-4 py-12 text-center font-body text-destructive">
          Failed to load customers. Please try again.
        </div>
      )}

      {/* Mobile cards + desktop table */}
      {!isLoading && !isError && (
      <div className="bg-card rounded-card border border-border overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-body font-semibold text-foreground">Customer</th>
                <th className="text-left px-4 py-3 font-body font-semibold text-foreground">Email</th>
                <th className="text-left px-4 py-3 font-body font-semibold text-foreground">Phone</th>
                <th className="text-center px-4 py-3 font-body font-semibold text-foreground">Orders</th>
                <th className="text-left px-4 py-3 font-body font-semibold text-foreground">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <UserCircle className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-body font-medium text-foreground">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body text-muted-foreground">{customer.email}</td>
                  <td className="px-4 py-3 font-body text-muted-foreground">{customer.phone}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-primary/10 text-primary text-xs font-body font-semibold px-2 py-0.5 rounded-badge">
                      {customer.ordersCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-muted-foreground">{customer.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-border">
          {filtered.map((customer) => (
            <div key={customer.id} className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-body font-medium text-foreground">{customer.name}</p>
                  <p className="text-xs font-body text-muted-foreground">{customer.ordersCount} orders</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-body text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{customer.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{customer.phone}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{customer.joinedDate}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center font-body text-muted-foreground">No customers found</div>
        )}
      </div>
      )}
    </div>
  );
};

export default Customers;
