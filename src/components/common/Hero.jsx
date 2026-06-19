import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaSearch, FaTimes } from 'react-icons/fa';
import CountUp from 'react-countup';
import { TypeAnimation } from 'react-type-animation';
import { AnimatedBackgroundLines } from '../ui/animated-background-lines';
import importImages from '../../utils/imageLoader';

const bangladeshImages = [
  { id: 0,  src: importImages['ahsanmanzil.jpg'] },
  { id: 1,  src: importImages['sundarbans1.jpg'] },
  { id: 2,  src: importImages['lalbaghfort.jpg'] },
  { id: 3,  src: importImages['jaflong.jpg'] },
  { id: 4,  src: importImages['srimangal.jpg'] },
  { id: 5,  src: importImages['shaatgambujmosque.jpg'] },
  { id: 6,  src: importImages['coxsbazar.jpg'] },
  { id: 7,  src: importImages['sajek.jpg'] },
  { id: 8,  src: importImages['ratargul.jpg'] },
  { id: 9,  src: importImages['kuakataseabeach.jpg'] },
  { id: 10, src: importImages['bandarban.jpg'] },
  { id: 11, src: importImages['bandarban1.jpg'] },
  { id: 12, src: importImages['tanguarhaor1.jpg'] },
  { id: 13, src: importImages['tanguarhaor.jpg'] },
  { id: 14, src: importImages['paharpur.jpg'] },
  { id: 15, src: importImages['stmartin.jpg'] },
];


const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const generateSquares = () =>
  shuffle(bangladeshImages).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundImage: `url(${sq.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  ));

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  useEffect(() => {
    shuffleSquares();
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div
      className="shuffle-grid-inner"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        height: '460px',
        gap: '6px',
      }}
    >
      {squares}
    </div>
  );
};

const Hero = ({ searchQuery, setSearchQuery, touristCount, divisionCount }) => {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <AnimatedBackgroundLines />
      <section style={{
        position: 'relative',
        zIndex: 10,
        display: 'grid',
        alignItems: 'center',
        gap: '48px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 32px 80px',
        minHeight: '90vh',
      }}
        className="hero-grid-section"
      >
        {/* Left: Text Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#2563eb',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '16px',
          }}
        >
          <FaPlane /> Your Ultimate Travel Guide
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '800',
            lineHeight: '1.15',
            color: 'var(--text-color, #0f172a)',
            marginBottom: '16px',
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
          />
          <br />
          <span style={{ color: '#2563eb' }}>Bangladesh</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '1rem',
            color: 'var(--text-muted, #4b5563)',
            lineHeight: '1.7',
            marginBottom: '28px',
            maxWidth: '480px',
          }}
        >
          Explore breathtaking landscapes, ancient history, pristine beaches,
          and vibrant culture across one of South Asia's most captivating destinations.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '4px 4px 4px 16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            maxWidth: '480px',
            marginBottom: '36px',
          }}
        >
          <FaSearch style={{ color: '#94a3b8', flexShrink: 0 }} />
          <input
            id="hero-search"
            type="text"
            placeholder="Search destinations…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search destinations"
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              padding: '10px 12px',
              flex: 1,
              fontSize: '0.95rem',
              color: '#0f172a',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#94a3b8',
                padding: '8px',
              }}
            >
              <FaTimes />
            </button>
          )}
          <button
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.background = '#2563eb'}
          >
            Search
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          {[
            { end: touristCount > 0 ? touristCount : 35, label: 'Destinations', suffix: '+' },
            { end: touristCount > 0 ? touristCount * 5 : 175, label: 'Photos', suffix: '+' },
            { end: divisionCount || 8, label: 'Divisions', suffix: '' },
          ].map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div style={{ width: '1px', height: '40px', background: '#e2e8f0' }} />}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <strong style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-color, #0f172a)', lineHeight: 1 }}>
                  <CountUp end={stat.end} duration={3} />{stat.suffix}
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #6b7280)', fontWeight: '500' }}>
                  {stat.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Right: Shuffle Grid (hidden on small screens via CSS) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="hero-shuffle-grid"
      >
        <ShuffleGrid />
      </motion.div>
    </section>
    </div>
  );
};

export default Hero;
