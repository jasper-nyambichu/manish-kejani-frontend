import { useState } from "react";
import { Plus, Pencil, Trash2, FolderTree, Check, X } from "lucide-react";
import { categories } from "@/data/products";

const Categories = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState({ name: "", icon: "" });
  const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
  const [showAdd, setShowAdd] = useState(false);

  const startEdit = (id: string, name: string, icon: string) => {
    setEditingId(id);
    setEditValue({ name, icon });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue({ name: "", icon: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-primary" />
          <p className="text-sm font-body text-muted-foreground">{categories.length} categories</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-4 py-2.5 rounded-button text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="bg-card rounded-card border border-primary/30 p-5">
          <h3 className="font-body font-semibold text-foreground text-sm mb-3">New Category</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={newCategory.icon}
              onChange={(e) => setNewCategory((p) => ({ ...p, icon: e.target.value }))}
              className="w-20 h-10 px-3 bg-secondary text-foreground text-center rounded-input font-body text-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="🏠"
            />
            <input
              value={newCategory.name}
              onChange={(e) => setNewCategory((p) => ({ ...p, name: e.target.value }))}
              className="flex-1 h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Category name"
            />
            <button className="h-10 px-6 bg-primary text-primary-foreground rounded-button font-body text-sm font-semibold hover:opacity-90 transition-opacity">
              Save
            </button>
          </div>
        </div>
      )}

      {/* Categories list */}
      <div className="bg-card rounded-card border border-border overflow-hidden">
        <div className="divide-y divide-border">
          {categories.map((cat) => (
            <div key={cat.id} className="px-5 py-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors">

              {editingId === cat.id ? (
                /* ── Inline edit row ── */
                <>
                  <input
                    value={editValue.icon}
                    onChange={(e) => setEditValue((p) => ({ ...p, icon: e.target.value }))}
                    className="w-14 h-9 px-2 bg-secondary text-foreground text-center rounded-input font-body text-lg border border-primary focus:outline-none"
                  />
                  <input
                    value={editValue.name}
                    onChange={(e) => setEditValue((p) => ({ ...p, name: e.target.value }))}
                    className="flex-1 h-9 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <div className="flex items-center gap-1">
                    <button
                      onClick={cancelEdit}
                      className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      title="Save"
                    >
                      <Check className="w-4 h-4 text-success" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                /* ── Normal display row ── */
                <>
                  <span className="text-2xl w-10 text-center">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-foreground">{cat.name}</p>
                    <p className="text-xs font-body text-muted-foreground">/{cat.slug} · {cat.productCount} products</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEdit(cat.id, cat.name, cat.icon)}
                      className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
