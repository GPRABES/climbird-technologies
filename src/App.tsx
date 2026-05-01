import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen overflow-x-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
