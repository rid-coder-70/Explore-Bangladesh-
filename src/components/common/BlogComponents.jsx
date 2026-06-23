import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Slider from "react-slick";
import {
    FaMapMarkerAlt, FaCalendarAlt, FaBus, FaHiking,
    FaUtensils, FaPalette, FaImages, FaShareAlt,
    FaDirections, FaWhatsapp, FaLink, FaCloudSun, FaWind, FaLocationArrow, FaRoute
} from "react-icons/fa";
import imageMap from '../../utils/imageLoader';
import { getWeatherCodeData } from '../../utils/weatherUtils';

export const LiveWeather = ({ district, division }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!district) return;
            try {
                // 1. Get coordinates for district
                let geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${district.split('/')[0]}&count=1&language=en&format=json`);
                let geoData = await geoRes.json();

                // Fallback to division if district not found
                if ((!geoData.results || geoData.results.length === 0) && division) {
                    geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${division.split('/')[0]}&count=1&language=en&format=json`);
                    geoData = await geoRes.json();
                }

                if (geoData.results && geoData.results.length > 0) {
                    const { latitude, longitude } = geoData.results[0];
                    // 2. Get weather for coordinates
                    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                    const weatherData = await weatherRes.json();

                    if (weatherData.current_weather) {
                        setWeather(weatherData.current_weather);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch weather", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [district]);

    if (loading) {
        return (
            <div className="essentials-card skeleton" style={{ height: '140px', marginBottom: '2rem' }}></div>
        );
    }

    if (!weather) return null;

    const weatherInfo = getWeatherCodeData(weather.weathercode);

    return (
        <div className="essentials-card" style={{ marginBottom: '2rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaCloudSun style={{ color: '#2563eb' }} /> Live Weather
            </h4>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '3.5rem', lineHeight: '1' }}>{weatherInfo.icon}</span>
                    <div>
                        <div className="weather-temp" style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1' }}>
                            {Math.round(weather.temperature)}°C
                        </div>
                        <div className="weather-desc" style={{ fontSize: '0.95rem', fontWeight: '600', marginTop: '4px' }}>
                            {weatherInfo.label}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
                    <div className="weather-desc" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600' }}>
                        <FaWind style={{ color: '#2563eb' }} /> {weather.windspeed} km/h
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DistanceToDestination = ({ district, division, locationUrl }) => {
    const [distance, setDistance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const extractCoordinates = (url) => {
        if (!url) return null;
        const exactMatch = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
        if (exactMatch) return { lat: parseFloat(exactMatch[1]), lon: parseFloat(exactMatch[2]) };
        const atMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        if (atMatch) return { lat: parseFloat(atMatch[1]), lon: parseFloat(atMatch[2]) };
        return null;
    };

    useEffect(() => {
        const fetchDistance = async () => {
            if (!navigator.geolocation) {
                setError("Geolocation is not supported by your browser");
                setLoading(false);
                return;
            }

            navigator.geolocation.getCurrentPosition(async (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;

                try {
                    let destLat, destLon;
                    const coords = extractCoordinates(locationUrl);

                    if (coords) {
                        destLat = coords.lat;
                        destLon = coords.lon;
                    } else if (district) {
                        let geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${district.split('/')[0]}&count=1&language=en&format=json`);
                        let geoData = await geoRes.json();

                        if ((!geoData.results || geoData.results.length === 0) && division) {
                            geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${division.split('/')[0]}&count=1&language=en&format=json`);
                            geoData = await geoRes.json();
                        }

                        if (geoData.results && geoData.results.length > 0) {
                            destLat = geoData.results[0].latitude;
                            destLon = geoData.results[0].longitude;
                        }
                    }

                    if (destLat && destLon) {
                        const dist = calculateDistance(userLat, userLon, destLat, destLon);
                        setDistance(Math.round(dist));
                    } else {
                        setError("Destination location not found");
                    }
                } catch (err) {
                    setError("Failed to fetch location data");
                } finally {
                    setLoading(false);
                }
            }, (err) => {
                setError("Location access denied.");
                setLoading(false);
            });
        };

        fetchDistance();
    }, [district, division, locationUrl]);

    if (loading) {
        return (
            <div className="essentials-card" style={{ marginBottom: '2rem', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
                    <FaLocationArrow style={{ fontSize: '1.5rem', animation: 'pulse-spin 2s infinite' }} />
                    <span style={{ fontWeight: '600' }}>Getting your location...</span>
                    <span style={{ fontSize: '0.8rem' }}>(Please allow location access)</span>
                </div>
            </div>
        );
    }

    if (error && !distance) {
        return (
            <div className="essentials-card" style={{ marginBottom: '2rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaLocationArrow style={{ color: '#2563eb' }} /> Distance
                </h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{error}</div>
            </div>
        );
    }

    if (!distance) return null;

    return (
        <div className="essentials-card" style={{ marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
            {/* Background aesthetic watermark */}
            <FaRoute style={{ position: 'absolute', right: '-15px', bottom: '-15px', fontSize: '120px', color: 'var(--text-color)', opacity: 0.03, transform: 'rotate(-10deg)', pointerEvents: 'none' }} />
            
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div style={{ background: 'rgba(37, 99, 235, 0.1)', padding: '8px 10px', borderRadius: '12px', display: 'flex', color: '#2563eb' }}>
                    <FaLocationArrow />
                </div>
                Distance From You
            </h4>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 1 }}>
                <div style={{ 
                    fontSize: '3.5rem', 
                    fontWeight: '900', 
                    lineHeight: '1',
                    background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {distance}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text-color)', lineHeight: '1' }}>km</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Away</span>
                </div>
            </div>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Straight-line calculation</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)' }}></div>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#10b981' }}>Live</span>
                </div>
            </div>
        </div>
    );
};
export const TravelerEssentials = ({ blog }) => (
    <div className="essentials-card" style={{ marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ padding: '6px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px', display: 'flex' }}>
                <FaMapMarkerAlt />
            </span>
            Traveler's Essentials
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* District */}
            <div style={{ background: 'var(--bg-color)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>District</div>
                <div style={{ fontWeight: '700', color: 'var(--text-color)', fontSize: '0.95rem' }}>{blog.district}</div>
            </div>
            {/* Best Time */}
            <div style={{ background: 'var(--bg-color)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Best Time</div>
                <div style={{ fontWeight: '700', color: 'var(--text-color)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaCalendarAlt style={{ color: '#f59e0b' }}/> {blog.bestTime || "Year round"}
                </div>
            </div>
            {/* Transport */}
            <div style={{ background: 'var(--bg-color)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Transport</div>
                <div style={{ fontWeight: '700', color: 'var(--text-color)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaBus style={{ color: '#3b82f6' }}/> {blog.transport || "Bus/Train"}
                </div>
            </div>
            {/* Difficulty */}
            <div style={{ background: 'var(--bg-color)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Difficulty</div>
                <div style={{ fontWeight: '700', color: 'var(--text-color)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaHiking style={{ color: '#8b5cf6' }}/> {blog.difficulty || "Easy"}
                </div>
            </div>
        </div>
    </div>
);

export const CulturalHighlights = ({ highlights }) => {
    if (!highlights) return null;
    return (
        <div className="cultural-card" style={{ padding: '24px', borderRadius: '16px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
                <span style={{ padding: '6px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', borderRadius: '8px', display: 'flex' }}>
                    <FaPalette />
                </span>
                Cultural Highlights
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'linear-gradient(to right, rgba(245, 158, 11, 0.05), transparent)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid #f59e0b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaUtensils size={14} />
                        </div>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--text-color)' }}>Local Foods</strong>
                    </div>
                    <p style={{ fontFamily: '"Hind Siliguri", sans-serif', fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '4px', lineHeight: '1.5' }}>{highlights.localFoods.bn}</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{highlights.localFoods.en}"</p>
                </div>

                <div style={{ background: 'linear-gradient(to right, rgba(139, 92, 246, 0.05), transparent)', padding: '16px', borderRadius: '12px', borderLeft: '3px solid #8b5cf6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaPalette size={14} />
                        </div>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--text-color)' }}>Traditional Crafts</strong>
                    </div>
                    <p style={{ fontFamily: '"Hind Siliguri", sans-serif', fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '4px', lineHeight: '1.5' }}>{highlights.traditionalCrafts.bn}</p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{highlights.traditionalCrafts.en}"</p>
                </div>
            </div>
        </div>
    );
};

export const VisualJourney = ({ images, onImageClick, sliderSettings }) => {
    if (!images || images.length === 0) return null;
    return (
        <div className="more-img-box">
            <h3 className="section-title">
                <FaImages className="icon-mar" /> Visual Journey
            </h3>
            <p className="gallery-tip">Click any image to view in full screen</p>
            <div className="slider-wrapper">
                <Slider {...sliderSettings}>
                    {images.map((imgName, index) => (
                        <div key={index} className="slide-item" onClick={() => onImageClick(imgName)}>
                            <img
                                src={imageMap[imgName]}
                                alt={`View ${index + 1}`}
                                className="slider-img"
                                style={{ cursor: 'zoom-in' }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export const VisitActions = ({ locationUrl, onWhatsAppShare, onCopyLink }) => (
    <div className="share-navigate-section">
        <div className="section-header">
            <h3><FaShareAlt className="icon-mar" /> Plan Your Visit</h3>
            <p>Share this destination with fellow explorers or get exact coordinates.</p>
        </div>

        <div className="visit-actions-grid">
            <div className="map-preview-card">
                <div className="map-placeholder">
                    <FaMapMarkerAlt className="map-pin-anim" />
                    <span>Google Maps Ready</span>
                </div>
                {locationUrl && (
                    <a
                        href={locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-directions"
                    >
                        <FaDirections /> Get Directions
                    </a>
                )}
            </div>

            <div className="share-links-box">
                <h4>Share with Friends</h4>
                <div className="share-buttons">
                    <button className="share-btn whatsapp" onClick={onWhatsAppShare}>
                        <FaWhatsapp /> WhatsApp
                    </button>
                    <button className="share-btn copy-link" onClick={onCopyLink}>
                        <FaLink /> Copy Link
                    </button>
                </div>
            </div>
        </div>
    </div>
);
