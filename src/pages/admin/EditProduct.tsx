import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, ImagePlus } from "lucide-react";
import { products, categories } from "@/data/products";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    image: "",
    description: "",
    stock: "in-stock" as "in-stock" | "low-stock" | "out-of-stock",
    discount: "",
    isFlashDeal: false,
    isFeatured: false,
    isNew: false,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: String(product.price),
        originalPrice: product.originalPrice ? String(product.originalPrice) : "",
        category: product.category,
        image: product.image,
        description: "",
        stock: product.stock,
        discount: product.discount ? String(product.discount) : "",
        isFlashDeal: product.isFlashDeal || false,
        isFeatured: product.isFeatured || false,
        isNew: product.isNew || false,
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="font-body text-muted-foreground">Product not found</p>
        <Link to="/admin/products" className="text-sm text-primary hover:underline mt-2 inline-block">Back to Products</Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate save delay then navigate
    setTimeout(() => {
      setIsSaving(false);
      navigate("/admin/products");
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/admin/products" className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <form onSubmit={handleSubmit} className="bg-card rounded-card border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-display text-xl text-foreground">Edit Product</h2>
          <p className="text-sm font-body text-muted-foreground">ID: {product.id}</p>
        </div>

        {/* Loading overlay while saving */}
        {isSaving ? (
          <LoadingSpinner className="py-16" />
        ) : (
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Price (KSh) *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Original Price</label>
                <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Discount %</label>
                <input name="discount" type="number" value={form.discount} onChange={handleChange} className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Category *</label>
                <select name="category" value={form.category} onChange={handleChange} required className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1.5">Stock Status *</label>
                <select name="stock" value={form.stock} onChange={handleChange} className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Image URL *</label>
              <div className="flex gap-3">
                <input name="image" value={form.image} onChange={handleChange} required className="flex-1 h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <div className="w-10 h-10 bg-secondary rounded-button flex items-center justify-center border border-border overflow-hidden">
                  {form.image ? (
                    <img src={form.image} alt="" className="w-10 h-10 object-cover" />
                  ) : (
                    <ImagePlus className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full px-3 py-2 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { name: "isNew", label: "New Arrival" },
                { name: "isFlashDeal", label: "Flash Deal" },
                { name: "isFeatured", label: "Featured / Best Seller" },
              ].map((flag) => (
                <label key={flag.name} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name={flag.name} checked={(form as Record<string, unknown>)[flag.name] as boolean} onChange={handleChange} className="w-4 h-4 accent-primary rounded" />
                  <span className="text-sm font-body text-foreground">{flag.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
          <Link to="/admin/products" className="h-10 px-4 flex items-center rounded-button font-body text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="h-10 px-6 bg-primary text-primary-foreground rounded-button font-body text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving…" : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
