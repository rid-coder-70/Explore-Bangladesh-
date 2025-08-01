import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";

import Contact from "./pages/Contact";
import BlogDetail from "./pages/BlogDetail";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
           <Route path="/blog/:id" element={<BlogDetail />} />
         <Route path="/contact" element={<Contact />} /> 
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
