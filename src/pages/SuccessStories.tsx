import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Rajesh Maharjan",
    role: "CEO, Everest Innovations",
    content: "Climbird transformed our e-commerce store with their AI integration. Our conversion rates jumped by 40% in just two months. Their technical expertise is unmatched in the region.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=33"
  },
  {
    name: "Sunita Shrestha",
    role: "Marketing Director, Himalayan Travels",
    content: "The automation workflows they built saved our team 20+ hours a week. Professional, fast, and truly experts in their field. We now have the infrastructure to scale globally.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=47"
  },
  {
    name: "Bikash Thapa",
    role: "Founder, KTM Valley Tech",
    content: "From logo design to full-stack development, Climbird exceeded our expectations. They are our go-to digital partner in Nepal. They truly care about our bottom line.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=12"
  },
  {
    name: "Anita Gurung",
    role: "Operations Manager, Yeti Retail",
    content: "The custom Shopify build and inventory syncing has fundamentally changed how we do business. No more manual data entry, just seamless transactions.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=5"
  },
  {
    name: "Dipen Karki",
    role: "Director, Kathmandu Real Estate",
    content: "Our local SEO rankings skyrocketed within 3 months. We are now generating 3x more qualified leads from organic search than we ever did with paid ads.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=11"
  },
  {
    name: "Pooja Shakya",
    role: "Founder, Artisan Nepal",
    content: "The branding package gave us the premium look we desperately needed to enter international markets. Absolutely thrilled with the creative direction.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=9"
  }
];

export default function SuccessStories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-32 pb-24 bg-light-bg min-h-screen overflow-hidden">
      <Helmet>
        <title>Success Stories | Climbird Technologies</title>
        <meta name="description" content="Discover how Climbird Technologies has helped businesses scale, automate, and dominate their markets." />
      </Helmet>

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-black text-dark mb-6 tracking-tight"
          >
            Client <span className="text-primary italic">Success</span> Stories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Don't just take our word for it—hear from the businesses we've helped grow, optimize, and scale to new heights.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-[32px] relative group hover:bg-white transition-all duration-500 shadow-lg hover:shadow-2xl flex flex-col h-full"
            >
              <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                <Quote size={48} />
              </div>
              
              <div className="flex items-center gap-1 mb-6 text-primary">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-dark/80 text-lg leading-relaxed mb-8 italic flex-grow">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-dark/5 pt-6 mt-auto">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-dark">{testimonial.name}</h4>
                  <p className="text-xs text-dark/50">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Client Logos Placeholder */}
        <div className="mt-32 pt-20 border-t border-gray-200">
          <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-16">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 grayscale hover:grayscale-0 transition-all duration-500">
            
            <div className="group cursor-pointer hover:opacity-100 transition-opacity flex items-center">
              <span className="text-4xl font-display font-bold italic tracking-tighter text-[#60B52F]">eSewa</span>
            </div>

            <div className="group cursor-pointer hover:opacity-100 transition-opacity flex items-center">
              <span className="text-4xl font-sans font-black tracking-tight text-[#5C2D91]">Khalti</span>
            </div>

            <div className="group cursor-pointer hover:opacity-100 transition-opacity flex items-center">
              <span className="text-4xl font-sans font-bold tracking-tight text-[#F85606]">daraz</span>
            </div>

            <div className="group cursor-pointer hover:opacity-100 transition-opacity flex items-center gap-1">
              <span className="text-4xl font-sans font-black italic text-[#E31837]">IME</span>
              <span className="text-4xl font-sans font-bold italic text-dark">Pay</span>
            </div>

            <div className="group cursor-pointer hover:opacity-100 transition-opacity flex items-center">
              <span className="text-4xl font-sans font-black tracking-tighter text-[#E31837]">F1</span>
              <span className="text-4xl font-sans font-bold tracking-tight text-gray-800">Soft</span>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
