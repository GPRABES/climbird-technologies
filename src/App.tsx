import React, { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

const Home = lazy(() => import("./pages/Home"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServicesList = lazy(() => import("./pages/ServicesList"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen overflow-x-hidden">
          <Navbar />
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-light-bg"><div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/services" element={<ServicesList />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
            </Routes>
          </Suspense>
          <Footer />
          <WhatsAppButton />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
