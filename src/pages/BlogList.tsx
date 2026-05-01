import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import blogsData from '../data/blogs.json';

export default function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogsData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogsData.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          {currentPosts.map((blog) => (
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

              <h2 className="text-2xl font-bold text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                {blog.title}
              </h2>
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

        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-500 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentPage === i + 1 
                    ? 'bg-primary text-white shadow-md' 
                    : 'border border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-500 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
