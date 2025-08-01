import React from "react";
import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.about}>
      <h1>About Explore Bangladesh</h1>
      <p>
        This blog shares amazing travel experiences, places, and culture from all around Bangladesh.
      </p>
      <p>
        Created by a passionate traveler and blogger who loves to explore the beauty of Bangla.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to inspire both locals and international travelers to discover the hidden gems of Bangladesh, appreciate its rich heritage, and connect with its warm-hearted people.
      </p>

      <h2>Popular Destinations</h2>
      <ul>
        <li><strong>Cox's Bazar:</strong> The world's longest natural sandy sea beach.</li>
        <li><strong>Sundarbans:</strong> The largest mangrove forest and home to the Royal Bengal Tiger.</li>
        <li><strong>Srimangal:</strong> Known as the tea capital of Bangladesh with lush green landscapes.</li>
        <li><strong>Saint Martin's Island:</strong> A beautiful coral island in the Bay of Bengal.</li>
        <li><strong>Jaflong:</strong> Famous for its picturesque hills and crystal-clear rivers.</li>
        <li><strong>Tanguar Haor:</strong> A vast wetland ecosystem, perfect for bird watching.</li>
        <li><strong>Bandarban:</strong> A hilly district full of waterfalls, tribal villages, and scenic beauty.</li>
        <li><strong>Hakaluki Haor:</strong> One of the largest marsh wetlands in Asia and a birdwatcher's paradise.</li>
        <li><strong>Kuakata Sea Beach:</strong> Known as the “Daughter of the Sea,” where both sunrise and sunset are visible.</li>
        <li><strong>Rangamati:</strong> A peaceful lake district with tribal culture and natural beauty.</li>
        <li><strong>Sada Pathor (Bholaganj):</strong> A stunning stone river area surrounded by hills and clear water.</li>
      </ul>

      <h2>Join Our Community</h2>
      <p>
        Whether you're planning your next trip or simply love learning about different cultures,
        we invite you to explore, share, and be part of the Explore Bangla community.
        Follow us on social media and subscribe to our newsletter for the latest updates and travel tips!
      </p>

      <div className={styles.socialLinks}>
        <a
          href="https://facebook.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className={styles.facebook}
        >
          <i className="fab fa-facebook-square"></i>
        </a>

        <a
          href="https://instagram.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={styles.instagram}
        >
          <i className="fab fa-instagram"></i>
        </a>

        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className={styles.twitter}
        >
          <i className="fab fa-twitter-square"></i>
        </a>

        <a
          href="https://youtube.com/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className={styles.youtube}
        >
          <i className="fab fa-youtube-square"></i>
        </a>
      </div>
    </div>
  );
}
