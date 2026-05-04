import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaMapMarkerAlt, FaArrowLeft, FaClock, FaTag,
  FaChevronLeft, FaArrowUp, FaTimes, FaShareAlt
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import blogData from "../data/posts.json";
import { 
  TravelerEssentials, 
  CulturalHighlights, 
  VisualJourney, 
  VisitActions,
  LiveWeather
} from "../components/common/BlogComponents";
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
        <title>{blog.title} | BanglaGo</title>
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
                <LiveWeather district={blog.district} />
                <TravelerEssentials blog={blog} />
                <CulturalHighlights highlights={blog.culturalHighlights} />
              </motion.aside>
            </div>

            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <VisualJourney 
                images={blog.moreImages} 
                onImageClick={setSelectedImg} 
                sliderSettings={sliderSettings} 
              />
            </motion.div>

            <motion.div
              className="detail-footer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <VisitActions 
                locationUrl={blog.locationUrl} 
                onWhatsAppShare={shareToWhatsApp} 
                onCopyLink={shareLocation} 
              />

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
