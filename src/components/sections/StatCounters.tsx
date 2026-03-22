import { motion } from "framer-motion";
import { Package, Users, Star, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Package, value: "500+", label: "Products", color: "text-primary" },
  { icon: Users, value: "2,000+", label: "Happy Customers", color: "text-success" },
  { icon: Star, value: "4.8", label: "Average Rating", color: "text-warning" },
  { icon: ShieldCheck, value: "100%", label: "Quality Guaranteed", color: "text-info" },
];

const StatCounters = () => {
  return (
    <section className="py-10 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <p className="font-display text-2xl md:text-3xl text-foreground">{stat.value}</p>
              <p className="text-sm font-body text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatCounters;
