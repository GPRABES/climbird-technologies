import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import servicesData from "../data/services.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-dark text-white pt-20 pb-10 overflow-hidden border-t border-primary/10">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <img 
                src="/logo.svg" 
                alt="Climbird Logo" 
                className="w-12 h-12 group-hover:scale-110 transition-transform brightness-0 invert"
              />
              <span 
                className="text-2xl leading-none tracking-tight mt-1 text-white"
                style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 'bold' }}
              >
                Climbird
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Empowering businesses through cutting-edge AI automation, high-performance web development, and result-driven digital marketing strategies.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61574303680004" },
                { Icon: Instagram, href: "https://www.instagram.com/climbirdtechnologies/" }
              ].map((social, i) => (
                <a key={i} href={social.href} target={social.href !== "#" ? "_blank" : undefined} rel={social.href !== "#" ? "noopener noreferrer" : undefined} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-gray-400 hover:text-white">
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-8">Services</h4>
            <ul className="space-y-4 text-gray-400">
              {servicesData.slice(0, 5).map(service => (
                <li key={service.id}>
                  <Link to={`/services/${service.slug}`} className="hover:text-primary transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-8">Company</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/#" className="hover:text-primary transition-colors">Our Portfolio</a></li>
              <li><Link to="/success-stories" className="hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><a href="/#process" className="hover:text-primary transition-colors">Work Process</a></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-8">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span>+977 9865046396</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span>info@climbirdtechnologies.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5" />
                <span className="max-w-[200px]">Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © {currentYear} Climbird Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
