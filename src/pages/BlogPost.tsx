import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Calendar, User, Share2, MessageSquare, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import blogsData from '../data/blogs.json';

const renderInline = (text: string) => {
  // Handle **bold** text
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-bold text-dark">{part}</strong> : part
  );
};

const renderContent = (content: string) => {
  const blocks = content.split('\n\n').filter(b => b.trim());
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i].trim();

    // ## H2 Heading
    if (block.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-3xl font-black text-dark mt-14 mb-5 tracking-tight leading-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          {block.replace('## ', '')}
        </h2>
      );
    }
    // ### H3 Heading
    else if (block.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl font-bold text-dark mt-10 mb-3 tracking-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          {block.replace('### ', '')}
        </h3>
      );
    }
    // > Blockquote
    else if (block.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="my-8 pl-6 border-l-4 border-primary bg-primary/5 py-4 pr-4 rounded-r-xl">
          <p className="text-lg italic text-dark/80 font-medium leading-relaxed" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            {renderInline(block.replace('> ', ''))}
          </p>
        </blockquote>
      );
    }
    // Bullet list (lines starting with -)
    else if (block.startsWith('- ')) {
      const items = block.split('\n').filter(l => l.startsWith('- '));
      elements.push(
        <ul key={i} className="my-6 space-y-3 pl-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[1.05rem] text-gray-700 font-light leading-relaxed">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span style={{ fontFamily: "'Google Sans', sans-serif" }}>{renderInline(item.replace('- ', ''))}</span>
            </li>
          ))}
        </ul>
      );
    }
    // Numbered list (lines starting with 1. 2. etc)
    else if (/^\d+\.\s/.test(block)) {
      const items = block.split('\n').filter(l => /^\d+\.\s/.test(l));
      elements.push(
        <ol key={i} className="my-6 space-y-3 pl-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[1.05rem] text-gray-700 font-light leading-relaxed">
              <span className="mt-0.5 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{idx + 1}</span>
              <span style={{ fontFamily: "'Google Sans', sans-serif" }}>{renderInline(item.replace(/^\d+\.\s/, ''))}</span>
            </li>
          ))}
        </ol>
      );
    }
    // Regular paragraph
    else {
      elements.push(
        <p key={i} className="mb-6 text-[1.05rem] leading-[1.85] text-gray-700 font-light" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          {renderInline(block)}
        </p>
      );
    }

    i++;
  }

  return elements;
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
  const relatedBlogs = blogsData.filter(b => b.slug !== slug);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -320 : 320; // One card width
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Error sharing', error);
    }
  };

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>{blog.title} | Climbird Technologies</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      {/* Header Section with Beige Background */}
      <section className="bg-[#E6E2DA] pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-dark transition-colors font-medium mb-8"
          >
            <ArrowLeft size={20} />
            Back to all articles
          </Link>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            {blog.title}
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-light leading-relaxed">
            {blog.excerpt}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="mb-16 rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-auto object-cover aspect-[21/9]"
            />
          </div>

          <div className="flex items-center justify-center gap-4 py-6 border-b border-gray-100 mb-12 max-w-3xl mx-auto">
            <img src={`https://i.pravatar.cc/100?img=${blog.id + 10}`} alt={blog.author} className="w-12 h-12 rounded-full" />
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
            <div className="ml-auto">
              <button 
                onClick={handleShare}
                className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors"
                title="Share article"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <article className="max-w-3xl mx-auto prose-a:text-primary hover:prose-a:text-primary-dark">
            {renderContent(blog.content)}
          </article>
          
          <div className="max-w-3xl mx-auto mt-12 flex items-center justify-between border-t border-gray-100 pt-8">
            <p className="font-bold text-dark text-xl">Share this article</p>
            <button 
              onClick={handleShare}
              className="w-12 h-12 rounded-full bg-white border border-dark/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all text-dark shadow-sm"
              title="Share article"
            >
              <Share2 size={20} />
            </button>
          </div>

          <div className="max-w-3xl mx-auto">
            <BlogComments />
          </div>

          <div className="max-w-4xl mx-auto mt-20 pt-16 border-t border-gray-200">
            <h3 className="text-2xl font-display font-bold text-dark mb-8 text-center">More Articles</h3>

            {/* Carousel: shows 3 cards, others hidden via overflow */}
            <div className="overflow-hidden">
              <div
                ref={scrollRef}
                className="flex gap-5 pb-2 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {relatedBlogs.map(related => (
                  <div
                    key={related.id}
                    className="w-[calc(33.333%-14px)] min-w-[calc(33.333%-14px)] flex-shrink-0 snap-start"
                  >
                    <Link
                      to={`/blog/${related.slug}`}
                      className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden"
                    >
                      {/* Small Thumbnail */}
                      <div className="relative overflow-hidden aspect-[16/9]">
                        <img
                          src={related.imageUrl}
                          alt={related.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {related.id % 2 === 0 ? 'Marketing' : 'Insights'}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 flex flex-col flex-1">
                        <h4
                          className="text-sm font-bold text-dark mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug"
                          style={{ fontFamily: "'Google Sans', sans-serif" }}
                        >
                          {related.title}
                        </h4>
                        <p
                          className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-3"
                          style={{ fontFamily: "'Google Sans', sans-serif" }}
                        >
                          {related.excerpt}
                        </p>
                        <div className="mt-auto flex items-center gap-2">
                          <img
                            src={`https://i.pravatar.cc/100?img=${related.id + 10}`}
                            alt={related.author}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-dark leading-none">{related.author}</span>
                            <span className="text-[10px] text-gray-400 mt-0.5">{related.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons Below */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => scroll('left')}
                className="w-11 h-11 rounded-full border border-gray-300 bg-white flex items-center justify-center text-dark hover:border-primary hover:text-primary transition-colors shadow-sm"
                aria-label="Scroll left"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-md"
                aria-label="Scroll right"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
