import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Slider from "react-slick";
import {
  FaMapMarkerAlt, FaArrowLeft, FaImages, FaClock, FaTag,
  FaChevronLeft, FaCalendarAlt, FaBus, FaHiking, FaArrowUp, FaTimes,
  FaShareAlt, FaLink, FaWhatsapp, FaDirections, FaUtensils, FaPalette
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import blogData from "../data/posts.json";
import "./BlogDetail.css";

import importImages from "../utils/imageLoader";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogData.find((b) => b.id === parseInt(id));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      setScrollProgress(scroll);
      setShowScrollTop(totalScroll > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return <div className="not-found"><h2>Blog not found!</h2></div>;
  }

  const wordsPerMinute = 200;
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shareLocation = () => {
    if (blog.locationUrl) {
      navigator.clipboard.writeText(blog.locationUrl);
      toast.success("Location link copied to clipboard!", {
        icon: '🔗',
        style: {
          borderRadius: '10px',
          background: '#1e293b',
          color: '#fff',
        },
      });
    }
  };

  const shareToWhatsApp = () => {
    if (blog.locationUrl) {
      const message = `Check out this amazing place in Bangladesh: ${blog.title}. Location: ${blog.locationUrl}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{blog.title} | Explore Bangladesh</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: scrollProgress }}></div>
      </div>

      <button className="floating-back" onClick={() => navigate(-1)} title="Go Back">
        <FaChevronLeft />
      </button>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-lightbox" onClick={() => setSelectedImg(null)}>
                <FaTimes />
              </button>
              <img src={importImages[selectedImg]} alt="Detailed view" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="blog-page">
        <motion.header
          className="blog-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="hero-bg-wrapper">
            <img src={importImages[blog.image]} alt={blog.title} className="hero-bg-img" />
            <div className="hero-overlay"></div>
          </div>
          <motion.div
            className="hero-content"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="hero-badges">
              <span className="badge division"><FaMapMarkerAlt /> {blog.division}</span>
              <span className="badge category"><FaTag /> {blog.category}</span>
              <span className="badge reading-time"><FaClock /> {readingTime} min read</span>
            </div>
            <h1 className="hero-title">{blog.title}</h1>
            <p className="hero-excerpt">{blog.excerpt}</p>
          </motion.div>
        </motion.header>

        <article className="blog-container">
          <motion.div
            className="blog-body"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="content-grid">
              <div className="detail-content">
                {blog.content.split('\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className={index === 0 ? "first-para" : ""}
                    variants={fadeInUp}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              <motion.aside
                className="essentials-sidebar"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="essentials-card">
                  <h4>Traveler's Essentials</h4>
                  <div className="essential-item">
                    <FaMapMarkerAlt className="e-icon" />
                    <div>
                      <strong>District</strong>
                      <span>{blog.district}</span>
                    </div>
                  </div>
                  <div className="essential-item">
                    <FaCalendarAlt className="e-icon" />
                    <div>
                      <strong>Best Time</strong>
                      <span>{blog.bestTime || "Year round"}</span>
                    </div>
                  </div>
                  <div className="essential-item">
                    <FaBus className="e-icon" />
                    <div>
                      <strong>Transport</strong>
                      <span>{blog.transport || "Bus/Train"}</span>
                    </div>
                  </div>
                  <div className="essential-item">
                    <FaHiking className="e-icon" />
                    <div>
                      <strong>Difficulty</strong>
                      <span>{blog.difficulty || "Easy"}</span>
                    </div>
                  </div>
                </div>

                {blog.culturalHighlights && (
                  <div className="cultural-card">
                    <h4>Cultural Highlights</h4>
                    <div className="cultural-item">
                      <div className="c-icon-box gold">
                        <FaUtensils />
                      </div>
                      <div className="cultural-info">
                        <strong>Local Foods</strong>
                        <p className="bn-text">{blog.culturalHighlights.localFoods.bn}</p>
                        <p className="en-text">{blog.culturalHighlights.localFoods.en}</p>
                      </div>
                    </div>
                    <div className="cultural-item">
                      <div className="c-icon-box purple">
                        <FaPalette />
                      </div>
                      <div className="cultural-info">
                        <strong>Traditional Crafts</strong>
                        <p className="bn-text">{blog.culturalHighlights.traditionalCrafts.bn}</p>
                        <p className="en-text">{blog.culturalHighlights.traditionalCrafts.en}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.aside>
            </div>

            <motion.div
              className="more-img-box"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="section-title">
                <FaImages className="icon-mar" /> Visual Journey
              </h3>
              <p className="gallery-tip">Click any image to view in full screen</p>
              <div className="slider-wrapper">
                <Slider {...sliderSettings}>
                  {blog.moreImages?.map((imgName, index) => (
                    <div key={index} className="slide-item" onClick={() => setSelectedImg(imgName)}>
                      <img
                        src={importImages[imgName]}
                        alt={`View ${index + 1}`}
                        className="slider-img"
                        style={{ cursor: 'zoom-in' }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </motion.div>

            <motion.div
              className="detail-footer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="share-navigate-section">
                <div className="section-header">
                  <h3><FaShareAlt className="icon-mar" /> Plan Your Visit</h3>
                  <p>Share this destination with fellow explorers or get exact coordinates.</p>
                </div>

                <div className="visit-actions-grid">
                  <div className="map-preview-card">
                    <div className="map-placeholder">
                      <FaMapMarkerAlt className="map-pin-anim" />
                      <span>Google Maps Ready</span>
                    </div>
                    {blog.locationUrl && (
                      <a
                        href={blog.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-directions"
                      >
                        <FaDirections /> Get Directions
                      </a>
                    )}
                  </div>

                  <div className="share-links-box">
                    <h4>Share with Friends</h4>
                    <div className="share-buttons">
                      <button className="share-btn whatsapp" onClick={shareToWhatsApp}>
                        <FaWhatsapp /> WhatsApp
                      </button>
                      <button className="share-btn copy-link" onClick={shareLocation}>
                        <FaLink /> Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <Link to="/" className="btn btn-home">
                  <FaArrowLeft /> View More Destinations
                </Link>
              </div>
            </motion.div>

            <motion.section
              className="discover-more"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="section-title">Discover More {blog.category}s</h3>
              <div className="related-grid" style={{ display: 'grid' }}>
                {blogData
                  .filter(item => item.category === blog.category && item.id !== blog.id)
                  .slice(0, 3)
                  .map(related => (
                    <motion.div key={related.id} variants={fadeInUp}>
                      <Link to={`/blog/${related.id}`} className="related-card">
                        <div className="related-img-wrapper">
                          <img src={importImages[related.image]} alt={related.title} />
                        </div>
                        <div className="related-info">
                          <h4>{related.title}</h4>
                          <span><FaMapMarkerAlt /> View Details</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </motion.section>
          </motion.div>
        </article>
      </div>
    </>
  );
};

export default BlogDetail;
