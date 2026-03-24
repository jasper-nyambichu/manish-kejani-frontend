import { MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-surface text-surface-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img src={logo} alt="Manish Kejani" className="h-16 w-auto mb-4 brightness-200" />
            <p className="text-sm font-body opacity-80 leading-relaxed">
              Quality Kitchenware, Cozy Beddings, Beautiful Spaces. Your trusted home goods store in Kisii, Kenya.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} className="text-sm font-body opacity-70 hover:opacity-100 hover:text-primary transition-all">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-primary transition-all">Home</Link></li>
              <li><Link to="/search" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-primary transition-all">Search Products</Link></li>
              <li><Link to="/wishlist" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-primary transition-all">Wishlist</Link></li>
              <li><Link to="/login" className="text-sm font-body opacity-70 hover:opacity-100 hover:text-primary transition-all">My Account</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">Visit Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm font-body opacity-80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Market Plaza Room 214, Kisii Town
              </li>
              <li className="flex items-center gap-2 text-sm font-body opacity-80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                0719 769 263 / 0731 355 217
              </li>
              <li className="flex items-center gap-2 text-sm font-body opacity-80">
                <Clock className="w-4 h-4 flex-shrink-0" />
                Mon–Sat, 8:30am–6:00pm
              </li>
            </ul>
            <a
              href="https://wa.me/254719769263"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-button text-sm font-body font-medium hover:opacity-90 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              Order via WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-surface-foreground/10 mt-10 pt-6 text-center">
          <p className="text-xs font-body opacity-50">
            © {new Date().getFullYear()} Manish Kejani Households & Décor. All rights reserved. Kisii, Kenya.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
