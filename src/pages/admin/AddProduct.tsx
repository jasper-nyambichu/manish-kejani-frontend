// src/pages/admin/AddProduct.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, ImagePlus } from 'lucide-react';
import { useAdminCategories, useCreateProduct } from '@/hooks/useAdminProducts';

const AddProduct = () => {
  const navigate       = useNavigate();
  const { data: categoriesData } = useAdminCategories();
  const createProduct  = useCreateProduct();
  const categories     = categoriesData ?? [];

  const [form, setForm] = useState({
    name:          '',
    price:         '',
    originalPrice: '',
    category:      '',
    imageUrl:      '',
    description:   '',
    stock:         'in-stock',
    discount:      '',
    isFlashDeal:   false,
    isFeatured:    false,
    isNew:         false,
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category) {
      setError('Name, price and category are required');
      return;
    }

    const formData = new FormData();
    formData.append('name',          form.name);
    formData.append('price',         form.price);
    formData.append('description',   form.description);
    formData.append('category',      form.category);
    formData.append('status',        form.stock);
    formData.append('featured',      String(form.isFeatured));
    formData.append('isFlashDeal',   String(form.isFlashDeal));
    formData.append('isNew',         String(form.isNew));

    if (form.originalPrice) formData.append('originalPrice', form.originalPrice);
    if (form.imageUrl)      formData.append('imageUrl',      form.imageUrl);

    createProduct.mutate(formData, {
      onSuccess: () => navigate('/admin/products'),
      onError:   () => setError('Failed to create product. Please try again.'),
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </Link>

      <form onSubmit={handleSubmit} className="bg-card rounded-card border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-display text-xl text-foreground">Add New Product</h2>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">
              Product Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="e.g. 340ml Whiskey Glass Set (6pcs)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                Price (KSh) *
              </label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="550"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                Original Price
              </label>
              <input
                name="originalPrice"
                type="number"
                value={form.originalPrice}
                onChange={handleChange}
                className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="750"
              />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                Stock Status *
              </label>
              <select
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Select category</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">
              Image URL *
            </label>
            <div className="flex gap-3">
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                className="flex-1 h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="https://..."
              />
              <div className="w-10 h-10 bg-secondary rounded-button flex items-center justify-center border border-border text-muted-foreground flex-shrink-0 overflow-hidden">
                {form.imageUrl ? (
                  <img
                    src={form.imageUrl}
                    alt=""
                    className="w-10 h-10 object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <ImagePlus className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              placeholder="Product description..."
            />
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { name: 'isNew',        label: 'New Arrival' },
              { name: 'isFlashDeal',  label: 'Flash Deal' },
              { name: 'isFeatured',   label: 'Featured / Best Seller' },
            ].map((flag) => (
              <label key={flag.name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={flag.name}
                  checked={(form as any)[flag.name]}
                  onChange={handleChange}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="text-sm font-body text-foreground">{flag.label}</span>
              </label>
            ))}
          </div>

          {error && (
            <p className="text-sm font-body text-destructive">{error}</p>
          )}
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
          <Link
            to="/admin/products"
            className="h-10 px-4 flex items-center rounded-button font-body text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={createProduct.isPending}
            className="h-10 px-6 bg-primary text-primary-foreground rounded-button font-body text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {createProduct.isPending ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;