export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  stock: "in-stock" | "low-stock" | "out-of-stock";
  discount?: number;
  isFlashDeal?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
}

export const categories: Category[] = [
  { id: "1", name: "Glasses & Drinkware", slug: "glasses-drinkware", icon: "🥃", productCount: 24 },
  { id: "2", name: "Cups & Mugs", slug: "cups-mugs", icon: "☕", productCount: 18 },
  { id: "3", name: "Wine Glasses", slug: "wine-glasses", icon: "🍷", productCount: 12 },
  { id: "4", name: "Plates & Bowls", slug: "plates-bowls", icon: "🍽️", productCount: 15 },
  { id: "5", name: "Cutlery & Utensils", slug: "cutlery-utensils", icon: "🍴", productCount: 20 },
  { id: "6", name: "Cookware & Appliances", slug: "cookware-appliances", icon: "🍳", productCount: 10 },
  { id: "7", name: "Bedding", slug: "bedding", icon: "🛏️", productCount: 14 },
  { id: "8", name: "Pillows & Towels", slug: "pillows-towels", icon: "🛁", productCount: 8 },
  { id: "9", name: "Home Décor", slug: "home-decor", icon: "🏠", productCount: 16 },
  { id: "10", name: "Bathroom Accessories", slug: "bathroom-accessories", icon: "🚿", productCount: 9 },
  { id: "11", name: "Cleaning Supplies", slug: "cleaning-supplies", icon: "🧹", productCount: 6 },
];

export const products: Product[] = [
  // Flash deals
  { id: "1", name: "340ml Whiskey Glass Set (6pcs)", price: 550, originalPrice: 750, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop", category: "Glasses & Drinkware", rating: 4.5, reviews: 23, stock: "in-stock", discount: 27, isFlashDeal: true },
  { id: "2", name: "White Embossed Ceramic Cup Set", price: 560, originalPrice: 800, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop", category: "Cups & Mugs", rating: 4.8, reviews: 45, stock: "in-stock", discount: 30, isFlashDeal: true },
  { id: "3", name: "190ml Crystal Wine Glass (6pcs)", price: 600, originalPrice: 850, image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=400&h=400&fit=crop", category: "Wine Glasses", rating: 4.7, reviews: 31, stock: "low-stock", discount: 29, isFlashDeal: true },
  { id: "4", name: "White Binded Duvet Set", price: 2900, originalPrice: 3800, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop", category: "Bedding", rating: 4.9, reviews: 67, stock: "in-stock", discount: 24, isFlashDeal: true },
  { id: "5", name: "11 Inch Square Plates (6pcs)", price: 1150, originalPrice: 1500, image: "https://images.unsplash.com/photo-1603199506016-5f36e6d40b28?w=400&h=400&fit=crop", category: "Plates & Bowls", rating: 4.3, reviews: 19, stock: "in-stock", discount: 23, isFlashDeal: true },
  { id: "6", name: "Stainless Steel Cutlery Set", price: 1200, originalPrice: 1600, image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&h=400&fit=crop", category: "Cutlery & Utensils", rating: 4.6, reviews: 38, stock: "in-stock", discount: 25, isFlashDeal: true },

  // Best sellers
  { id: "7", name: "Golden Ceramic Cup Set (6pcs)", price: 750, image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&h=400&fit=crop", category: "Cups & Mugs", rating: 4.8, reviews: 89, stock: "in-stock", isFeatured: true },
  { id: "8", name: "Compressed Pillow Pair (750gms)", price: 1000, image: "https://images.unsplash.com/photo-1592789705501-f9ae4278a9e9?w=400&h=400&fit=crop", category: "Pillows & Towels", rating: 4.7, reviews: 56, stock: "in-stock", isFeatured: true },
  { id: "9", name: "18pcs Crystal Clear Glass Soup Set", price: 1350, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop", category: "Glasses & Drinkware", rating: 4.5, reviews: 42, stock: "low-stock", isFeatured: true },
  { id: "10", name: "Bath Towel Set (70x140cm)", price: 1400, image: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=400&h=400&fit=crop", category: "Pillows & Towels", rating: 4.6, reviews: 34, stock: "in-stock", isFeatured: true },
  { id: "11", name: "Mattress Protector 5x6", price: 1750, image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=400&h=400&fit=crop", category: "Bedding", rating: 4.4, reviews: 28, stock: "in-stock", isFeatured: true },
  { id: "12", name: "Commercial Blender", price: 10000, image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop", category: "Cookware & Appliances", rating: 4.9, reviews: 15, stock: "in-stock", isFeatured: true },

  // New arrivals
  { id: "13", name: "Stylish Ceramic Mugs (6pcs)", price: 600, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop", category: "Cups & Mugs", rating: 4.3, reviews: 8, stock: "in-stock", isNew: true },
  { id: "14", name: "Chafing Dish Set", price: 6000, image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop", category: "Cookware & Appliances", rating: 4.7, reviews: 5, stock: "in-stock", isNew: true },
  { id: "15", name: "White Stripped Duvet Cover 5x7", price: 1700, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop", category: "Bedding", rating: 4.5, reviews: 12, stock: "in-stock", isNew: true },
  { id: "16", name: "Insulated Tea Urn (10L)", price: 6500, image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop", category: "Cookware & Appliances", rating: 4.6, reviews: 7, stock: "low-stock", isNew: true },
  { id: "17", name: "Melamine Fish Plate", price: 170, image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=400&fit=crop", category: "Plates & Bowls", rating: 4.2, reviews: 15, stock: "in-stock", isNew: true },
  { id: "18", name: "Salt & Pepper Stainless Set", price: 150, image: "https://images.unsplash.com/photo-1526434426615-1abe81efcb0b?w=400&h=400&fit=crop", category: "Cutlery & Utensils", rating: 4.4, reviews: 22, stock: "in-stock", isNew: true },
  { id: "19", name: "360ml Crystal Glass (6pcs)", price: 500, image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=400&h=400&fit=crop", category: "Glasses & Drinkware", rating: 4.3, reviews: 18, stock: "in-stock", isNew: true },
  { id: "20", name: "6pcs Glass Opal Mugs", price: 1100, image: "https://images.unsplash.com/photo-1517256064527-9d83e131453b?w=400&h=400&fit=crop", category: "Cups & Mugs", rating: 4.5, reviews: 9, stock: "in-stock", isNew: true },
];
