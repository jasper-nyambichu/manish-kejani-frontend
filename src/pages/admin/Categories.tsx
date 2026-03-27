// src/pages/admin/Categories.tsx
import { useState } from 'react';
import { Plus, Pencil, Trash2, FolderTree, Check, X, Eye, EyeOff, Loader2 } from 'lucide-react';
import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useToggleCategoryStatus,
} from '@/hooks/useAdminProducts';
import { toast } from 'sonner';

interface CategoryForm {
  name:        string;
  icon:        string;
  description: string;
  sortOrder:   string;
}

const emptyForm: CategoryForm = { name: '', icon: '', description: '', sortOrder: '' };

const Categories = () => {
  const { data: categories = [], isLoading, isError } = useAdminCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const toggleStatus   = useToggleCategoryStatus();

  const [showAdd,    setShowAdd]    = useState(false);
  const [editingId,  setEditingId]  = useState<string | null>(null);
  const [addForm,    setAddForm]    = useState<CategoryForm>(emptyForm);
  const [editForm,   setEditForm]   = useState<CategoryForm>(emptyForm);

  // ── HELPERS ────────────────────────────────────────────
  const toFormData = (form: CategoryForm) => {
    const fd = new FormData();
    if (form.name.trim())        fd.append('name',        form.name.trim());
    if (form.icon.trim())        fd.append('icon',        form.icon.trim());
    if (form.description.trim()) fd.append('description', form.description.trim());
    if (form.sortOrder)          fd.append('sortOrder',   form.sortOrder);
    return fd;
  };

  // ── CREATE ─────────────────────────────────────────────
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name.trim()) return toast.error('Category name is required');

    createCategory.mutate(toFormData(addForm), {
      onSuccess: () => {
        toast.success(`Category "${addForm.name}" created`);
        setAddForm(emptyForm);
        setShowAdd(false);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? 'Failed to create category');
      },
    });
  };

  // ── UPDATE ─────────────────────────────────────────────
  const handleUpdate = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!editForm.name.trim()) return toast.error('Category name is required');

    updateCategory.mutate({ id, formData: toFormData(editForm) }, {
      onSuccess: () => {
        toast.success('Category updated');
        setEditingId(null);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? 'Failed to update category');
      },
    });
  };

  // ── DELETE ─────────────────────────────────────────────
  const handleDelete = (id: string, name: string, productCount: number) => {
    if (productCount > 0) {
      return toast.error(`Cannot delete "${name}" — it has ${productCount} products. Remove or reassign them first.`);
    }
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    deleteCategory.mutate(id, {
      onSuccess: () => toast.success(`Category "${name}" deleted`),
      onError:   (err: any) => toast.error(err?.response?.data?.message ?? 'Failed to delete category'),
    });
  };

  // ── TOGGLE STATUS ──────────────────────────────────────
  const handleToggle = (id: string, name: string, isActive: boolean) => {
    toggleStatus.mutate(id, {
      onSuccess: () => toast.success(`"${name}" ${isActive ? 'deactivated' : 'activated'}`),
      onError:   (err: any) => toast.error(err?.response?.data?.message ?? 'Failed to toggle status'),
    });
  };

  const startEdit = (cat: any) => {
    setEditingId(cat._id ?? cat.id);
    setEditForm({
      name:        cat.name        ?? '',
      icon:        cat.icon        ?? '',
      description: cat.description ?? '',
      sortOrder:   String(cat.sortOrder ?? ''),
    });
  };

  const inputClass = 'h-9 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30';

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderTree className="w-5 h-5 text-primary" />
          <p className="text-sm font-body text-muted-foreground">
            {isLoading ? 'Loading...' : `${(categories as any[]).length} categories`}
          </p>
        </div>
        <button
          onClick={() => { setShowAdd(!showAdd); setEditingId(null); }}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-4 py-2.5 rounded-button text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form onSubmit={handleCreate} className="bg-card rounded-card border border-primary/30 p-5 space-y-3">
          <h3 className="font-body font-semibold text-foreground text-sm">New Category</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={addForm.icon}
              onChange={e => setAddForm(p => ({ ...p, icon: e.target.value }))}
              className={`w-20 text-center text-lg ${inputClass}`}
              placeholder="🏠"
            />
            <input
              value={addForm.name}
              onChange={e => setAddForm(p => ({ ...p, name: e.target.value }))}
              className={`flex-1 ${inputClass}`}
              placeholder="Category name *"
            />
            <input
              value={addForm.sortOrder}
              onChange={e => setAddForm(p => ({ ...p, sortOrder: e.target.value }))}
              type="number"
              className={`w-24 ${inputClass}`}
              placeholder="Order"
            />
          </div>
          <input
            value={addForm.description}
            onChange={e => setAddForm(p => ({ ...p, description: e.target.value }))}
            className={`w-full ${inputClass}`}
            placeholder="Description (optional)"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => { setShowAdd(false); setAddForm(emptyForm); }}
              className="h-9 px-4 text-sm font-body text-muted-foreground hover:bg-secondary rounded-button transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={createCategory.isPending}
              className="h-9 px-6 bg-primary text-primary-foreground rounded-button font-body text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
              {createCategory.isPending && <Loader2 className="w-3 h-3 animate-spin" />}
              {createCategory.isPending ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      )}

      {/* Categories list */}
      <div className="bg-card rounded-card border border-border overflow-hidden">
        {isLoading ? (
          <div className="divide-y divide-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="px-5 py-4">
                <div className="h-8 bg-secondary rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="px-5 py-12 text-center">
            <p className="text-destructive font-body text-sm">Failed to load categories</p>
          </div>
        ) : (categories as any[]).length === 0 ? (
          <div className="px-5 py-12 text-center">
            <FolderTree className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-body text-sm">No categories yet. Add one above.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {(categories as any[]).map((cat: any) => {
              const catId = cat._id ?? cat.id;
              const isEditing = editingId === catId;

              return (
                <div key={catId} className={`px-5 py-4 flex items-center gap-4 transition-colors ${isEditing ? 'bg-primary/5' : 'hover:bg-secondary/30'}`}>

                  {isEditing ? (
                    /* ── Edit row ── */
                    <form onSubmit={e => handleUpdate(e, catId)} className="flex-1 flex flex-col sm:flex-row gap-2">
                      <input value={editForm.icon} onChange={e => setEditForm(p => ({ ...p, icon: e.target.value }))}
                        className={`w-14 text-center text-lg ${inputClass} border-primary`} />
                      <input value={editForm.name} onChange={e => setEditForm(p => ({ ...p, name: e.target.value }))}
                        className={`flex-1 ${inputClass} border-primary`} placeholder="Category name *" />
                      <input value={editForm.description} onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                        className={`flex-1 ${inputClass}`} placeholder="Description" />
                      <input value={editForm.sortOrder} onChange={e => setEditForm(p => ({ ...p, sortOrder: e.target.value }))}
                        type="number" className={`w-20 ${inputClass}`} placeholder="Order" />
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button type="submit" disabled={updateCategory.isPending}
                          className="w-8 h-8 rounded-button flex items-center justify-center hover:bg-success/10 transition-colors disabled:opacity-50" title="Save">
                          {updateCategory.isPending ? <Loader2 className="w-4 h-4 animate-spin text-success" /> : <Check className="w-4 h-4 text-success" />}
                        </button>
                        <button type="button" onClick={() => setEditingId(null)}
                          className="w-8 h-8 rounded-button flex items-center justify-center hover:bg-destructive/10 transition-colors" title="Cancel">
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* ── Display row ── */
                    <>
                      <span className="text-2xl w-10 text-center flex-shrink-0">{cat.icon || '📦'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-body font-medium ${cat.isActive ? 'text-foreground' : 'text-muted-foreground line-through'}`}>
                            {cat.name}
                          </p>
                          <span className={`text-[10px] font-body font-semibold px-1.5 py-0.5 rounded-badge ${cat.isActive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                            {cat.isActive ? 'Active' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-xs font-body text-muted-foreground">
                          /{cat.slug} · {cat.productCount ?? 0} products
                          {cat.description && ` · ${cat.description}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {/* Toggle active/hidden */}
                        <button
                          onClick={() => handleToggle(catId, cat.name, cat.isActive)}
                          disabled={toggleStatus.isPending}
                          className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-50"
                          title={cat.isActive ? 'Deactivate (hide from users)' : 'Activate (show to users)'}
                        >
                          {cat.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => startEdit(cat)}
                          className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(catId, cat.name, cat.productCount ?? 0)}
                          disabled={deleteCategory.isPending}
                          className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info note */}
      <p className="text-xs font-body text-muted-foreground px-1">
        💡 <strong>Active</strong> categories are visible to users. <strong>Hidden</strong> categories are invisible on the storefront but products remain in the database.
        You can only delete a category that has <strong>0 products</strong>.
      </p>
    </div>
  );
};

export default Categories;
