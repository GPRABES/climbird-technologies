import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import BlogSection from "../components/BlogSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <BlogSection />
      <Contact />
    </main>
  );
}
