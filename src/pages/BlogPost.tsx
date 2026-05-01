import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Calendar, User, Share2, MessageSquare, Send } from 'lucide-react';
import blogsData from '../data/blogs.json';

const renderContent = (content: string) => {
  return content.split('\n\n').map((paragraph, index) => {
    if (!paragraph.trim()) return null;
    
    // Check if it's a heading (e.g., short line without periods)
    if (paragraph.trim().length < 60 && !paragraph.includes('.')) {
       return <h3 key={index} className="text-2xl font-bold mt-12 mb-6 text-dark tracking-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>{paragraph.trim()}</h3>
    }

    return (
      <p key={index} className="mb-8 text-xl leading-relaxed text-gray-700 font-light" style={{ fontFamily: "'Google Sans', sans-serif" }}>
        {index === 0 ? (
          <span className="float-left text-6xl font-bold leading-[0.8] mr-3 mt-2 text-primary" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            {paragraph.trim().charAt(0)}
          </span>
        ) : null}
        {index === 0 ? paragraph.trim().substring(1) : paragraph.trim()}
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

      <div className="max-w-3xl mx-auto px-6">
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-dark transition-colors font-medium mb-12 mt-4"
        >
          <ArrowLeft size={20} />
          Back to all articles
        </Link>
        
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-8 tracking-tight leading-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-4 py-6 border-y border-gray-100 mb-12">
            <div className="w-12 h-12 rounded-full bg-gray-100 text-dark flex items-center justify-center font-bold text-lg uppercase">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-dark">{blog.author}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>{blog.date}</span>
                <span>·</span>
                <span>5 min read</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline bg-gray-100 px-2 py-0.5 rounded-full text-xs">Digital Strategy</span>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </header>

        <article className="max-w-none prose-a:text-primary hover:prose-a:text-primary-dark">
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
                <Link to={`/blog/${related.slug}`} key={related.id} className="group p-8 rounded-3xl border border-gray-100 hover:border-primary/20 transition-all flex flex-col h-full bg-white hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar size={14} className="text-primary" /> <span className="font-medium">{related.date}</span>
                  </div>
                  <h4 className="text-xl font-bold text-dark mb-4 line-clamp-2 group-hover:text-primary transition-colors" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    {related.title}
                  </h4>
                  <p className="text-gray-600 mb-8 line-clamp-3 leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    {related.excerpt}
                  </p>
                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-bold text-dark">
                      <User size={16} className="text-primary" /> {related.author}
                    </span>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:underline">
                      Read Article
                      <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
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
