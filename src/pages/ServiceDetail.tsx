import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import servicesData from '../data/services.json';

// Helper to render dynamic icon
const IconComponent = ({ iconName, className }: { iconName: string, className: string }) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.Layout;
  return <Icon className={className} />;
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

  // Split content into paragraphs for clean rendering
  const paragraphs = service.content.split('\n\n').filter(p => p.trim());

  return (
    <main className="pt-32 pb-24 bg-light-bg min-h-screen">
      <Helmet>
        <title>{service.title} | Climbird Technologies</title>
        <meta name="description" content={service.excerpt} />
      </Helmet>

      <div className="container mx-auto px-6 max-w-5xl">
        <Link 
          to="/services"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-dark transition-colors font-medium mb-12 mt-4"
        >
          <ArrowLeft size={20} />
          Back to all services
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content Area */}
          <div className="w-full lg:w-2/3">
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-sm ${service.color}`}>
                   <IconComponent iconName={service.icon} className="w-8 h-8" />
                 </div>
                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-dark tracking-tight leading-tight">
                   {service.title}
                 </h1>
              </div>
              <p className="text-2xl text-gray-600 font-light leading-relaxed">
                {service.excerpt}
              </p>
            </header>

            <article className="prose prose-lg max-w-none text-gray-700">
              {paragraphs.map((p, i) => (
                <p key={i} className="mb-6 leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                  {p}
                </p>
              ))}
            </article>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32 p-8 bg-white rounded-3xl border border-gray-100 shadow-xl">
              <h3 className="text-2xl font-bold text-dark mb-6">What's Included</h3>
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-dark font-medium">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href="/#contact"
                className="w-full inline-block text-center bg-primary text-white px-6 py-4 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg"
              >
                Discuss Your Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
