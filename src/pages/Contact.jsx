import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Contact.css";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbdavpwz";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
    subscribe: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sending your message...");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Thank you! Your message has been sent successfully.", { id: toastId });
        setFormData({
          name: "", email: "", phone: "", subject: "",
          message: "", inquiryType: "general", subscribe: false,
        });
      } else {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    } catch {
      toast.error("Failed to send message. Check your connection.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Explore Bangladesh</title>
        <meta name="description" content="Get in touch with Explore Bangladesh. Send us your travel questions, feedback or suggestions." />
      </Helmet>

      <div className="contact-wrapper">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Have a travel question, feedback, or suggestion? We'd love to hear from you.
            Fill in the form and we'll get back to you as soon as possible.
          </p>

          <div className="contact-cards">
            <div className="contact-card">
              <span className="contact-card-icon"><FaMapMarkerAlt /></span>
              <div>
                <strong>Location</strong>
                <p>Sylhet, Bangladesh</p>
              </div>
            </div>
            <div className="contact-card">
              <span className="contact-card-icon"><FaEnvelope /></span>
              <div>
                <strong>Email</strong>
                <p>ridoybaidya2@gmail.com</p>
              </div>
            </div>
            <div className="contact-card">
              <span className="contact-card-icon"><FaClock /></span>
              <div>
                <strong>Response Time</strong>
                <p>Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="contact-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="csocial-link facebook" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="csocial-link instagram" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="csocial-link twitter" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="csocial-link youtube" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="contact-form-box">
          <h1 className="contact-title">Send Us a Message</h1>

          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name">Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-phone">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+8801XXXXXXXXX"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-inquiry">Inquiry Type</label>
                <select
                  id="contact-inquiry"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="suggestion">Travel Suggestion</option>
                  <option value="issue">Report an Issue</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Write your message here…"
                className="form-input form-textarea"
              />
            </div>

            <label className="form-checkbox">
              <input
                type="checkbox"
                name="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
              />
              <span>Subscribe to our newsletter for travel updates</span>
            </label>

            <button type="submit" className="contact-submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loader">Sending…</span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
