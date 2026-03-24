export const ROUTES = {
  HOME: "/",
  PRODUCT: "/product/:id",
  CATEGORY: "/category/:slug",
  SEARCH: "/search",
  WISHLIST: "/wishlist",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  FORGOT_PASSWORD: "/forgot-password",

  // Admin
  ADMIN_LOGIN: "/admin/login",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_ADD_PRODUCT: "/admin/products/add",
  ADMIN_EDIT_PRODUCT: "/admin/products/edit/:id",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_PROMOTIONS: "/admin/promotions",
  ADMIN_CUSTOMERS: "/admin/customers",
} as const;
