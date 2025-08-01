import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; 

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="footer_sty">
      <div className="footer-content">

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Explore Bangladesh</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe for the latest travel tips & updates</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {subscribed && <p className="success-msg">Thank you for subscribing!</p>}
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="facebook"
            >
              <i className="fab fa-facebook-square"></i>
            </a>
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="twitter"
            >
              <i className="fab fa-twitter-square"></i>
            </a>
            <a
              href="https://youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="youtube"
            >
              <i className="fab fa-youtube-square"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Explore Bangla. All rights reserved.
      </div>
    </footer>
  );
}
