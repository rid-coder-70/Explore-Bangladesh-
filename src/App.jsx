import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import BlogDetail from "./pages/BlogDetail";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import { DarkModeProvider } from "./context/DarkModeContext";
import { HelmetProvider } from "react-helmet-async";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/blog/:id" element={<PageTransition><BlogDetail /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HelmetProvider>
      <DarkModeProvider>
        <Router>
          <ScrollToTop />
          <CustomCursor />
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
        </Router>
      </DarkModeProvider>
    </HelmetProvider>
  );
}

export default App;
