import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Calendar, User, Share2, MessageSquare, Send } from 'lucide-react';
import blogsData from '../data/blogs.json';

const renderContent = (content: string) => {
  return content.split('\n\n').map((paragraph, index) => {
    if (!paragraph.trim()) return null;
    return (
      <p key={index} className="mb-6 leading-relaxed">
        {paragraph.trim()}
      </p>
    );
  });
};

function BlogComments() {
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setIsSubmitted(true);
      setComment('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="mt-16 pt-12 border-t border-gray-200">
      <h3 className="text-2xl font-display font-bold text-dark mb-8 flex items-center gap-2">
        <MessageSquare size={24} className="text-primary" />
        Comments
      </h3>
      
      {/* Mock Comments */}
      <div className="space-y-6 mb-12">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
              JD
            </div>
            <div>
              <p className="font-bold text-dark text-sm">Jane Doe</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
          <p className="text-gray-700">This is a fantastic read! Really helped clarify my strategy moving forward. Thanks for sharing.</p>
        </div>
      </div>

      {/* Comment Form */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h4 className="text-lg font-bold text-dark mb-6">Leave a comment</h4>
        {isSubmitted ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200">
            Thanks for your comment! It is pending moderation.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                required 
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" 
                placeholder="Share your thoughts..."
              />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors">
              <Send size={18} />
              Post Comment
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const blog = blogsData.find(b => b.slug === slug);
  const relatedBlogs = blogsData.filter(b => b.slug !== slug).slice(0, 2);
  
  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="pt-32 pb-24 bg-light-bg min-h-screen">
      <Helmet>
        <title>{blog.title} | Climbird Technologies</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6">
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-dark transition-colors font-medium mb-12"
        >
          <ArrowLeft size={20} />
          Back to all articles
        </Link>
        
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" /> {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <User size={16} className="text-primary" /> {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">Digital Strategy</span>
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark mb-8 tracking-tight leading-tight">
            {blog.title}
          </h1>
        </header>

        {/* Hero Image Container */}
        <div className="mb-16 w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
          <img 
            src={blog.imageUrl} 
            alt={blog.title}
            className="w-full h-auto aspect-video object-cover"
          />
        </div>

        <article className="prose prose-lg md:prose-xl prose-primary prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary-dark max-w-none text-gray-700 leading-relaxed bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          {renderContent(blog.content)}
        </article>
        
        <div className="mt-12 flex items-center justify-between">
          <p className="font-bold text-dark text-xl">Share this article</p>
          <button className="w-12 h-12 rounded-full bg-white border border-dark/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all text-dark shadow-sm">
            <Share2 size={20} />
          </button>
        </div>

        <BlogComments />

        {/* More Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="mt-20 pt-16 border-t border-gray-200">
            <h3 className="text-3xl font-display font-bold text-dark mb-8">More Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedBlogs.map(related => (
                <Link to={`/blog/${related.slug}`} key={related.id} className="group glass rounded-3xl overflow-hidden hover-lift border border-dark/5 hover:border-primary/30 transition-all flex flex-col bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden">
                    <img src={related.imageUrl} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      {related.date}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h4 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">{related.title}</h4>
                    <p className="text-gray-600 line-clamp-2 mb-6">{related.excerpt}</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-primary font-bold text-sm group-hover:underline">Read Article</span>
                      <ArrowRight size={18} className="text-primary transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
