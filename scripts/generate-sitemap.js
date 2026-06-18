// scripts/generate-sitemap.js
// Runs BEFORE `vite build` and writes a real sitemap.xml into /public
// so it gets copied into the final deployed output automatically.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = "https://www.manishhouseholds.co.ke"; // must match your canonical (www) domain
const API_URL = process.env.VITE_API_URL || "http://localhost:5000";

// Static, public, indexable pages only.
// Do NOT include /login, /register, /profile, /wishlist, /cart, /admin/* — these are
// private/user-specific/transactional and should never be in a sitemap.
const staticRoutes = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/search", priority: 0.5, changefreq: "weekly" },

  // Commercial collection pages — these change often as stock/deals rotate
  { path: "/flash-sales", priority: 0.8, changefreq: "daily" },
  { path: "/best-sellers", priority: 0.8, changefreq: "daily" },
  { path: "/new-arrivals", priority: 0.8, changefreq: "daily" },

  // Trust / info pages — low priority but still worth indexing
  { path: "/about", priority: 0.5, changefreq: "monthly" },
  { path: "/contact", priority: 0.5, changefreq: "monthly" },
];

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function getProducts() {
  // Products are paginated (per useProducts.ts), so we must loop through
  // every page or we'd silently miss products once you have more than one page.
  const limit = 100;
  let allProducts = [];

  try {
    const first = await fetchJSON(`${API_URL}/api/v1/products?page=1&limit=${limit}`);
    const { products, pagination } = first.data;
    allProducts = [...products];

    const totalPages = pagination?.pages || 1;
    for (let page = 2; page <= totalPages; page++) {
      const next = await fetchJSON(`${API_URL}/api/v1/products?page=${page}&limit=${limit}`);
      allProducts = [...allProducts, ...next.data.products];
    }

    return allProducts;
  } catch (err) {
    console.warn("⚠️  Could not fetch products for sitemap:", err.message);
    return allProducts; // return whatever we managed to collect before the failure
  }
}

async function getCategories() {
  try {
    const data = await fetchJSON(`${API_URL}/api/v1/categories`);
    return data.data || [];
  } catch (err) {
    console.warn("⚠️  Could not fetch categories for sitemap:", err.message);
    return [];
  }
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];
  const urls = [];

  // Static pages
  for (const route of staticRoutes) {
    urls.push(urlEntry(`${SITE_URL}${route.path}`, today, route.changefreq, route.priority));
  }

  // Category pages — confirmed via category.types.ts: slug is the real field
  const categories = await getCategories();
  for (const cat of categories) {
    const slug = cat.slug;
    if (!slug) continue;
    urls.push(urlEntry(`${SITE_URL}/category/${slug}`, today, "weekly", 0.8));
  }

  // Product pages — confirmed via product.types.ts:
  // `id` is a virtual from the Mongo toJSON transform, `_id` is the raw fallback
  const products = await getProducts();
  for (const product of products) {
    const id = product.id || product._id;
    if (!id) continue;
    const lastmod = product.updatedAt
      ? new Date(product.updatedAt).toISOString().split("T")[0]
      : today;
    urls.push(urlEntry(`${SITE_URL}/product/${id}`, lastmod, "weekly", 0.9));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  const outputPath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(outputPath, xml, "utf-8");
  console.log(`✅ Sitemap written to ${outputPath} with ${urls.length} URLs`);
}

generateSitemap().catch((err) => {
  console.error("❌ Sitemap generation failed:", err);
  // Don't fail the whole build over this — log it and move on
  process.exit(0);
});