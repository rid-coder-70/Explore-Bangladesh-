import React from "react";
import { Helmet } from "react-helmet-async";
import { FaBullseye, FaCamera, FaGlobe, FaMap, FaUmbrellaBeach, FaTree, FaLeaf, FaWater, FaMountain, FaHistory } from "react-icons/fa";
import styles from "./About.module.css";
import { TypeAnimation } from 'react-type-animation';
import CountUp from 'react-countup';

import destinations from "../data/aboutDestinations.json";

const CATEGORY_MAP = {
  Beach: { color: '#0077b6', icon: <FaUmbrellaBeach /> },
  Forest: { color: '#2d6a4f', icon: <FaTree /> },
  Hill: { color: '#6a4c93', icon: <FaMountain /> },
  Nature: { color: '#52b788', icon: <FaLeaf /> },
  Historical: { color: '#a855f7', icon: <FaHistory /> },
  Wetland: { color: '#0891b2', icon: <FaWater /> },
};

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Explore Bangladesh</title>
        <meta name="description" content="Learn about Explore Bangladesh — your guide to the most beautiful tourist destinations in Bangladesh." />
      </Helmet>

      <div className={styles.about}>
        <div className={styles.aboutHero}>
          <h1>
            <TypeAnimation
              sequence={[
                'About Explore Bangladesh',
                2000,
                'Discover Our Heritage',
                2000,
                'Experience The Culture',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p>
            Your ultimate travel guide to the hidden gems, iconic landscapes,
            and rich cultural heritage of the Land of Rivers.
          </p>
        </div>

        <div className={styles.missionSection}>
          <div className={styles.missionCard}>
            <span className={styles.missionIcon}><FaBullseye /></span>
            <h3>Our Mission</h3>
            <p>
              Inspire locals and international travelers to discover Bangladesh's hidden gems,
              appreciate its rich heritage, and connect with its warm-hearted people.
            </p>
          </div>
          <div className={styles.missionCard}>
            <span className={styles.missionIcon}><FaCamera /></span>
            <h3>What We Do</h3>
            <p>
              We curate stunning travel stories, photography, and destination guides
              covering beaches, forests, hills, wetlands, and historical sites.
            </p>
          </div>
          <div className={styles.missionCard}>
            <span className={styles.missionIcon}><FaGlobe /></span>
            <h3>Join Our Community</h3>
            <p>
              Whether you're planning your next trip or love exploring Bangladesh,
              join us on social media and subscribe for the latest travel updates!
            </p>
          </div>
        </div>

        <h2 className={styles.destHeading}>
          <FaMap style={{ marginRight: '10px' }} />
          <CountUp end={destinations.length} duration={3} /> Popular Destinations
        </h2>
        <div className={styles.destGrid}>
          {destinations.map((dest, i) => {
            const cat = CATEGORY_MAP[dest.category] || { color: '#2d89e5', icon: <FaMap /> };
            return (
              <div key={i} className={styles.destCard}>
                <span className={styles.destEmoji} style={{ color: cat.color }}>{cat.icon}</span>
                <div className={styles.destBody}>
                  <strong>{dest.name}</strong>
                  <p>{dest.desc}</p>
                </div>
                <span
                  className={styles.destBadge}
                  style={{ backgroundColor: cat.color }}
                >
                  {dest.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
