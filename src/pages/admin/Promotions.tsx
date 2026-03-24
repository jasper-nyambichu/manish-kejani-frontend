import { useState } from "react";
import { Plus, Pencil, Trash2, Calendar, Tag, ToggleLeft, ToggleRight } from "lucide-react";
import type { Promotion } from "@/types/promotion.types";

const samplePromotions: Promotion[] = [
  {
    id: "1",
    title: "Flash Friday Sale",
    description: "Up to 30% off all kitchenware",
    discountPercent: 30,
    startDate: "2025-06-20",
    endDate: "2025-06-22",
    isActive: true,
    code: "FLASH30",
  },
  {
    id: "2",
    title: "New Arrivals Week",
    description: "15% off all new products",
    discountPercent: 15,
    startDate: "2025-06-25",
    endDate: "2025-07-01",
    isActive: false,
    code: "NEW15",
  },
];

const Promotions = () => {
  const [promotions] = useState(samplePromotions);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-body text-muted-foreground">{promotions.length} promotions</p>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-4 py-2.5 rounded-button text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Promotion
        </button>
      </div>

      {showAdd && (
        <div className="bg-card rounded-card border border-primary/30 p-6 space-y-4">
          <h3 className="font-body font-semibold text-foreground">Create Promotion</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Promotion title" />
            <input className="h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Promo code (e.g. FLASH30)" />
            <input type="number" className="h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Discount %" />
            <div className="flex gap-2">
              <input type="date" className="flex-1 h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="date" className="flex-1 h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <textarea className="w-full px-3 py-2 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" rows={2} placeholder="Description" />
          <div className="flex justify-end">
            <button className="h-10 px-6 bg-primary text-primary-foreground rounded-button font-body text-sm font-semibold hover:opacity-90 transition-opacity">
              Save Promotion
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-card rounded-card border border-border p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-body font-semibold text-foreground">{promo.title}</h3>
                  <span className={`text-xs font-body font-semibold px-2 py-0.5 rounded-badge ${promo.isActive ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                    {promo.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-sm font-body text-muted-foreground mb-2">{promo.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-body text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {promo.code || "No code"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {promo.startDate} → {promo.endDate}
                  </span>
                  <span className="font-semibold text-primary">{promo.discountPercent}% off</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
