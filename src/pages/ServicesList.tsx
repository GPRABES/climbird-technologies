import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import servicesData from '../data/services.json';

// Helper to render dynamic icon
const IconComponent = ({ iconName, className }: { iconName: string, className: string }) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.Layout;
  return <Icon className={className} />;
};

export default function ServicesList() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 bg-light-bg min-h-screen overflow-hidden">
      <Helmet>
        <title>Our Services | Climbird Technologies</title>
        <meta name="description" content="Explore our premium digital solutions including AI Automation, e-Commerce, Web Design, and Digital Marketing." />
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-black text-dark mb-6 tracking-tight">
            Our <span className="text-primary italic">Services</span>
          </h1>
          <p className="text-gray-600 text-xl">
            Premium solutions engineered for growth. We combine technical excellence with strategic thinking to solve complex business challenges.
          </p>
        </div>

        <div className="space-y-32">
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={service.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                
                {/* Visual Side */}
                <div className="w-full lg:w-1/2 flex justify-center relative">
                  <div className={`relative w-full max-w-md aspect-square rounded-[3rem] flex items-center justify-center shadow-lg ${service.color.split(' ')[0]} bg-opacity-30`}>
                     <div className="absolute inset-0 bg-white/60 backdrop-blur-md rounded-[3rem] border border-white"></div>
                     <div className={`relative z-10 w-32 h-32 rounded-3xl flex items-center justify-center bg-white shadow-xl ${service.color.split(' ')[1]}`}>
                       <IconComponent iconName={service.icon} className="w-16 h-16" />
                     </div>
                     {/* Decorative Elements */}
                     <div className="absolute -top-6 -right-6 w-24 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlNWEzMjEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-50 z-0"></div>
                     <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlNWEzMjEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-50 z-0"></div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">0{index + 1}</span>
                    <div className="h-px bg-primary/20 w-12"></div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-6 tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    {service.excerpt}
                  </p>
                  
                  <ul className="space-y-4 mb-10">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-dark font-medium">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 bg-dark text-white px-8 py-4 rounded-full font-bold hover:bg-primary transition-all hover:gap-4"
                  >
                    Explore Details
                    <ArrowRight size={20} />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
