import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/Contact';

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 min-h-screen flex flex-col bg-light-bg">
      <Helmet>
        <title>Contact Us | Climbird Technologies</title>
        <meta name="description" content="Get in touch with Climbird Technologies. We are here to help you build, automate, and grow your business." />
      </Helmet>
      
      <Contact />
    </main>
  );
}
