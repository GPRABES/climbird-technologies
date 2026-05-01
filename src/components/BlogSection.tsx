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
              className="group p-5 rounded-3xl border border-gray-100 hover:border-primary/20 transition-all flex flex-col h-full bg-white hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[4/3]">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  {blog.id % 2 === 0 ? 'Marketing' : 'Insights'}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                {blog.title}
              </h3>
              <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed text-sm" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                {blog.excerpt}
              </p>
              
              <div className="mt-auto flex items-center gap-3">
                <img 
                  src={`https://i.pravatar.cc/100?img=${blog.id + 10}`} 
                  alt={blog.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-dark">{blog.author}</span>
                  <span className="text-xs text-gray-500">{blog.date} • {Math.max(4, blog.id + 2)} min read</span>
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
