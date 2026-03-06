import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo3.png';
import { useDarkMode } from '../context/DarkModeContext';
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Navbar() {
    const { isDark, toggleDark } = useDarkMode();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 90, damping: 15 }}
        >
            <div className="navbar-brand">
                <Link to="/" onClick={closeMenu} className="brand-link">
                    <img src={logo} alt="Explore Bangladesh Logo" className="logo-img" />
                    <div className="logo_bounce">
                        {/* <span className="text-full">
                            <span>E</span><span>x</span><span>p</span><span>l</span>
                            <span>o</span><span>r</span><span>e</span>
                            <span>&nbsp;</span><span>B</span><span>a</span><span>n</span>
                            <span>g</span><span>l</span><span>a</span><span>d</span>
                            <span>e</span><span>s</span><span>h</span>
                        </span> */}
                        <span className="text-mobile">
                            <span>E</span><span>x</span><span>p</span><span>l</span><span>o</span><span>r</span><span>e</span><span>&nbsp;</span><span>B</span><span>D</span>
                        </span>
                    </div>
                </Link>
            </div>

            <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>

            <div className={`nav-overlay ${isOpen ? 'active' : ''}`} onClick={closeMenu}></div>

            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                {[
                    { path: '/', label: 'Home' },
                    { path: '/gallery', label: 'Gallery' },
                    { path: '/about', label: 'About' },
                    { path: '/contact', label: 'Contact' }
                ].map((link) => (
                    <li key={link.path}>
                        <Link to={link.path} onClick={closeMenu}>
                            {link.label.split('').map((char, i) => (
                                <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
                            ))}
                        </Link>
                    </li>
                ))}
                <li className="nav-item-btn">
                    <button
                        className="dark-mode-btn"
                        onClick={() => { toggleDark(); closeMenu(); }}
                        aria-label="Toggle dark mode"
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDark ? <FaSun className="day-mode-anim" /> : <FaMoon />}
                    </button>
                </li>
            </ul>
        </motion.nav>
    );
}
