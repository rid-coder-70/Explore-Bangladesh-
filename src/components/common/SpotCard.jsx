import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import imageMap from '../../utils/imageLoader';

const CATEGORY_COLORS = {
    Beach: '#0077b6',
    Forest: '#2d6a4f',
    Hill: '#6a4c93',
    Nature: '#52b788',
    Historical: '#c77dff',
    Wetland: '#48cae4',
};

const FracturedText = ({ text }) => {
    return (
        <>
            {text.split('').map((char, i) => (
                <span key={i}>{char}</span>
            ))}
        </>
    );
};

const SpotCard = ({ spot, index, isMobile }) => {
    // Calculate dynamic X offset for mobile alternating animation
    let initialX = 0;
    if (isMobile) {
        initialX = index % 2 === 0 ? -100 : 100;
    }

    return (
        <motion.div
            className="spot-card"
            initial={{ opacity: 0, y: isMobile ? 0 : 50, x: initialX, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5, zIndex: 10, boxShadow: '0 25px 50px -12px rgba(45, 137, 229, 0.25)' }}
        >
            <div className="spot-image-wrapper">
                <img
                    src={spot.image.startsWith('http') ? spot.image : (imageMap[spot.image] || '')}
                    alt={spot.title}
                    className="spot-image"
                    loading="lazy"
                />
                {(spot.district || spot.category) && (
                    <span
                        className="category-badge"
                        style={{
                            backgroundColor:
                                CATEGORY_COLORS[spot.category] || '#2d89e5',
                        }}
                    >
                        {spot.district ? spot.district : spot.category}
                    </span>
                )}
                <div className="spot-image-overlay" />
            </div>
            <div className="spot-content">
                <h2 className="spot-title">{spot.title}</h2>
                <p className="spot-description">{spot.excerpt}</p>
                <Link to={`/blog/${spot.id}`} className="read-more-link">
                    <FracturedText text="Read More →" />
                </Link>
            </div>
        </motion.div>
    );
};

export const SkeletonCard = () => {
    return (
        <div className="spot-card skeleton-card">
            <div className="skeleton skeleton-img"></div>
            <div className="spot-content">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text short"></div>
                <div className="skeleton skeleton-btn"></div>
            </div>
        </div>
    );
};

export default SpotCard;
