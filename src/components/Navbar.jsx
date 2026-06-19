import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from '../context/DarkModeContext';
import { InteractiveMenu } from './ui/modern-mobile-menu';
import SkyToggle from './ui/sky-toggle';
import { Home, Images, Info, Mail, Navigation, Search } from 'lucide-react';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
];

const mobileNavItems = [
    { label: 'Home',    icon: Home,   href: '/' },
    { label: 'Gallery', icon: Images, href: '/gallery' },
    { label: 'About',   icon: Info,   href: '/about' },
    { label: 'Contact', icon: Mail,   href: '/contact' },
];

export default function Navbar() {
    const { isDark, toggleDark } = useDarkMode();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const pillBg = isDark
        ? scrolled ? 'rgba(15,23,42,0.85)' : 'rgba(15,23,42,0.55)'
        : scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.60)';

    const pillBorder = isDark
        ? scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)'
        : scrolled ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)';

    return (
        <>
            {/* ── Desktop Navbar ── */}
            <motion.header
                style={{
                    display: 'none',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    justifyContent: 'center',
                    padding: '16px 24px 0',
                    pointerEvents: 'none',
                }}
                className="navbar-desktop"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            >
                <nav
                    style={{
                        pointerEvents: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: '1100px',
                        borderRadius: '9999px',
                        padding: '10px 20px 10px 16px',
                        background: pillBg,
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: `1px solid ${pillBorder}`,
                        boxShadow: scrolled
                            ? '0 8px 32px rgba(0,0,0,0.12)'
                            : '0 2px 16px rgba(0,0,0,0.06)',
                        transition: 'background 0.4s ease, box-shadow 0.4s ease',
                        gap: '16px',
                    }}
                >
                    {/* Brand */}
                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            textDecoration: 'none',
                            flexShrink: 0,
                        }}
                    >
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            boxShadow: '0 4px 12px rgba(37,99,235,0.35)',
                            flexShrink: 0,
                        }}>
                            <Navigation size={18} style={{ transform: 'rotate(-45deg)', marginLeft: '1px' }} />
                        </div>
                        <span style={{
                            fontWeight: 800,
                            fontSize: '1.15rem',
                            letterSpacing: '-0.3px',
                            color: isDark ? '#fff' : '#0f172a',
                            whiteSpace: 'nowrap',
                        }}>
                            Bangla<span style={{ color: '#2563eb' }}>Go</span>
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                        borderRadius: '9999px',
                        padding: '4px',
                        flexShrink: 0,
                    }}>
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    style={{
                                        position: 'relative',
                                        display: 'block',
                                        padding: '7px 18px',
                                        borderRadius: '9999px',
                                        fontSize: '0.88rem',
                                        fontWeight: isActive ? 600 : 500,
                                        textDecoration: 'none',
                                        color: isActive
                                            ? '#2563eb'
                                            : isDark ? '#cbd5e1' : '#475569',
                                        background: isActive
                                            ? isDark ? 'rgba(255,255,255,0.1)' : '#fff'
                                            : 'transparent',
                                        boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                                        transition: 'all 0.2s ease',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Actions */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexShrink: 0,
                    }}>
                        <SkyToggle />
                        <Link
                            to="/gallery"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '9px 20px',
                                borderRadius: '9999px',
                                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                color: '#fff',
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.45)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.35)';
                            }}
                        >
                            <Search size={14} />
                            Explore Now
                        </Link>
                    </div>
                </nav>
            </motion.header>

            {/* ── Mobile Top Header ── */}
            <div
                className="navbar-mobile-header"
                style={{
                    display: 'none',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 40,
                    background: isDark ? 'rgba(15,23,42,0.90)' : 'rgba(255,255,255,0.90)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                    padding: '10px 16px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <div style={{
                        width: '32px', height: '32px', borderRadius: '9px',
                        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    }}>
                        <Navigation size={15} style={{ transform: 'rotate(-45deg)', marginLeft: '1px' }} />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '1.05rem', color: isDark ? '#fff' : '#0f172a', letterSpacing: '-0.3px' }}>
                        Bangla<span style={{ color: '#2563eb' }}>Go</span>
                    </span>
                </Link>
                <div style={{ transform: 'scale(0.78)', transformOrigin: 'right center' }}>
                    <SkyToggle />
                </div>
            </div>

            {/* ── Mobile Bottom Navigation ── */}
            <div
                className="navbar-mobile-bottom"
                style={{
                    display: 'none',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    padding: '8px 16px 20px',
                    background: isDark
                        ? 'linear-gradient(to top, rgba(15,23,42,1) 60%, transparent)'
                        : 'linear-gradient(to top, rgba(255,255,255,1) 60%, transparent)',
                    pointerEvents: 'none',
                }}
            >
                <div style={{ pointerEvents: 'auto' }}>
                    <InteractiveMenu
                        items={mobileNavItems}
                        onNavigate={(href) => navigate(href)}
                        accentColor={isDark ? "#60a5fa" : "#2563eb"}
                    />
                </div>
            </div>
        </>
    );
}
