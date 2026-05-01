import { motion } from "motion/react";
import { ArrowRight, ChevronRight, Rocket } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -z-10 opacity-20">
        <div className="w-[500px] h-[500px] bg-primary rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 opacity-10">
        <div className="w-[400px] h-[400px] bg-primary rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6 border border-primary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Digital Growth Partner
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black leading-[1.1] mb-6 text-dark">
              Build. <span className="text-primary italic">Automate.</span> <br /> 
              Grow.
            </h1>
            
            <p className="text-lg md:text-xl text-dark/70 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We design high-performance websites, AI systems, and marketing strategies that scale your business in the digital age.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="w-full sm:w-auto bg-gradient-primary text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Get Free Consultation
                <ArrowRight size={20} />
              </a>
              <a
                href="#services"
                className="w-full sm:w-auto glass text-dark px-8 py-4 rounded-xl font-bold hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                View Services
                <ChevronRight size={20} />
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 opacity-60">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200">
                    <img 
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      alt="User" 
                      className="w-full h-full rounded-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                  500+
                </div>
              </div>
              <p className="text-sm font-medium">Trusted by global businesses</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="flex-1 relative"
          >
            <div className="relative z-10 w-full max-w-lg mx-auto">
              {/* Dynamic Gradient Circle behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-transparent rounded-full animate-pulse blur-3xl -z-10" />
              
              <img
                src="/src/assets/images/hero_illustration_1777619673825.png"
                alt="Climbird Growth Illustration"
                className="w-full h-auto drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Cards for extra depth */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 glass p-4 rounded-2xl shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-dark/50">Growth</p>
                    <p className="text-sm font-black">+240%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-10 -right-6 glass p-4 rounded-2xl shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <ArrowRight size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-dark/50">Automation</p>
                    <p className="text-sm font-black text-dark">Propelled</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
