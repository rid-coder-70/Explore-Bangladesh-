import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo3.png';
import { useDarkMode } from '../context/DarkModeContext';
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const { isDark, toggleDark } = useDarkMode();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const menuVariants = {
        closed: { x: "100%", transition: { type: "tween", duration: 0.3 } },
        open: { 
            x: 0, 
            transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 20, 
                staggerChildren: 0.1, 
                delayChildren: 0.1 
            } 
        }
    };

    const itemVariants = {
        closed: { x: 20, opacity: 0 },
        open: { x: 0, opacity: 1 }
    };

    const links = [
        { path: '/', label: 'Home' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' }
    ];

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="navbar-brand">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/" onClick={closeMenu} className="brand-link">
                        <img src={logo} alt="Explore Bangladesh Logo" className="logo-img" />
                        <div className="logo_bounce">
                            <span className="text-full">Explore Bangladesh</span>
                            <span className="text-mobile">Explore BD</span>
                        </div>
                    </Link>
                </motion.div>
            </div>

            <motion.div 
                className={`menu-icon ${isOpen ? 'open' : ''}`} 
                onClick={toggleMenu}
                whileTap={{ scale: 0.8 }}
            >
                {isOpen ? <FaTimes /> : <FaBars />}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div 
                            className="nav-overlay" 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMenu}
                        />
                        <motion.ul 
                            className="nav-links"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            {links.map((link) => (
                                <motion.li key={link.path} variants={itemVariants}>
                                    <Link to={link.path} onClick={closeMenu}>
                                        <motion.span
                                            style={{ display: 'inline-block' }}
                                            whileHover={{ x: 10, color: 'var(--accent)' }}
                                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        >
                                            {link.label}
                                        </motion.span>
                                    </Link>
                                </motion.li>
                            ))}
                            <motion.li className="nav-item-btn" variants={itemVariants}>
                                <motion.button
                                    className="dark-mode-btn"
                                    onClick={() => { toggleDark(); closeMenu(); }}
                                    whileHover={{ scale: 1.1, rotate: isDark ? 20 : -20 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Toggle dark mode"
                                >
                                    {isDark ? <FaSun className="day-mode-anim" /> : <FaMoon />}
                                </motion.button>
                            </motion.li>
                        </motion.ul>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Links */}
            <ul className="nav-links desktop-only">
                {links.map((link) => (
                    <li key={link.path}>
                        <Link to={link.path}>
                            <motion.span
                                style={{ display: 'inline-block' }}
                                whileHover={{ y: -3, color: 'var(--accent)' }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {link.label}
                            </motion.span>
                        </Link>
                    </li>
                ))}
                <li>
                    <motion.button
                        className="dark-mode-btn"
                        onClick={toggleDark}
                        whileHover={{ scale: 1.1, rotate: isDark ? 20 : -20 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? <FaSun className="day-mode-anim" /> : <FaMoon />}
                    </motion.button>
                </li>
            </ul>
        </motion.nav>
    );
}
