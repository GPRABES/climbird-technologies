import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  ArrowLeft, CheckCircle2, ArrowRight, Zap, Shield, 
  Target, BarChart, Globe, Sparkles 
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import servicesData from '../data/services.json';

// Helper to render dynamic icon
const IconComponent = ({ iconName, className }: { iconName: string, className: string }) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.Layout;
  return <Icon className={className} />;
};

const serviceImages: Record<string, string> = {
  'ai-automation': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1200',
  'e-commerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
  'web-design-dev': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
  'digital-marketing': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=1200',
  'technical-support': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
  'branding-design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const service = servicesData.find(s => s.slug === slug);
  
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const paragraphs = service.content.split('\n\n').filter(p => p.trim());
  const imgUrl = serviceImages[service.slug];

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Helmet>
        <title>{service.title} | Climbird Technologies</title>
        <meta name="description" content={service.excerpt} />
      </Helmet>

      {/* ── Premium Hero ── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0D0D0D] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={imgUrl} 
            alt={service.title} 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/80 via-[#0D0D0D]/50 to-[#0D0D0D]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <Link to="/services" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
                <ArrowLeft size={16} /> Services
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-primary font-bold text-sm tracking-widest uppercase">{service.title}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.95] tracking-tight mb-8"
            >
              {service.title.split(' & ').map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-primary italic">&</span>}
                  {part}
                  {i === 0 && <br />}
                </React.Fragment>
              ))}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl"
            >
              {service.excerpt}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Content Strategy ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:items-start">
            
            {/* Left side: Detailed Content */}
            <div className="lg:col-span-7">
              <div className="prose prose-2xl prose-dark max-w-none">
                {paragraphs.map((p, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-xl text-dark/70 leading-relaxed mb-8"
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Highlights/Features Grid */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 p-6 bg-light-bg rounded-2xl border border-dark/5"
                  >
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-lg font-bold text-dark">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right side: Sticky Conversion Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#F8F7F4] p-10 md:p-12 rounded-[40px] border border-dark/5 shadow-sm"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-8">
                   <IconComponent iconName={service.icon} className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-black text-dark mb-4 leading-tight">Ready to start?</h3>
                <p className="text-dark/60 mb-8 leading-relaxed">
                  Every engagement is custom-built for your business. Book a free consultation to see how we can help you grow.
                </p>
                
                <div className="space-y-4 mb-10">
                  {[
                    { icon: <Zap size={18} />, text: "Fast Turnaround" },
                    { icon: <Shield size={18} />, text: "Guaranteed Performance" },
                    { icon: <Sparkles size={18} />, text: "Premium Quality" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-dark/80 font-medium">
                      <div className="text-primary">{item.icon}</div>
                      {item.text}
                    </div>
                  ))}
                </div>

                <Link 
                  to="/contact"
                  className="w-full flex items-center justify-center gap-3 bg-dark text-white px-8 py-5 rounded-2xl font-black text-lg hover:bg-primary transition-all shadow-xl hover:shadow-2xl active:scale-95"
                >
                  Book Free Consultation
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Results Oriented Section ── */}
      <section className="py-24 bg-[#0D0D0D] text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight">The Climbird <span className="text-primary">Impact</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <Target className="mx-auto mb-4 text-primary" size={40} />, val: "100%", label: "Accuracy" },
                { icon: <BarChart className="mx-auto mb-4 text-primary" size={40} />, val: "3.5x", label: "Avg. ROI" },
                { icon: <Globe className="mx-auto mb-4 text-primary" size={40} />, val: "24/7", label: "Availability" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  {stat.icon}
                  <div className="text-5xl font-black">{stat.val}</div>
                  <div className="text-white/40 font-bold tracking-widest uppercase text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black text-dark mb-8 leading-tight">
            Stop guessing. <br />
            Start <span className="text-primary italic">Scaling.</span>
          </h2>
          <p className="text-xl text-dark/50 mb-12 leading-relaxed">
            Whether you need to automate your support or overhaul your digital presence, we're the team that delivers.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-primary/30"
          >
            Work With Us
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </main>
  );
}
