# Project Architecture Skeleton

This document describes the frontend architecture of the `manish-kejani-frontend` workspace.

```
manish-kejani-frontend/
|-- src/
|   |-- main.tsx                     # application entry point
|   |-- App.tsx                      # root app shell and routes
|   |-- index.css                    # global styles
|   |-- App.css                      # app styles
|   |
|   |-- components/
|   |   |-- layout/
|   |   |   |-- Navbar.tsx
|   |   |   |-- Footer.tsx
|   |   |   `-- AdminLayout.tsx
|   |   |
|   |   |-- sections/
|   |   |   |-- HeroBanner.tsx
|   |   |   |-- FlashDeals.tsx
|   |   |   |-- BestSellers.tsx
|   |   |   |-- NewArrivals.tsx
|   |   |   `-- PromoBanner.tsx
|   |   |
|   |   |-- product/
|   |   |   |-- ProductCard.tsx
|   |   |   |-- ReviewForm.tsx
|   |   |   `-- ReviewList.tsx
|   |   |
|   |   `-- common/
|   |       |-- LoadingSpinner.tsx
|   |       |-- ScrollToTop.tsx
|   |       |-- DiscountBadge.tsx
|   |       |-- StockBadge.tsx
|   |       `-- TrustBadges.tsx
|   |
|   |-- components/ui/
|   |   |-- button.tsx
|   |   |-- input.tsx
|   |   |-- dropdown-menu.tsx
|   |   |-- dialog.tsx
|   |   |-- toast.tsx
|   |   `-- tabs.tsx
|   |
|   |-- constants/
|   |   |-- categories.ts
|   |   `-- routes.ts
|   |
|   |-- data/
|   |   `-- products.ts
|   |
|   |-- hooks/
|   |   |-- useAuth.ts
|   |   |-- useCart.ts
|   |   |-- useCategories.ts
|   |   |-- useProduct.ts
|   |   |-- useWishlist.ts
|   |   `-- useReviews.ts
|   |
|   |-- lib/
|   |   |-- api.ts
|   |   |-- adminApi.ts
|   |   `-- utils.ts
|   |
|   |-- pages/
|   |   |-- public/
|   |   |   |-- Index.tsx
|   |   |   |-- CartPage.tsx
|   |   |   |-- LoginPage.tsx
|   |   |   `-- CategoryPage.tsx
|   |   `-- admin/
|   |       |-- Dashboard.tsx
|   |       |-- Products.tsx
|   |       |-- AddProduct.tsx
|   |       `-- AdminLogin.tsx
|   |
|   `-- types/
|       |-- product.types.ts
|       |-- category.types.ts
|       |-- promotion.types.ts
|       `-- user.types.ts
|
|-- store/
|   |-- authStore.ts
|   |-- cartStore.ts
|   |-- wishlistStore.ts
|   `-- adminStore.ts
|
|-- public/
|   `-- assets/...
|-- package.json
|-- vite.config.ts
|-- tsconfig.json
|-- tsconfig.app.json
|-- tsconfig.node.json
|-- eslint.config.js
|-- vercel.json
\
```

## Architecture Overview

- `src/components/` contains reusable UI building blocks.
- `src/pages/` contains route-level views and page layouts.
- `src/hooks/` contains custom hooks for app behavior and data logic.
- `src/store/` contains global state stores.
- `src/lib/` contains API wrappers and utility helpers.
- `src/types/` contains TypeScript domain models.
- `src/constants/` contains static app constants and route definitions.
- `src/data/` contains mock or static data used by the frontend.

## Layered Responsibilities

- Presentation: `components/`, `components/ui/`, `components/sections/`
- Page orchestration: `pages/`
- State and business logic: `hooks/`, `store/`
- Backend integration: `lib/`
- Types and contracts: `types/`

## Notes

This file is a skeleton map for the current frontend workspace and is formatted with line symbols for easy readability.
