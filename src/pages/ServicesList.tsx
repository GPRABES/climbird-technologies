import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUpRight, Cpu, ShoppingCart, Layout, TrendingUp, ShieldCheck, Palette, CheckCircle2 } from 'lucide-react';
import servicesData from '../data/services.json';

// Map icon names to components
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Cpu, ShoppingCart, Layout, TrendingUp, ShieldCheck, Palette,
};

// Service imagery from Unsplash (free, relevant)
const serviceImages: Record<string, string> = {
  'ai-automation': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=900',
  'e-commerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=900',
  'web-design-dev': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=900',
  'digital-marketing': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=900',
  'technical-support': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=900',
  'branding-design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=900',
};



export default function ServicesList() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <Helmet>
        <title>Our Services | Climbird Technologies</title>
        <meta name="description" content="Explore our premium digital solutions including AI Automation, e-Commerce, Web Design, and Digital Marketing." />
      </Helmet>


      {/* ── Hero ── */}
      <section className="pt-36 pb-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">

            {/* Left: Headline + CTA */}
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">What We Do</span>
              <h1 className="text-5xl md:text-6xl font-black text-dark tracking-tight mt-3 mb-5 leading-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                Our <span className="text-primary">Services</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Six end-to-end service areas, each engineered around your goals — not cookie-cutter packages.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary transition-colors"
                >
                  Start a Project <ArrowRight size={15} />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 border border-gray-200 text-dark px-6 py-3 rounded-xl font-bold text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  Browse Services
                </a>
              </div>
            </div>

            {/* Right: Service index */}
            <div className="w-full lg:w-auto">
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">All Services</p>
              <div className="grid grid-cols-2 gap-2 min-w-[360px]">
                {servicesData.map((service) => {
                  const Icon = iconMap[service.icon] || Cpu;
                  return (
                    <button
                      key={service.id}
                      onClick={() => {
                        const el = document.getElementById(`service-${service.slug}`);
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all group text-left w-full"
                    >
                      <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </span>
                      <span className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">{service.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section id="services" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="space-y-6">
            {servicesData.map((service, index) => {
              const Icon = iconMap[service.icon] || Cpu;
              const imgUrl = serviceImages[service.slug];

              return (
                <div
                  key={service.id}
                  id={`service-${service.slug}`}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                    {/* Image — fixed height, controlled */}
                    <div className="w-full md:w-[340px] flex-shrink-0 relative overflow-hidden h-56 md:h-auto">
                      <img
                        src={imgUrl}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10" />
                      {/* Number watermark */}
                      <span className="absolute bottom-3 right-4 text-5xl font-black text-white/15 leading-none select-none" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs font-bold tracking-widest text-primary/80 uppercase">
                          {String(index + 1).padStart(2, '0')} — {service.title}
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black text-dark mb-3 tracking-tight leading-snug" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                        {service.title}
                      </h2>

                      <p className="text-gray-500 leading-relaxed mb-6 text-base" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                        {service.excerpt}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
                        {service.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-dark/70">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      <div>
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-2 bg-dark text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-primary transition-colors"
                        >
                          Learn More <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Minimal CTA ── */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-dark tracking-tight mb-2" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Not Sure Where to Start?
            </h2>
            <p className="text-gray-400 text-base max-w-md">
              Book a free 30-minute consultation. We'll assess your setup and tell you exactly what will move the needle.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-dark text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-primary transition-colors"
          >
            Get a Free Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
