import { motion } from "motion/react";
import { Send, Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import React from "react";

export default function Contact() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-light-bg relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
          <div className="lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-black text-dark mb-6"
            >
              Ready to <span className="text-primary italic">Transform</span> <br /> Your Business?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-dark/60 mb-10"
            >
              Get in touch today for a free consultation. Let's discuss how we can help you build, automate, and grow.
            </motion.p>

            <div className="space-y-8">
              {[
                { icon: <Phone size={24} />, label: "Call Us", val: "+977 9865046396" },
                { icon: <Mail size={24} />, label: "Email Us", val: "info@climbirdtechnologies.com" },
                { icon: <MapPin size={24} />, label: "Visit Us", val: "Kathmandu, Nepal" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="flex items-center gap-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-dark/30">{item.label}</p>
                    <p className="text-lg font-bold text-dark">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-dark/5 relative overflow-hidden">
              {/* Success/Error Overlay */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-dark mb-2">Message Sent!</h3>
                  <p className="text-dark/60">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                    <Send size={40} className="rotate-45" />
                  </div>
                  <h3 className="text-2xl font-black text-dark mb-2">Submission Failed</h3>
                  <p className="text-dark/60">Something went wrong. Please try again or email us directly.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-primary font-bold hover:underline"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              <h3 className="text-2xl font-black text-dark mb-8">Get a Free Consultation</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark/60 px-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-light-bg border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="Jane Doe"
                      disabled={status === "submitting"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark/60 px-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-light-bg border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="jane@company.com"
                      disabled={status === "submitting"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark/60 px-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full bg-light-bg border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                      disabled={status === "submitting"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-dark/60 px-1">Interested In</label>
                    <div className="relative">
                      <select
                        required
                        name="service"
                        className="w-full bg-light-bg border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all appearance-none"
                        disabled={status === "submitting"}
                      >
                        <option value="">Select Service</option>
                        <option value="AI & Automation">AI & Automation</option>
                        <option value="e-Commerce">e-Commerce</option>
                        <option value="Web Design & Dev">Web Design & Dev</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Branding & Design">Branding & Design</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-dark/30">
                        <ArrowRight size={16} className="rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-dark/60 px-1">How can we help?</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="w-full bg-light-bg border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="Tell us about your project goals..."
                    disabled={status === "submitting"}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-gradient-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
