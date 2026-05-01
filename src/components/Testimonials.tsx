import { motion } from "motion/react";
import { Star, Quote, Globe, Zap, Box, Layers, Cpu } from "lucide-react";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "CEO, NexaGrowth",
    content: "Climbird transformed our e-commerce store with their AI integration. Our conversion rates jumped by 40% in just two months.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=33"
  },
  {
    name: "Sarah Chen",
    role: "Marketing Director, Bloom SEO",
    content: "The automation workflows they built saved our team 20+ hours a week. Professional, fast, and truly experts in their field.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=47"
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder, TechVault",
    content: "From logo design to full-stack development, Climbird exceeded our expectations. They are our go-to digital partner.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=12"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black text-dark mb-4"
          >
            Client <span className="text-primary italic">Success</span> Stories
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-dark/60"
          >
            Don't just take our word for it—hear from the businesses we've helped grow.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.9, rotate: index % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-[32px] relative group hover:bg-white transition-all duration-500 shadow-lg hover:shadow-2xl"
            >
              <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                <Quote size={48} />
              </div>
              
              <div className="flex items-center gap-1 mb-6 text-primary">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-dark/80 text-lg leading-relaxed mb-8 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-dark/5 pt-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-dark">{testimonial.name}</h4>
                  <p className="text-xs text-dark/50">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Client Logos Placeholder */}
        <div className="mt-24 pt-20 border-t border-dark/5">
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-dark/30 mb-12">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              { name: "GlobalTech", icon: <Globe size={28} className="text-blue-500" /> },
              { name: "NexGen", icon: <Zap size={28} className="text-yellow-500" /> },
              { name: "BlockForge", icon: <Box size={28} className="text-indigo-500" /> },
              { name: "StackFlow", icon: <Layers size={28} className="text-purple-500" /> },
              { name: "Synapse", icon: <Cpu size={28} className="text-emerald-500" /> }
            ].map((company) => (
              <div key={company.name} className="flex items-center gap-3 group cursor-pointer hover:opacity-100 transition-opacity">
                {company.icon}
                <span className="text-xl font-display font-bold tracking-tight text-dark">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
