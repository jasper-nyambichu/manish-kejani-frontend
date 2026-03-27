// src/pages/admin/EditProduct.tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, ImagePlus, Upload, X } from 'lucide-react';
import { useAdminCategories, useUpdateProduct } from '@/hooks/useAdminProducts';
import adminApi from '@/lib/adminApi';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { toast } from 'sonner';

const EditProduct = () => {
  const { id }                   = useParams<{ id: string }>();
  const navigate                 = useNavigate();
  const { data: categoriesData } = useAdminCategories();
  const updateProduct            = useUpdateProduct();
  const categories               = categoriesData ?? [];
  const fileInputRef             = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [notFound,  setNotFound]  = useState(false);
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews,      setPreviews]      = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<{ url: string; publicId: string }[]>([]);

  const [form, setForm] = useState({
    name:          '',
    price:         '',
    originalPrice: '',
    category:      '',
    imageUrl:      '',
    description:   '',
    status:        'in_stock',
    isFlashDeal:   false,
    isFeatured:    false,
    isNewArrival:  false,
  });

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    adminApi.get(`/api/admin/products/${id}`)
      .then(({ data }: { data: { data: any } }) => {
        const p = data.data;
        setForm({
          name:          p.name ?? '',
          price:         String(p.price ?? ''),
          originalPrice: p.originalPrice ? String(p.originalPrice) : '',
          category:      p.category?._id ?? p.category ?? '',
          imageUrl:      '',
          description:   p.description ?? '',
          status:        p.status ?? 'in_stock',
          isFlashDeal:   p.isFlashDeal ?? false,
          isFeatured:    p.featured ?? false,
          isNewArrival:  p.isNewArrival ?? false,
        });
        setExistingImages(p.images ?? []);
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const valid = files.filter((f) =>
      ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(f.type)
    );

    if (valid.length !== files.length) {
      toast.error('Only jpg, png and webp images are allowed');
      return;
    }

    const combined = [...selectedFiles, ...valid].slice(0, 5);
    setSelectedFiles(combined);
    setPreviews(combined.map((f) => URL.createObjectURL(f)));
  };

  const removeNewFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);
    setPreviews(updated.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim())        return toast.error('Product name is required');
    if (!form.price)              return toast.error('Price is required');
    if (!form.category)           return toast.error('Please select a category');
    if (!form.description.trim()) return toast.error('Product description is required');

    const formData = new FormData();
    formData.append('name',         form.name.trim());
    formData.append('price',        form.price);
    formData.append('description',  form.description.trim());
    formData.append('category',     form.category);
    formData.append('status',       form.status);
    formData.append('featured',     String(form.isFeatured));
    formData.append('isFlashDeal',  String(form.isFlashDeal));
    formData.append('isNewArrival', String(form.isNewArrival));

    if (form.originalPrice) formData.append('originalPrice', form.originalPrice);

    if (uploadMode === 'url' && form.imageUrl.trim()) {
      formData.append('imageUrl', form.imageUrl.trim());
    } else {
      selectedFiles.forEach((file) => formData.append('images', file));
    }

    updateProduct.mutate({ id: id!, formData }, {
      onSuccess: () => {
        toast.success('Product updated successfully');
        navigate('/admin/products');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message ?? 'Failed to update product');
      },
    });
  };

  if (isLoading) return <LoadingSpinner className="py-16" />;

  if (notFound) return (
    <div className="text-center py-16">
      <p className="font-body text-muted-foreground">Product not found</p>
      <Link to="/admin/products" className="text-sm text-primary hover:underline mt-2 inline-block">
        Back to Products
      </Link>
    </div>
  );

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
          <h2 className="font-display text-xl text-foreground">Edit Product</h2>
          <p className="text-sm font-body text-muted-foreground">ID: {id}</p>
        </div>

        <div className="p-6 space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Product Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Price row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Price (KSh) *</label>
              <input name="price" type="number" min="0" value={form.price} onChange={handleChange}
                className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Original Price (KSh)</label>
              <input name="originalPrice" type="number" min="0" value={form.originalPrice} onChange={handleChange}
                className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>

          {/* Category + Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Category *</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">Select category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id ?? cat.id} value={cat._id ?? cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-1.5">Stock Status *</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>
          </div>

          {/* Existing images */}
          {existingImages.length > 0 && (
            <div>
              <label className="block text-sm font-body font-medium text-foreground mb-2">Current Images</label>
              <div className="flex gap-2 flex-wrap">
                {existingImages.map((img, i) => (
                  <img key={i} src={img.url} alt="" className="w-16 h-16 rounded-button object-cover border border-border" />
                ))}
              </div>
            </div>
          )}

          {/* New images */}
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-2">
              {existingImages.length > 0 ? 'Add More Images' : 'Product Image *'}
            </label>
            <div className="flex gap-2 mb-3">
              <button type="button" onClick={() => setUploadMode('file')}
                className={`h-8 px-4 rounded-button font-body text-xs font-medium transition-colors ${uploadMode === 'file' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                Upload File
              </button>
              <button type="button" onClick={() => setUploadMode('url')}
                className={`h-8 px-4 rounded-button font-body text-xs font-medium transition-colors ${uploadMode === 'url' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                Paste URL
              </button>
            </div>

            {uploadMode === 'url' ? (
              <div className="flex gap-3">
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange}
                  className="flex-1 h-10 px-3 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="https://example.com/image.jpg" />
                <div className="w-10 h-10 bg-secondary rounded-button flex items-center justify-center border border-border flex-shrink-0 overflow-hidden">
                  {form.imageUrl ? <img src={form.imageUrl} alt="" className="w-10 h-10 object-cover" /> : <ImagePlus className="w-5 h-5 text-muted-foreground" />}
                </div>
              </div>
            ) : (
              <div>
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" multiple onChange={handleFileChange} className="hidden" />
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-border rounded-card flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors">
                  <Upload className="w-6 h-6" />
                  <span className="font-body text-sm">Click to upload images (max 5, up to 5MB each)</span>
                  <span className="font-body text-xs">JPG, PNG, WebP</span>
                </button>
                {previews.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {previews.map((src, i) => (
                      <div key={i} className="relative w-16 h-16">
                        <img src={src} alt="" className="w-16 h-16 rounded-button object-cover border border-border" />
                        <button type="button" onClick={() => removeNewFile(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-body font-medium text-foreground mb-1.5">Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4}
              className="w-full px-3 py-2 bg-secondary text-foreground rounded-input font-body text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>

          {/* Flags */}
          <div className="flex flex-wrap gap-6">
            {[
              { name: 'isNewArrival', label: 'New Arrival' },
              { name: 'isFlashDeal',  label: 'Flash Deal' },
              { name: 'isFeatured',   label: 'Featured / Best Seller' },
            ].map((flag) => (
              <label key={flag.name} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name={flag.name} checked={(form as any)[flag.name]} onChange={handleChange} className="w-4 h-4 accent-primary rounded" />
                <span className="text-sm font-body text-foreground">{flag.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
          <Link to="/admin/products" className="h-10 px-4 flex items-center rounded-button font-body text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={updateProduct.isPending}
            className="h-10 px-6 bg-primary text-primary-foreground rounded-button font-body text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60">
            <Save className="w-4 h-4" />
            {updateProduct.isPending ? 'Saving...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
