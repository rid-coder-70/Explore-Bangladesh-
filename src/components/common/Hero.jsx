import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';
import { FaPlane, FaSearch, FaTimes, FaArrowDown } from 'react-icons/fa';
import imageMap from '../../utils/imageLoader';

const Hero = ({ heroBgs, heroBgIdx, searchQuery, setSearchQuery, touristCount, divisionCount }) => {
    return (
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
                            <CountUp end={touristCount > 0 ? touristCount : 20} duration={3} />+
                        </strong>
                        <span>Destinations</span>
                    </div>
                    <div className="hero-stat-divider" />
                    <div className="hero-stat">
                        <strong>
                            <CountUp end={touristCount > 0 ? touristCount * 5 : 100} duration={3} />+
                        </strong>
                        <span>Photos</span>
                    </div>
                    <div className="hero-stat-divider" />
                    <div className="hero-stat">
                        <strong>
                            <CountUp end={divisionCount} duration={3} />
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
    );
};

export default Hero;
