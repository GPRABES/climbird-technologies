import { motion } from "motion/react";
import { 
  Cpu, 
  ShoppingCart, 
  Layout, 
  TrendingUp, 
  ShieldCheck, 
  Palette,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import servicesData from "../data/services.json";

// Helper to render dynamic icon
const IconComponent = ({ iconName, className }: { iconName: string, className: string }) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.Layout;
  return <Icon className={className} />;
};


export default function Services() {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black text-dark mb-4"
          >
            Premium <span className="text-primary italic">Solutions</span> for Growth
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
            className="text-lg text-dark/60"
          >
            We leverage cutting-edge technology and creative strategies to solve your business's most complex challenges.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-light-bg border border-dark/5 hover-lift glow-primary"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 shadow-sm ${category.color}`}>
                <IconComponent iconName={category.icon} className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-dark mb-6 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-dark/70 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 transition-opacity opacity-40 group-hover:opacity-100" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-dark/5">
                <Link 
                  to={`/services/${category.slug}`}
                  className="text-sm font-bold text-dark/40 group-hover:text-primary flex items-center gap-2 transition-all"
                >
                  Learn More
                  <TrendingUp size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
