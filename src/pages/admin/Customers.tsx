import { useState } from "react";
import { Search, Mail, Phone, Calendar, UserCircle } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  ordersCount: number;
}

const sampleCustomers: Customer[] = [
  { id: "1", name: "Jane Wanjiku", email: "jane@email.com", phone: "0712 345 678", joinedDate: "2025-05-10", ordersCount: 5 },
  { id: "2", name: "David Otieno", email: "david@email.com", phone: "0723 456 789", joinedDate: "2025-05-15", ordersCount: 3 },
  { id: "3", name: "Mary Njeri", email: "mary@email.com", phone: "0734 567 890", joinedDate: "2025-06-01", ordersCount: 1 },
  { id: "4", name: "James Kamau", email: "james@email.com", phone: "0745 678 901", joinedDate: "2025-06-10", ordersCount: 8 },
  { id: "5", name: "Sarah Achieng", email: "sarah@email.com", phone: "0756 789 012", joinedDate: "2025-06-12", ordersCount: 2 },
];

const Customers = () => {
  const [search, setSearch] = useState("");
  const filtered = sampleCustomers.filter(
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

      {/* Mobile cards + desktop table */}
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
    </div>
  );
};

export default Customers;
