import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import imageMap from "../../utils/imageLoader";

const CATEGORY_COLORS = {
  Beach:      { from: "#0077b6", to: "#00b4d8" },
  Forest:     { from: "#1b4332", to: "#52b788" },
  Hill:       { from: "#5e2d79", to: "#c77dff" },
  Nature:     { from: "#1b6b47", to: "#52b788" },
  Historical: { from: "#7b2d8b", to: "#e040fb" },
  Wetland:    { from: "#0096c7", to: "#48cae4" },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const SpotCard = ({ spot, index, isMobile }) => {
  const colors = CATEGORY_COLORS[spot.category] || { from: "#1e3a8a", to: "#3b82f6" };
  const imgSrc = spot.image?.startsWith("http")
    ? spot.image
    : imageMap[spot.image] || "";

  return (
    <motion.div
      className="spot-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
      whileHover={!isMobile ? { y: -8, transition: { duration: 0.3 } } : {}}
    >
      {/* Image Section */}
      <div className="spot-image-wrapper">
        <img
          src={imgSrc}
          alt={spot.title}
          className="spot-image"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient overlay always visible at bottom of image */}
        <div className="spot-image-overlay" />

        {/* District / Category badge */}
        {(spot.district || spot.category) && (
          <span
            className="category-badge"
            style={{
              background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
            }}
          >
            <MapPin size={10} style={{ display: 'inline', marginRight: 3, verticalAlign: 'middle' }} />
            {spot.district || spot.category}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="spot-content">
        <h2 className="spot-title">{spot.title}</h2>
        <p className="spot-description">{spot.excerpt}</p>

        <Link to={`/blog/${spot.id}`} className="read-more-link">
          Explore
          <span className="read-more-arrow">
            <ArrowRight size={15} />
          </span>
        </Link>
      </div>
    </motion.div>
  );
};


export const SkeletonCard = () => (
  <div className="spot-card skeleton-card">
    <div className="skeleton skeleton-img" />
    <div className="spot-content">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-text" />
      <div className="skeleton skeleton-text short" />
      <div className="skeleton skeleton-btn" />
    </div>
  </div>
);

export default SpotCard;