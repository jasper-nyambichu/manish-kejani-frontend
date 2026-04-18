import { useState } from "react";
import { Plus, Pencil, Trash2, Calendar, Tag, ToggleLeft, ToggleRight, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import {
  useAdminPromotions,
  useCreatePromotion,
  useUpdatePromotion,
  useDeletePromotion,
  useTogglePromotionStatus,
  type AdminPromotionRow,
} from "@/hooks/useAdminPromotions";

const toDateInput = (iso: string) => (iso ? iso.slice(0, 10) : "");

const Promotions = () => {
  const { data: promotions = [], isLoading, isError, refetch } = useAdminPromotions();
  const createPromotion = useCreatePromotion();
  const updatePromotion = useUpdatePromotion();
  const deletePromotion = useDeletePromotion();
  const toggleStatus = useTogglePromotionStatus();

  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    discountPercent: "",
    startDate: "",
    endDate: "",
  });
  const [createBanner, setCreateBanner] = useState<File | null>(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    discountPercent: "",
    startDate: "",
    endDate: "",
    products: [] as string[],
    categories: [] as string[],
  });
  const [editBanner, setEditBanner] = useState<File | null>(null);

  const resetCreate = () => {
    setCreateForm({ title: "", description: "", discountPercent: "", startDate: "", endDate: "" });
    setCreateBanner(null);
  };

  const openEdit = (p: AdminPromotionRow) => {
    setEditingId(p.id);
    setEditForm({
      title: p.title,
      description: p.description ?? "",
      discountPercent: String(p.discountPercent),
      startDate: toDateInput(p.startDate),
      endDate: toDateInput(p.endDate),
      products: Array.isArray(p.products) ? p.products : [],
      categories: Array.isArray(p.categories) ? p.categories : [],
    });
    setEditBanner(null);
  };

  const buildFormData = (
    title: string,
    description: string,
    discountPercent: string,
    startDate: string,
    endDate: string,
    products: string[],
    categories: string[],
    banner: File | null
  ) => {
    const fd = new FormData();
    fd.append("title", title.trim());
    fd.append("description", description.trim());
    fd.append("discountPercent", String(parseInt(discountPercent, 10)));
    fd.append("startDate", startDate);
    fd.append("endDate", endDate);
    fd.append("products", JSON.stringify(products));
    fd.append("categories", JSON.stringify(categories));
    if (banner) fd.append("bannerImage", banner);
    return fd;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.title.trim()) return toast.error("Title is required");
    const d = parseInt(createForm.discountPercent, 10);
    if (Number.isNaN(d) || d < 1 || d > 100) return toast.error("Discount must be 1–100");
    if (!createForm.startDate || !createForm.endDate) return toast.error("Start and end dates are required");
    if (createForm.startDate >= createForm.endDate) return toast.error("End date must be after start date");

    const fd = buildFormData(
      createForm.title,
      createForm.description,
      createForm.discountPercent,
      createForm.startDate,
      createForm.endDate,
      [],
      [],
      createBanner
    );

    createPromotion.mutate(fd, {
      onSuccess: () => {
        toast.success("Promotion created");
        resetCreate();
        setShowAdd(false);
      },
      onError: (err: unknown) => {
        const msg = err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
        toast.error(msg ?? "Failed to create promotion");
      },
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    if (!editForm.title.trim()) return toast.error("Title is required");
    const d = parseInt(editForm.discountPercent, 10);
    if (Number.isNaN(d) || d < 1 || d > 100) return toast.error("Discount must be 1–100");
    if (!editForm.startDate || !editForm.endDate) return toast.error("Start and end dates are required");
    if (editForm.startDate >= editForm.endDate) return toast.error("End date must be after start date");

    const fd = buildFormData(
      editForm.title,
      editForm.description,
      editForm.discountPercent,
      editForm.startDate,
      editForm.endDate,
      editForm.products,
      editForm.categories,
      editBanner
    );

    updatePromotion.mutate(
      { id: editingId, formData: fd },
      {
        onSuccess: () => {
          toast.success("Promotion updated");
          setEditingId(null);
          setEditBanner(null);
        },
        onError: (err: unknown) => {
          const msg = err && typeof err === "object" && "response" in err
            ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
            : undefined;
          toast.error(msg ?? "Failed to update promotion");
        },
      }
    );
  };

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`Delete promotion "${title}"? This cannot be undone.`)) return;
    deletePromotion.mutate(id, {
      onSuccess: () => toast.success("Promotion deleted"),
      onError: () => toast.error("Failed to delete promotion"),
    });
  };

  const handleToggle = (id: string) => {
    toggleStatus.mutate(id, {
      onError: () => toast.error("Failed to update status"),
    });
  };

  const busy =
    createPromotion.isPending ||
    updatePromotion.isPending ||
    deletePromotion.isPending ||
    toggleStatus.isPending;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm font-body text-muted-foreground">
          {isLoading ? "Loading…" : `${promotions.length} promotions`}
          {isError && (
            <button
              type="button"
              onClick={() => refetch()}
              className="ml-2 text-primary underline text-xs"
            >
              Retry
            </button>
          )}
        </p>
        <button
          type="button"
          onClick={() => {
            setShowAdd(!showAdd);
            if (showAdd) resetCreate();
          }}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold px-4 py-2.5 rounded-button text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Promotion
        </button>
      </div>

      {isError && (
        <div className="rounded-card border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Could not load promotions. Check admin session and API URL.
        </div>
      )}

      {showAdd && (
        <form
          onSubmit={handleCreate}
          className="bg-card rounded-card border border-primary/30 p-6 space-y-4"
        >
          <h3 className="font-body font-semibold text-foreground">Create promotion</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              className="h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Title"
              value={createForm.title}
              onChange={(e) => setCreateForm((f) => ({ ...f, title: e.target.value }))}
            />
            <input
              required
              type="number"
              min={1}
              max={100}
              className="h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Discount %"
              value={createForm.discountPercent}
              onChange={(e) => setCreateForm((f) => ({ ...f, discountPercent: e.target.value }))}
            />
            <div className="flex gap-2 sm:col-span-2">
              <input
                required
                type="date"
                className="flex-1 h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={createForm.startDate}
                onChange={(e) => setCreateForm((f) => ({ ...f, startDate: e.target.value }))}
              />
              <input
                required
                type="date"
                className="flex-1 h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={createForm.endDate}
                onChange={(e) => setCreateForm((f) => ({ ...f, endDate: e.target.value }))}
              />
            </div>
          </div>
          <textarea
            className="w-full px-3 py-2 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            rows={2}
            placeholder="Description (optional)"
            value={createForm.description}
            onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
          />
          <div>
            <label className="text-xs font-body text-muted-foreground flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5" />
              Banner image (optional, jpg/png/webp)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="mt-1 text-sm font-body text-foreground"
              onChange={(e) => setCreateBanner(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowAdd(false);
                resetCreate();
              }}
              className="h-10 px-4 border border-border rounded-button font-body text-sm text-muted-foreground hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="h-10 px-6 bg-primary text-primary-foreground rounded-button font-body text-sm font-semibold hover:opacity-90 disabled:opacity-50 inline-flex items-center gap-2"
            >
              {createPromotion.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              Save
            </button>
          </div>
        </form>
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <div className="grid gap-4">
          {promotions.map((promo) => (
            <div key={promo.id} className="bg-card rounded-card border border-border p-5">
              {editingId === promo.id ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <h4 className="font-body font-semibold text-foreground">Edit promotion</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      required
                      className="h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={editForm.title}
                      onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                    />
                    <input
                      required
                      type="number"
                      min={1}
                      max={100}
                      className="h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                      value={editForm.discountPercent}
                      onChange={(e) => setEditForm((f) => ({ ...f, discountPercent: e.target.value }))}
                    />
                    <div className="flex gap-2 sm:col-span-2">
                      <input
                        required
                        type="date"
                        className="flex-1 h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border"
                        value={editForm.startDate}
                        onChange={(e) => setEditForm((f) => ({ ...f, startDate: e.target.value }))}
                      />
                      <input
                        required
                        type="date"
                        className="flex-1 h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border"
                        value={editForm.endDate}
                        onChange={(e) => setEditForm((f) => ({ ...f, endDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  <textarea
                    className="w-full px-3 py-2 bg-secondary text-foreground rounded-input font-body text-sm border border-border resize-none"
                    rows={2}
                    value={editForm.description}
                    onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  />
                  <div>
                    <label className="text-xs font-body text-muted-foreground">Replace banner (optional)</label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="mt-1 text-sm font-body"
                      onChange={(e) => setEditBanner(e.target.files?.[0] ?? null)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setEditBanner(null);
                      }}
                      className="h-10 px-4 border border-border rounded-button font-body text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={busy}
                      className="h-10 px-6 bg-primary text-primary-foreground rounded-button font-body text-sm font-semibold disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      {updatePromotion.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                      Save changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 flex gap-4">
                    {promo.bannerImage?.url && (
                      <div className="w-24 h-24 rounded-button overflow-hidden bg-secondary flex-shrink-0 border border-border">
                        <img
                          src={promo.bannerImage.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-body font-semibold text-foreground">{promo.title}</h3>
                        <span
                          className={`text-xs font-body font-semibold px-2 py-0.5 rounded-badge ${
                            promo.isActive
                              ? "bg-success/10 text-success"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {promo.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                      {promo.description && (
                        <p className="text-sm font-body text-muted-foreground mb-2">{promo.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-body text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" />
                          {promo.discountPercent}% off
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {toDateInput(promo.startDate)} → {toDateInput(promo.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggle(promo.id)}
                      disabled={busy}
                      className={`w-8 h-8 rounded-button flex items-center justify-center transition-colors ${
                        promo.isActive
                          ? "text-success hover:bg-success/10"
                          : "text-muted-foreground hover:bg-secondary"
                      }`}
                      title={promo.isActive ? "Deactivate" : "Activate"}
                    >
                      {promo.isActive ? (
                        <ToggleRight className="w-5 h-5" />
                      ) : (
                        <ToggleLeft className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(promo)}
                      disabled={busy}
                      className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(promo.id, promo.title)}
                      disabled={busy}
                      className="w-8 h-8 rounded-button flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!isLoading && promotions.length === 0 && !isError && (
        <div className="rounded-card border border-border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
          No promotions yet. Create one to show offers on the storefront (when active and in date range).
        </div>
      )}
    </div>
  );
};

export default Promotions;
