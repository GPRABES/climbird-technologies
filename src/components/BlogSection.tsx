import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import blogsData from '../data/blogs.json';

export default function BlogSection() {
  // Get the latest 3 blogs
  const recentBlogs = blogsData.slice(0, 3);

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-light-bg">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Latest Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-6 tracking-tight">
            Our Latest <span className="text-primary italic">Articles</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Stay up to date with the latest trends in web development, SEO, and AI automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBlogs.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/blog/${blog.slug}`}
              className="group glass rounded-2xl overflow-hidden hover-lift border border-dark/5 hover:border-primary/30 transition-all flex flex-col h-full bg-white shadow-sm hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 text-sm">
                  {blog.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-dark/5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-dark">
                    <User size={16} className="text-primary" /> {blog.author}
                  </span>
                  <ArrowRight size={20} className="text-primary transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center justify-center gap-2 bg-white text-dark border border-dark/10 px-8 py-4 rounded-xl font-bold hover:bg-light-bg hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
          >
            View All Articles
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
