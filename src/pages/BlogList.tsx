import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, User } from 'lucide-react';
import blogsData from '../data/blogs.json';

export default function BlogList() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 bg-light-bg min-h-screen">
      <Helmet>
        <title>Blog | Climbird Technologies</title>
        <meta name="description" content="Read the latest insights and articles on web development, SEO, AI automation, and digital marketing." />
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-dark mb-6 tracking-tight">
            Our <span className="text-primary italic">Blog</span>
          </h1>
          <p className="text-gray-600 text-xl">
            Actionable advice, industry trends, and technical insights to help your business grow faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/blog/${blog.slug}`}
              className="group glass rounded-3xl overflow-hidden hover-lift border border-dark/5 hover:border-primary/30 transition-all flex flex-col h-full bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm flex items-center gap-2">
                  <Calendar size={14} /> {blog.date}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-dark mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-8 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-bold text-dark">
                    <User size={16} className="text-primary" /> {blog.author}
                  </span>
                  <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:underline">
                    Read Article
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
