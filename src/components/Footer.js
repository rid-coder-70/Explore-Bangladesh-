import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaFacebookF, FaInstagram, FaTwitter, FaYoutube,
  FaHome, FaImages, FaInfoCircle, FaEnvelope, FaHeart, FaPaperPlane
} from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="footer_sty">
      <div className="footer-content">



        <div className="footer-section footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Explore Bangladesh</h3>
          </div>
          <p>
            Your ultimate guide to the most iconic, breathtaking, and culturally rich
            destinations across Bangladesh.
          </p>
        </div>



        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/"><FaHome style={{ marginRight: '8px' }} /> Home</Link></li>
            <li><Link to="/gallery"><FaImages style={{ marginRight: '8px' }} /> Gallery</Link></li>
            <li><Link to="/about"><FaInfoCircle style={{ marginRight: '8px' }} /> About</Link></li>
            <li><Link to="/contact"><FaEnvelope style={{ marginRight: '8px' }} /> Contact</Link></li>
          </ul>
        </div>



        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe for the latest travel tips &amp; updates</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              id="footer-newsletter-email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email for newsletter"
            />
            <button type="submit"><FaPaperPlane /></button>
          </form>
        </div>



        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="twitter">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="youtube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Explore Bangladesh. All rights reserved.</p>
        <p className="footer-credit">Made with <FaHeart style={{ color: '#ff4d4d' }} /> for Bangladesh</p>
      </div>
    </footer>
  );
}
