import { Link } from "react-router-dom";
import { Mail, Facebook, Twitter, Instagram, Youtube, Apple, Play } from "lucide-react";
import logo from "@/assets/logo.png";
import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@/types/category.types";

const Footer = () => {
  const { data: categories = [], isLoading } = useCategories();
  const topCategories = categories.slice(0, 6);

  return (
    <footer className="bg-surface text-surface-foreground font-body mt-8">
      {/* ── Tier 1: Top Bar (Newsletter & Apps) ── */}
      <div className="border-b border-surface-foreground/10 px-4 py-8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Logo & Newsletter Text */}
          <div className="lg:col-span-3">
            <img src={logo} alt="Manish Kejani Logo" className="h-[40px] mb-4 brightness-200" />
            <div className="mb-2">
              <h4 className="text-[14px] font-bold uppercase mb-1">New to Manish Kejani?</h4>
              <p className="text-[12px] opacity-80">
                Subscribe to our newsletter to get updates on our latest offers!
              </p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-6 flex items-start gap-2 pt-2 lg:pt-14">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-3.5 w-[18px] h-[18px] text-muted-foreground" />
              <input 
                type="email" 
                placeholder="Enter E-mail Address" 
                className="w-full bg-card text-foreground text-[13px] rounded-[4px] pl-10 pr-4 py-3 outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {/* Unified Subscribe Button matching Jumia visual scaling */}
            <div className="flex gap-2">
              <button className="bg-transparent border border-surface-foreground text-surface-foreground font-bold text-[13px] uppercase px-6 py-3 rounded-[4px] hover:text-primary hover:border-primary transition-colors flex items-center justify-center">
                Subscribe
              </button>
            </div>
          </div>

          {/* App Download */}
          <div className="lg:col-span-3 pt-2 lg:pt-12">
            <div className="flex items-center gap-4">
              <div className="bg-surface-foreground/10 rounded p-2 hidden sm:block">
                <div className="w-10 h-10 border-2 border-dashed border-surface-foreground/40"></div>
              </div>
              <div>
                <h4 className="text-[14px] font-bold uppercase mb-1">Download Free App</h4>
                <p className="text-[12px] opacity-80 mb-2">Get access to exclusive offers!</p>
                <div className="flex items-center gap-2">
                  <a href="#" className="flex items-center gap-2 bg-black text-white border border-surface-foreground/20 rounded-[4px] px-2 py-1.5 hover:bg-surface-foreground/10 transition-colors">
                    <Apple className="w-5 h-5" />
                    <div className="leading-none">
                      <span className="block text-[8px] opacity-80">Download on the</span>
                      <span className="block text-[11px] font-bold">App Store</span>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-2 bg-black text-white border border-surface-foreground/20 rounded-[4px] px-2 py-1.5 hover:bg-surface-foreground/10 transition-colors">
                    <Play className="w-4 h-4 ml-1" />
                    <div className="leading-none ml-1">
                      <span className="block text-[8px] opacity-80">GET IT ON</span>
                      <span className="block text-[11px] font-bold">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Tier 2: 4-Column Grid Links ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-[12px]">
          
          {/* Column 1 */}
          <div>
            <h4 className="font-bold uppercase mb-3 text-[12px]">Let Us Help You</h4>
            <ul className="space-y-2 opacity-80">
              <li><Link to="/help" className="hover:underline">Help Center</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/how-to-buy" className="hover:underline">How to buy on Manish</Link></li>
              <li><Link to="/shipping" className="hover:underline">Shipping & Delivery</Link></li>
              <li><Link to="/return-policy" className="hover:underline">Return Policy</Link></li>
              <li><Link to="/dispute" className="hover:underline">Dispute Resolution Policy</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold uppercase mb-3 text-[12px]">About Manish Kejani</h4>
            <ul className="space-y-2 opacity-80">
              <li><Link to="/about" className="hover:underline">About us</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms and Conditions</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Notice</Link></li>
              <li><Link to="/cookie" className="hover:underline">Cookie Notice</Link></li>
              <li><Link to="/flash-sales" className="hover:underline">Flash Sales</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold uppercase mb-3 text-[12px]">Top Categories</h4>
            <ul className="space-y-2 opacity-80">
              {isLoading ? (
                <li className="text-xs opacity-60">Loading categories…</li>
              ) : topCategories.length === 0 ? (
                <li className="text-xs opacity-60">Categories coming soon</li>
              ) : (
                topCategories.map((cat: Category) => (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.slug}`} className="hover:underline">{cat.name}</Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold uppercase mb-3 text-[12px]">Our Locations</h4>
            <ul className="space-y-2 opacity-80">
              <li><span className="hover:underline cursor-pointer">Kisii</span></li>
              <li><span className="hover:underline cursor-pointer">Nairobi</span></li>
              <li><span className="hover:underline cursor-pointer">Kisumu</span></li>
              <li><span className="hover:underline cursor-pointer">Nakuru</span></li>
              <li><span className="hover:underline cursor-pointer">Eldoret</span></li>
              <li><span className="hover:underline cursor-pointer">Mombasa</span></li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Tier 3: Bottom Trust Row ── */}
      <div className="container mx-auto px-4 py-6 border-t border-surface-foreground/10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Socials */}
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-bold uppercase">Join Us On</span>
          <div className="flex gap-4 opacity-80">
            <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-[18px] h-[18px]" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-[18px] h-[18px]" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-[18px] h-[18px]" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Youtube className="w-[18px] h-[18px]" /></a>
          </div>
        </div>

        {/* Payments Mockup */}
        <div className="flex items-center gap-4">
          <span className="text-[13px] font-bold uppercase">Payment Methods</span>
          <div className="flex gap-2 items-center text-[10px] font-bold uppercase bg-surface-foreground/10 border border-surface-foreground/20 px-2 py-1 rounded">
            MPESA
          </div>
          <div className="flex gap-2 items-center text-[10px] font-bold uppercase bg-surface-foreground/10 border border-surface-foreground/20 px-2 py-1 rounded">
            VISA
          </div>
          <div className="flex gap-2 items-center text-[10px] font-bold uppercase bg-surface-foreground/10 border border-surface-foreground/20 px-2 py-1 rounded">
            MASTERCARD
          </div>
          <div className="flex gap-2 items-center text-[10px] font-bold uppercase bg-surface-foreground/10 border border-surface-foreground/20 px-2 py-1 rounded">
            CASH
          </div>
        </div>

      </div>

      {/* Extreme Bottom Copyright */}
      <div className="bg-black/20 text-center text-[11px] opacity-60 py-3 border-t border-black/20">
        © {new Date().getFullYear()} Manish Kejani Households & Décor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
