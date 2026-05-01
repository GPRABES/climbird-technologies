import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MessageSquare, Search, Lightbulb, Pencil, Code2, Rocket, BarChart3,
  ArrowRight, CheckCircle2, Clock, Users, Zap
} from 'lucide-react';

const phases = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Discovery Call',
    duration: '30–60 min',
    color: 'bg-violet-50 text-violet-600',
    dot: 'bg-violet-500',
    description:
      'Every successful project begins with listening. In our first call, we dig into your business goals, your current challenges, your audience, and where you want to be in 12 months.',
    activities: [
      'Business goals and KPIs review',
      'Current digital footprint audit',
      'Competitor landscape snapshot',
      'Budget and timeline alignment',
      'Identify quick wins vs. long-term plays',
    ],
    outcome: 'A clear picture of your situation and a shared understanding of what success looks like.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Research & Audit',
    duration: '3–5 days',
    color: 'bg-blue-50 text-blue-600',
    dot: 'bg-blue-500',
    description:
      'Before touching a single pixel or line of code, we do the homework. We audit your existing assets, analyze your competitors, and research your target customer in depth.',
    activities: [
      'Technical SEO and performance audit',
      'Competitor website and content analysis',
      'Target audience persona development',
      'Keyword and market opportunity mapping',
      'Conversion funnel analysis',
    ],
    outcome: 'A data-backed opportunity map that tells us exactly where to focus for maximum impact.',
  },
  {
    number: '03',
    icon: Lightbulb,
    title: 'Strategy & Planning',
    duration: '2–3 days',
    color: 'bg-amber-50 text-amber-600',
    dot: 'bg-amber-500',
    description:
      'We translate research into a clear, prioritized roadmap. This is where we decide what to build, what to optimize, and in what order — aligned to your specific goals and budget.',
    activities: [
      'Project scope and deliverables definition',
      'Technology stack selection',
      'Content and messaging strategy',
      'Milestones and timeline mapping',
      'Risk identification and mitigation plan',
    ],
    outcome: 'A signed-off project plan that both sides can execute against with full confidence.',
  },
  {
    number: '04',
    icon: Pencil,
    title: 'Design & Prototyping',
    duration: '1–2 weeks',
    color: 'bg-pink-50 text-pink-600',
    dot: 'bg-pink-500',
    description:
      'Our designers create high-fidelity prototypes before a single line of production code is written. You see exactly what you are getting — and can request changes at zero extra cost.',
    activities: [
      'Brand and visual identity alignment',
      'Wireframe and user flow mapping',
      'High-fidelity UI design in Figma',
      'Mobile-first responsive layouts',
      'Client review and revision rounds',
    ],
    outcome: 'Approved, pixel-perfect designs ready for development — no surprises at launch.',
  },
  {
    number: '05',
    icon: Code2,
    title: 'Development & Build',
    duration: '2–6 weeks',
    color: 'bg-green-50 text-green-600',
    dot: 'bg-green-500',
    description:
      'Our developers build your solution using modern, battle-tested technologies. Every feature is built for speed, security, and scalability from day one.',
    activities: [
      'Clean, maintainable code architecture',
      'Third-party integrations (CRM, analytics, etc.)',
      'Performance optimization (Core Web Vitals)',
      'Cross-browser and device testing',
      'Staging environment for client review',
    ],
    outcome: 'A fully functional, tested product on a staging environment — ready for your approval.',
  },
  {
    number: '06',
    icon: Rocket,
    title: 'Launch & Go-Live',
    duration: '1–2 days',
    color: 'bg-orange-50 text-orange-600',
    dot: 'bg-orange-500',
    description:
      'Launch day is not the finish line — it\'s the starting gun. We handle the entire deployment process so you don\'t have to worry about a single technical detail.',
    activities: [
      'DNS and domain configuration',
      'SSL certificates and security headers',
      'Google Search Console and Analytics setup',
      'Sitemap submission and indexing request',
      'Post-launch smoke testing across all devices',
    ],
    outcome: 'Your product is live, indexed, and fully operational — with zero downtime.',
  },
  {
    number: '07',
    icon: BarChart3,
    title: 'Growth & Optimization',
    duration: 'Ongoing',
    color: 'bg-teal-50 text-teal-600',
    dot: 'bg-teal-500',
    description:
      'The best digital products improve over time. We monitor performance, analyze user behavior, and continuously optimize to squeeze more results from what you\'ve built.',
    activities: [
      'Monthly performance reporting',
      'A/B testing and conversion optimization',
      'SEO content expansion and link building',
      'Feature updates and UX improvements',
      'Quarterly strategy review calls',
    ],
    outcome: 'Compounding growth — each month better than the last, with a team that\'s invested in your success.',
  },
];

const principles = [
  {
    icon: Clock,
    title: 'Deadlines Are Sacred',
    description: 'We ship on time, every time. If something changes, you know first — before it becomes a problem.',
  },
  {
    icon: Users,
    title: 'You Always Have Context',
    description: 'Weekly check-ins and a shared project board mean you are never left wondering what is happening.',
  },
  {
    icon: Zap,
    title: 'Speed Without Shortcuts',
    description: 'We move fast but we don\'t cut corners. Performance, security, and quality are non-negotiable.',
  },
  {
    icon: CheckCircle2,
    title: 'Approval at Every Stage',
    description: 'Nothing moves forward without your sign-off. You stay in control of the project throughout.',
  },
];

export default function Process() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>Our Process | Climbird Technologies</title>
        <meta name="description" content="See exactly how Climbird Technologies takes a business from discovery to launch and growth — a transparent 7-phase process." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="pt-36 pb-20 px-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">How We Work</span>
          <h1 className="text-5xl md:text-6xl font-black text-dark tracking-tight mt-3 mb-5 leading-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            From First Call to<br /><span className="text-primary">Lasting Growth</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed mb-10">
            No black boxes. No surprises. Here is exactly how we take a business from idea to execution — and keep improving it long after launch.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary transition-colors"
            >
              Start Your Project <ArrowRight size={15} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-gray-200 text-dark px-6 py-3 rounded-xl font-bold text-sm hover:border-primary hover:text-primary transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Phase Timeline ── */}
      <section className="py-20 px-6 bg-[#FAFAF8]">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-dark tracking-tight mb-3" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              The 7-Phase Delivery Framework
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Every client engagement follows this framework — adapted to your specific scope and goals.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-[28px] top-0 bottom-0 w-px bg-gray-200" />

            <div className="space-y-8">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <div key={phase.number} className="flex flex-col md:flex-row gap-6">

                    {/* Timeline dot + number */}
                    <div className="flex md:flex-col items-center gap-3 md:gap-0 md:w-14 flex-shrink-0">
                      <div className={`relative z-10 w-14 h-14 rounded-2xl ${phase.color} flex items-center justify-center shadow-sm border border-white flex-shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 bg-white rounded-3xl border border-gray-100 p-8 hover:border-primary/20 hover:shadow-lg transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                        <div>
                          <span className="text-xs font-black tracking-widest text-gray-300 uppercase">{phase.number}</span>
                          <h3 className="text-2xl font-black text-dark mt-0.5 tracking-tight" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                            {phase.title}
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full whitespace-nowrap self-start">
                          <Clock className="w-3.5 h-3.5" />
                          {phase.duration}
                        </span>
                      </div>

                      <p className="text-gray-500 leading-relaxed mb-6 text-sm">
                        {phase.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                        {phase.activities.map((a, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-dark/70">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{a}</span>
                          </div>
                        ))}
                      </div>

                      {/* Outcome callout */}
                      <div className="bg-primary/5 border border-primary/15 rounded-2xl px-5 py-3.5">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Outcome</span>
                        <p className="text-dark text-sm font-medium mt-1 leading-snug">{phase.outcome}</p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Working Principles ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-dark tracking-tight mb-3" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              How We Show Up for You
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Process is only as good as the people running it. Here are the principles we hold ourselves to on every engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="flex gap-5 p-7 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-dark mb-1.5" style={{ fontFamily: "'Google Sans', sans-serif" }}>{p.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-dark tracking-tight mb-2" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Ready to Begin?
            </h2>
            <p className="text-gray-400 text-base max-w-md">
              The first call is free. Let's understand your goals and map out what Phase 1 looks like for your business.
            </p>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-dark text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-primary transition-colors"
          >
            Book a Free Call <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
