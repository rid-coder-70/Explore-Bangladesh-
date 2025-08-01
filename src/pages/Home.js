import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Required for <Link>
import imageMap from '../assets/imageImports';
import './Home.css';
function FracturedText({ text }) {
    return (
        <>
            {text.split('').map((char, i) => (
                <span key={i}>{char}</span>
            ))}
        </>
    );
}
const Home = () => {
    const [touristSpots, setTouristSpots] = useState([]);

    useEffect(() => {
        import('../data/posts.json')
            .then(module => {
                setTouristSpots(module.default);
            })
            .catch(err => console.error('Failed to load tourist spots:', err));
    }, []);

    return (
        <div className="home-wrapper">
            <div className="header">
                <h1>Explore Bangladesh</h1>
                <p>Discover the beauty of Bangladesh through its most iconic tourist destinations.</p>
            </div>

            <div className="spot-container">
                {touristSpots.length === 0 ? (
                    <p>Loading tourist spots...</p>
                ) : (
                    touristSpots.map(spot => (
                        <div key={spot.id} className="spot-card">
                            <div className="spot-image-wrapper">
                                <img
                                    src={imageMap[spot.image] || ''}
                                    alt={spot.title}
                                    className="spot-image"
                                />
                            </div>
                            <div className="spot-content">
                                <h2 className="spot-title">{spot.title}</h2>
                                <p className="spot-description">{spot.excerpt}</p>
                                <Link to={`/blog/${spot.id}`} className="read-more-link">
                                    <FracturedText text="Read More →" />
                                </Link>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
