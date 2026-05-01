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

const serviceCategories = [
  {
    title: "AI & Automation",
    icon: <Cpu className="w-8 h-8" />,
    items: [
      "AI Customer Support Agents",
      "Dynamic Merchandising Automation",
      "Visual & Voice Search Integration",
      "Autonomous Workflow Design",
      "CRM & ERP AI Integration"
    ],
    color: "bg-purple-50 text-purple-600 border-purple-100"
  },
  {
    title: "e-Commerce",
    icon: <ShoppingCart className="w-8 h-8" />,
    items: [
      "Shopify Development",
      "WooCommerce (WordPress)",
      "Wix e-Commerce Solutions",
      "Inventory Management Sync",
      "Conversion Rate Optimization"
    ],
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    title: "Web Design & Dev",
    icon: <Layout className="w-8 h-8" />,
    items: [
      "WordPress Web Design",
      "Wix & Squarespace Design",
      "Custom Web Development",
      "UI/UX Prototyping",
      "Technical SEO Optimization"
    ],
    color: "bg-green-50 text-green-600 border-green-100"
  },
  {
    title: "Digital Marketing",
    icon: <TrendingUp className="w-8 h-8" />,
    items: [
      "SEO & Local SEO Strategy",
      "Social Media Management",
      "Email Marketing Automation",
      "Content Creation Strategy",
      "GBM Optimization"
    ],
    color: "bg-orange-50 text-orange-600 border-orange-100"
  },
  {
    title: "Technical Support",
    icon: <ShieldCheck className="w-8 h-8" />,
    items: [
      "Domain & DNS Management",
      "Email Setup & Migration",
      "CRM Setup & Support",
      "Google Profile Recovery",
      "24/7 technical assistance"
    ],
    color: "bg-red-50 text-red-600 border-red-100"
  },
  {
    title: "Branding & Design",
    icon: <Palette className="w-8 h-8" />,
    items: [
      "Logo & Identity Systems",
      "Brand Style Guidelines",
      "Letterhead & Envelope Design",
      "Business Card Creation",
      "Print Materials & Signage"
    ],
    color: "bg-pink-50 text-pink-600 border-pink-100"
  }
];

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
          {serviceCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-light-bg border border-dark/5 hover-lift glow-primary"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-transform group-hover:scale-110 shadow-sm ${category.color}`}>
                {category.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-dark mb-6 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-dark/70 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 transition-opacity opacity-40 group-hover:opacity-100" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-dark/5">
                <a 
                  href="#contact" 
                  className="text-sm font-bold text-dark/40 group-hover:text-primary flex items-center gap-2 transition-all"
                >
                  Learn More
                  <TrendingUp size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
