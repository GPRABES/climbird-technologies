import { motion } from "motion/react";
import { Zap, Shield, Users, Clock, Lightbulb, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Results-Driven Approach",
    desc: "We focus on real metrics and business outcomes, not just vanity numbers."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Fast Turnaround",
    desc: "Efficient workflows ensure your projects launch on time, every time."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Full-Stack Expertise",
    desc: "Our team masters everything from backend AI to frontend high-end design."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Scalable Solutions",
    desc: "We build systems that grow with you, from startup to enterprise level."
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Ongoing Support",
    desc: "We don't just launch and leave. We partner with you for continuous optimization."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Reliable",
    desc: "Bank-grade security and 99.9% uptime for all your digital assets."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-black text-dark mb-6"
            >
              Why Businesses <br /> <span className="text-primary italic">Trust</span> Climbird
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-dark/60 mb-10"
            >
              We combine technical prowess with creative strategic thinking to deliver digital products that stand out and perform.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-dark mb-1">{feature.title}</h4>
                    <p className="text-sm text-dark/60 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-primary/5 rounded-[40px] -rotate-3 -z-10" />
            <div className="glass p-4 rounded-[40px] shadow-2xl relative overflow-hidden">
               {/* Team/Collaboration Vector Placeholder - using an abstract pattern/illustration */}
               <div className="aspect-video bg-gradient-to-br from-primary/10 to-blue-50 rounded-[32px] flex items-center justify-center overflow-hidden">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-10"
                  >
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute top-1/2 left-1/2 w-full h-1 bg-primary"
                        style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}
                      />
                    ))}
                  </motion.div>
                  <div className="relative text-center p-8">
                     <Users size={80} className="text-primary mx-auto mb-6 opacity-80" />
                     <h3 className="text-2xl font-black text-dark mb-2">United by Innovation</h3>
                     <p className="text-dark/60 text-sm max-w-xs mx-auto">Our team of experts is dedicated to your success, working seamlessly across all digital domains.</p>
                  </div>
               </div>
               
               {/* Growth overlay */}
               <div className="absolute bottom-10 right-10 glass p-6 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                    <BarChart3 />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-dark/50">Engagement Rate</p>
                    <p className="text-xl font-black text-dark">+185%</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
