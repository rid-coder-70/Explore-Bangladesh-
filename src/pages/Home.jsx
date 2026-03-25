import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaGlobe, FaUmbrellaBeach, FaMapMarkerAlt } from 'react-icons/fa';
import { motion, useScroll, useSpring as useFramerSpring, AnimatePresence } from 'framer-motion';
import Hero from '../components/common/Hero';
import FilterSection from '../components/common/FilterSection';
import SpotCard, { SkeletonCard } from '../components/common/SpotCard';
import './Home.css';

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>BanglaGo — Discover Amazing Destinations</title>
                <meta
                    name="description"
                    content="Explore the most iconic tourist destinations of BanglaGo — beaches, forests, hills, historical sites and more."
                />
            </Helmet>

            <motion.div
                className="scroll-progress-bar"
                style={{ scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'var(--accent)', transformOrigin: '0%', zIndex: 9999 }}
            />

            <div className="home-wrapper">
                <Hero 
                    heroBgs={heroBgs}
                    heroBgIdx={heroBgIdx}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    touristCount={touristSpots.length}
                    divisionCount={DIVISIONS.length - 1}
                />

                <FilterSection 
                    searchQuery={searchQuery}
                    activeDivision={activeDivision}
                    handleDivisionChange={handleDivisionChange}
                    activeDistrict={activeDistrict}
                    setActiveDistrict={setActiveDistrict}
                    districtsForDivision={districtsForDivision}
                    divisions={DIVISIONS}
                    loading={loading}
                    filteredCount={filteredSpots.length}
                />

                <motion.div 
                    className="spot-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <motion.div 
                                    key={`skeleton-${i}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <SkeletonCard />
                                </motion.div>
                            ))
                        ) : filteredSpots.length === 0 ? (
                            <motion.div 
                                key="no-results"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="no-results"
                                style={{ gridColumn: '1 / -1' }}
                            >
                                <div className="no-results-icon"><FaUmbrellaBeach /></div>
                                <p>No destinations found</p>
                                <button
                                    className="no-results-reset"
                                    onClick={() => { setSearchQuery(''); handleDivisionChange('All'); }}
                                >
                                    Reset Filters
                                </button>
                            </motion.div>
                        ) : (
                            filteredSpots.map((spot, index) => (
                                <motion.div
                                    key={spot.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <SpotCard 
                                        spot={spot}
                                        index={index}
                                        isMobile={isMobile}
                                    />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>
            </div >
        </>
    );
};

export default Home;
