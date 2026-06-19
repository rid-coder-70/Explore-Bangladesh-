import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaImages, FaSearchPlus, FaTimes, FaUmbrellaBeach, FaTree, FaMountain, FaLeaf, FaHistory, FaWater, FaGlobe } from 'react-icons/fa';
import blogData from '../data/posts.json';
import '../styles/pages/Gallery.css';
import importImages from '../utils/imageLoader';
import { RocketLoader } from '../components/ui/rocket-loader';

const CATEGORY_MAP = {
    Beach: { color: '#0077b6', icon: <FaUmbrellaBeach /> },
    Forest: { color: '#2d6a4f', icon: <FaTree /> },
    Hill: { color: '#6a4c93', icon: <FaMountain /> },
    Nature: { color: '#52b788', icon: <FaLeaf /> },
    Historical: { color: '#c77dff', icon: <FaHistory /> },
    Wetland: { color: '#48cae4', icon: <FaWater /> },
};

const CATEGORIES = [
    { label: 'All', icon: <FaGlobe /> },
    { label: 'Beach', icon: <FaUmbrellaBeach /> },
    { label: 'Forest', icon: <FaTree /> },
    { label: 'Hill', icon: <FaMountain /> },
    { label: 'Nature', icon: <FaLeaf /> },
    { label: 'Historical', icon: <FaHistory /> },
    { label: 'Wetland', icon: <FaWater /> },
];

// Per-image lazy loader wrapper
const LazyGalleryImg = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {!loaded && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eff6ff', borderRadius: 'inherit' }}>
                    <RocketLoader scale={0.7} />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={className}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
            />
        </div>
    );
};

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [lightboxImg, setLightboxImg] = useState(null);
    const [lightboxTitle, setLightboxTitle] = useState('');
    const [lightboxId, setLightboxId] = useState(null);
    const [visible, setVisible] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        // Simulate brief load for page entry
        const t = setTimeout(() => setPageLoading(false), 1200);
        return () => clearTimeout(t);
    }, []);

    const filtered = blogData.filter(
        spot => activeCategory === 'All' || spot.category === activeCategory
    );

    const openLightbox = (imgKey, title, id) => {
        setLightboxImg(importImages[imgKey]);
        setLightboxTitle(title);
        setLightboxId(id);
        setVisible(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setVisible(false);
        document.body.style.overflow = '';
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    if (pageLoading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
                <RocketLoader />
                <p style={{ color: '#2563eb', fontWeight: 600, fontSize: '1rem' }}>Loading Gallery…</p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Photo Gallery | BanglaGo</title>
                <meta
                    name="description"
                    content="Browse stunning photos of Bangladesh's most beautiful tourist destinations."
                />
            </Helmet>

            <div className="gallery-wrapper">


                <div className="gallery-header">
                    <h1><FaImages style={{ marginRight: '15px', verticalAlign: 'middle' }} /> Photo Gallery</h1>
                    <p>Browse stunning visuals from Bangladesh's most beautiful destinations</p>
                </div>



                <div className="gallery-filters">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.label}
                            id={`gallery-filter-${cat.label.toLowerCase()}`}
                            className={`gallery-filter-btn${activeCategory === cat.label ? ' active' : ''}`}
                            onClick={() => setActiveCategory(cat.label)}
                        >
                            <span style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>
                                {cat.icon}
                            </span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                <p className="gallery-count">
                    {filtered.length} destination{filtered.length !== 1 ? 's' : ''}
                </p>



                <div className="gallery-grid">
                    {filtered.map(spot => (
                        <div
                            key={spot.id}
                            className="gallery-item"
                            onClick={() => openLightbox(spot.image, spot.title, spot.id)}
                            role="button"
                            tabIndex={0}
                            aria-label={`View ${spot.title}`}
                            onKeyDown={e => e.key === 'Enter' && openLightbox(spot.image, spot.title, spot.id)}
                        >
                            <LazyGalleryImg
                                src={importImages[spot.image]}
                                alt={spot.title}
                                className="gallery-img"
                            />
                            <div className="gallery-item-overlay">
                                <span
                                    className="gallery-badge"
                                    style={{ backgroundColor: (CATEGORY_MAP[spot.category] || { color: '#2d89e5' }).color }}
                                >
                                    {spot.category}
                                </span>
                                <p className="gallery-item-title">{spot.title}</p>
                                <span className="gallery-zoom-icon"><FaSearchPlus /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            {visible && (
                <div className="lightbox-backdrop" onClick={closeLightbox}>
                    <div className="lightbox-box" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox} aria-label="Close"><FaTimes /></button>
                        <img src={lightboxImg} alt={lightboxTitle} className="lightbox-img" />
                        <div className="lightbox-footer">
                            <p className="lightbox-title">{lightboxTitle}</p>
                            <Link
                                to={`/blog/${lightboxId}`}
                                className="lightbox-link"
                                onClick={closeLightbox}
                            >
                                View Full Details →
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
