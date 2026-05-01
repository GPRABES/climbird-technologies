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
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-6 tracking-tight">
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
              className="group p-8 rounded-3xl border border-gray-100 hover:border-primary/20 transition-all flex flex-col h-full bg-white hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar size={14} className="text-primary" /> <span className="font-medium">{blog.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4 line-clamp-2 group-hover:text-primary transition-colors" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif" }}>
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
