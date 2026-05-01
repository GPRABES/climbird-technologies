import { motion } from "motion/react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    desc: "We analyze your business goals, target audience, and current ecosystem to identify opportunities.",
    icon: <Search className="w-8 h-8" />
  },
  {
    number: "02",
    title: "Design",
    desc: "We craft stunning UI/UX and strategic blueprints tailored to your brand identity and growth needs.",
    icon: <PenTool className="w-8 h-8" />
  },
  {
    number: "03",
    title: "Develop",
    desc: "Our engineers build your solution using high-performance technologies and AI-driven automation.",
    icon: <Code2 className="w-8 h-8" />
  },
  {
    number: "04",
    title: "Optimize",
    desc: "We launch, monitor, and continuously refine performance to ensure maximum ROI and scalability.",
    icon: <Rocket className="w-8 h-8" />
  }
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-light-bg">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black text-dark mb-4"
          >
            How We <span className="text-primary italic">Elevate</span> Your Brand
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-dark/60"
          >
            A streamlined, transparent process designed for speed and excellence.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-dark/5" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-primary shadow-xl border-4 border-light-bg group-hover:scale-110 group-hover:border-primary/20 transition-all duration-500">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-primary text-white flex items-center justify-center text-xs font-black shadow-lg">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-display font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-dark/50 leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>
                
                {/* Visual Arrow for mobile - pointing down */}
                <div className="lg:hidden mt-8 text-primary/20">
                   {index < steps.length - 1 && (
                     <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                       <div className="w-0.5 h-12 bg-primary/20 mx-auto" />
                     </motion.div>
                   )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
