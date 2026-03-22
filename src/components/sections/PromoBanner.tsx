import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-card overflow-hidden"
          style={{ minHeight: 200 }}
        >
          <img
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop"
            alt="Promo banner"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/60 to-transparent" />
          <div className="relative z-10 flex flex-col justify-center h-full min-h-[200px] px-8 md:px-12 py-10">
            <h2 className="font-display text-2xl md:text-4xl text-card max-w-md leading-tight">
              Complete Your Kitchen Set Today
            </h2>
            <p className="mt-2 text-sm font-body text-card/80 max-w-sm">
              Order glassware, plates, and cutlery bundles via WhatsApp and save more.
            </p>
            <Link
              to="/category/glasses-drinkware"
              className="inline-block mt-4 w-fit px-6 py-2.5 bg-primary text-primary-foreground rounded-button font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Browse Collection
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;
