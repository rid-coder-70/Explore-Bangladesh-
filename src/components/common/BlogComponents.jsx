import React from 'react';
import { motion } from 'framer-motion';
import Slider from "react-slick";
import { 
    FaMapMarkerAlt, FaCalendarAlt, FaBus, FaHiking, 
    FaUtensils, FaPalette, FaImages, FaShareAlt, 
    FaDirections, FaWhatsapp, FaLink 
} from "react-icons/fa";
import imageMap from '../../utils/imageLoader';

export const TravelerEssentials = ({ blog }) => (
    <div className="essentials-card">
        <h4>Traveler's Essentials</h4>
        <div className="essential-item">
            <FaMapMarkerAlt className="e-icon" />
            <div>
                <strong>District</strong>
                <span>{blog.district}</span>
            </div>
        </div>
        <div className="essential-item">
            <FaCalendarAlt className="e-icon" />
            <div>
                <strong>Best Time</strong>
                <span>{blog.bestTime || "Year round"}</span>
            </div>
        </div>
        <div className="essential-item">
            <FaBus className="e-icon" />
            <div>
                <strong>Transport</strong>
                <span>{blog.transport || "Bus/Train"}</span>
            </div>
        </div>
        <div className="essential-item">
            <FaHiking className="e-icon" />
            <div>
                <strong>Difficulty</strong>
                <span>{blog.difficulty || "Easy"}</span>
            </div>
        </div>
    </div>
);

export const CulturalHighlights = ({ highlights }) => {
    if (!highlights) return null;
    return (
        <div className="cultural-card">
            <h4>Cultural Highlights</h4>
            <div className="cultural-item">
                <div className="c-icon-box gold">
                    <FaUtensils />
                </div>
                <div className="cultural-info">
                    <strong>Local Foods</strong>
                    <p className="bn-text">{highlights.localFoods.bn}</p>
                    <p className="en-text">{highlights.localFoods.en}</p>
                </div>
            </div>
            <div className="cultural-item">
                <div className="c-icon-box purple">
                    <FaPalette />
                </div>
                <div className="cultural-info">
                    <strong>Traditional Crafts</strong>
                    <p className="bn-text">{highlights.traditionalCrafts.bn}</p>
                    <p className="en-text">{highlights.traditionalCrafts.en}</p>
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
