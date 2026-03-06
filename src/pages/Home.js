import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    FaPlane, FaSearch, FaTimes, FaGlobe, FaUmbrellaBeach, FaArrowDown, FaMapMarkerAlt
} from 'react-icons/fa';
import imageMap from '../utils/imageLoader';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';
import { motion, useScroll, useSpring as useFramerSpring } from 'framer-motion';
import './Home.css';



function SkeletonCard() {
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
}



function FracturedText({ text }) {
    return (
        <>
            {text.split('').map((char, i) => (
                <span key={i}>{char}</span>
            ))}
        </>
    );
}



const DIVISIONS = [
    { label: 'All', icon: <FaGlobe /> },
    { label: 'Dhaka', icon: <FaMapMarkerAlt /> },
    { label: 'Chittagong', icon: <FaMapMarkerAlt /> },
    { label: 'Sylhet', icon: <FaMapMarkerAlt /> },
    { label: 'Khulna', icon: <FaMapMarkerAlt /> },
    { label: 'Rajshahi', icon: <FaMapMarkerAlt /> },
    { label: 'Barisal', icon: <FaMapMarkerAlt /> },
    { label: 'Rangpur', icon: <FaMapMarkerAlt /> },
    { label: 'Mymensingh', icon: <FaMapMarkerAlt /> }
];

const CATEGORY_COLORS = {
    Beach: '#0077b6',
    Forest: '#2d6a4f',
    Hill: '#6a4c93',
    Nature: '#52b788',
    Historical: '#c77dff',
    Wetland: '#48cae4',
};



const heroBgs = ['coxsbazar2.jpg', 'bandarban.jpg', 'tanguarhaor1.jpg', 'srimangal1.jpg'];

const Home = () => {
    const [touristSpots, setTouristSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDivision, setActiveDivision] = useState('All');
    const [activeDistrict, setActiveDistrict] = useState('All');
    const [heroBgIdx, setHeroBgIdx] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleX = useFramerSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const handleDivisionChange = (div) => {
        setActiveDivision(div);
        setActiveDistrict('All');
    };



    useEffect(() => {
        const timer = setInterval(() => {
            setHeroBgIdx(i => (i + 1) % heroBgs.length);
        }, 5000);
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 640);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            clearInterval(timer);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);



    useEffect(() => {
        import('../data/posts.json')
            .then(module => {
                setTimeout(() => {
                    setTouristSpots(module.default);
                    setLoading(false);
                }, 700);
            })
            .catch(err => console.error('Failed to load tourist spots:', err));
    }, []);



    const filteredSpots = touristSpots.filter(spot => {
        const matchDiv = activeDivision === 'All' || spot.division === activeDivision;
        const matchDist = activeDistrict === 'All' || (spot.district && spot.district.includes(activeDistrict));
        const matchSearch =
            spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            spot.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (spot.division && spot.division.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (spot.district && spot.district.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchDiv && matchDist && matchSearch;
    });

    const districtsForDivision = activeDivision === 'All'
        ? []
        : [...new Set(touristSpots.filter(s => s.division === activeDivision).map(s => s.district).flatMap(d => d ? d.split('/') : []))].sort();

    return (
        <>
            <Helmet>
                <title>Explore Bangladesh — Discover Amazing Destinations</title>
                <meta
                    name="description"
                    content="Explore the most iconic tourist destinations of Bangladesh — beaches, forests, hills, historical sites and more."
                />
            </Helmet>

            <motion.div
                className="scroll-progress-bar"
                style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)', transformOrigin: '0%', zIndex: 9999 }}
            />

            <div className="home-wrapper">


                <div
                    className="hero-section"
                    style={{ backgroundImage: `url(${imageMap[heroBgs[heroBgIdx]]})` }}
                >
                    <div className="hero-overlay" />
                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                    >
                        <motion.p
                            className="hero-tagline"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <FaPlane style={{ marginRight: '8px' }} /> Your Ultimate Travel Guide
                        </motion.p>

                        <motion.h1
                            className="hero-title"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <TypeAnimation
                                sequence={[
                                    'Discover the Beauty of',
                                    1500,
                                    'Explore the Wonders of',
                                    1500,
                                    'Experience the Magic of',
                                    1500,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            /><br />
                            <span className="hero-highlight">Bangladesh</span>
                        </motion.h1>

                        <motion.p
                            className="hero-subtitle"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            Explore breathtaking landscapes, ancient history, pristine beaches,
                            and vibrant culture across one of South Asia's most captivating destinations.
                        </motion.p>

                        <motion.div
                            className="hero-search-bar"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            whileFocus={{ scale: 1.05 }}
                        >
                            <span className="search-icon"><FaSearch /></span>
                            <input
                                id="hero-search"
                                type="text"
                                className="hero-search-input"
                                placeholder="Search destinations…"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                aria-label="Search destinations"
                            />
                            {searchQuery && (
                                <button
                                    className="search-clear"
                                    onClick={() => setSearchQuery('')}
                                    aria-label="Clear search"
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </motion.div>

                        <motion.div
                            className="hero-stats"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            <div className="hero-stat">
                                <strong>
                                    <CountUp end={touristSpots.length > 0 ? touristSpots.length : 20} duration={3} />+
                                </strong>
                                <span>Destinations</span>
                            </div>
                            <div className="hero-stat-divider" />
                            <div className="hero-stat">
                                <strong>
                                    <CountUp end={touristSpots.length > 0 ? touristSpots.length * 5 : 100} duration={3} />+
                                </strong>
                                <span>Photos</span>
                            </div>
                            <div className="hero-stat-divider" />
                            <div className="hero-stat">
                                <strong>
                                    <CountUp end={DIVISIONS.length - 1} duration={3} />
                                </strong>
                                <span>Divisions</span>
                            </div>
                        </motion.div>
                    </motion.div>



                    <div className="scroll-indicator">
                        <span>Scroll to explore</span>
                        <div className="scroll-arrow"><FaArrowDown /></div>
                    </div>
                </div>



                <motion.div
                    className="filter-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="section-title">
                        {searchQuery
                            ? `Results for "${searchQuery}"`
                            : 'Explore Destinations'}
                    </h2>
                    <div className="category-filters" role="group" aria-label="Filter by division">
                        {DIVISIONS.map(div => (
                            <button
                                key={div.label}
                                id={`filter-${div.label.toLowerCase()}`}
                                className={`filter-btn${activeDivision === div.label ? ' active' : ''}`}
                                onClick={() => handleDivisionChange(div.label)}
                            >
                                <span className="filter-emoji">{div.icon}</span>
                                {div.label}
                            </button>
                        ))}
                    </div>

                    {activeDivision !== 'All' && districtsForDivision.length > 0 && (
                        <div className="category-filters district-filters" style={{ marginTop: '10px' }} role="group" aria-label="Filter by district">
                            <button
                                className={`filter-btn district-btn${activeDistrict === 'All' ? ' active' : ''}`}
                                onClick={() => setActiveDistrict('All')}
                                style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
                            >
                                All Districts
                            </button>
                            {districtsForDivision.map(dist => (
                                <button
                                    key={dist}
                                    className={`filter-btn district-btn${activeDistrict === dist ? ' active' : ''}`}
                                    onClick={() => setActiveDistrict(dist)}
                                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
                                >
                                    {dist}
                                </button>
                            ))}
                        </div>
                    )}

                    {!loading && (
                        <p className="results-count">
                            {filteredSpots.length === 0
                                ? 'No results found'
                                : `Showing ${filteredSpots.length} destination${filteredSpots.length !== 1 ? 's' : ''}`}
                        </p>
                    )}
                </motion.div>



                <div className="spot-container">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                    ) : filteredSpots.length === 0 ? (
                        <div className="no-results">
                            <div className="no-results-icon"><FaUmbrellaBeach /></div>
                            <p>No destinations found</p>
                            <button
                                className="no-results-reset"
                                onClick={() => { setSearchQuery(''); handleDivisionChange('All'); }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    ) : (
                        filteredSpots.map((spot, index) => {
                            // Calculate dynamic X offset for mobile alternating animation
                            let initialX = 0;
                            if (isMobile) {
                                initialX = index % 2 === 0 ? -100 : 100;
                            }

                            return (
                                <motion.div
                                    key={spot.id}
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
                        })
                    )}
                </div>
            </div >
        </>
    );
};

export default Home;
