import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaMapMarkedAlt, FaHome, FaImages } from 'react-icons/fa';
import './NotFound.css';

export default function NotFound() {
    return (
        <>
            <Helmet>
                <title>404 — Page Not Found | Explore Bangladesh</title>
            </Helmet>
            <div className="nf-wrapper">
                <div className="nf-box">
                    <div className="nf-emoji"><FaMapMarkedAlt /></div>
                    <h1 className="nf-code">404</h1>
                    <h2 className="nf-title">Page Not Found</h2>
                    <p className="nf-desc">
                        Oops! Looks like you took a wrong turn on your journey.<br />
                        This page doesn't exist — but Bangladesh does!
                    </p>
                    <div className="nf-actions">
                        <Link to="/" className="nf-btn primary"><FaHome style={{ marginRight: '8px' }} /> Back to Home</Link>
                        <Link to="/gallery" className="nf-btn secondary"><FaImages style={{ marginRight: '8px' }} /> View Gallery</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
