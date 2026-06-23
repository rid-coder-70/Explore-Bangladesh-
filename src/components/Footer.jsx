import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Navigation, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useDarkMode } from '../context/DarkModeContext';

export default function Footer() {
    const [email, setEmail] = useState("");
    const { isDark } = useDarkMode();

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            toast.success("Thank you for subscribing to our newsletter!");
            setEmail("");
        }
    };

    return (
        <footer
            className="footer-main"
            style={{ 
                paddingTop: '5rem',
                background: isDark 
                    ? 'linear-gradient(to bottom, #0f172a, #020617)' 
                    : 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
                borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Ambient Background Glows */}
            <div style={{
                position: 'absolute', top: '-10%', left: '-5%', width: '30%', height: '50%',
                background: isDark ? 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '60%',
                background: isDark ? 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(147,51,234,0.04) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none'
            }} />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-16">
                    
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6 lg:pr-4">
                        <Link to="/" className="flex items-center gap-2 group w-fit" style={{ textDecoration: 'none' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '12px',
                                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                                boxShadow: '0 8px 24px rgba(37,99,235,0.35)',
                                transition: 'transform  0.2s var(--ease-expo)'
                            }} className="group-hover:scale-105">
                                <Navigation size={22} style={{ transform: 'rotate(-45deg)', marginLeft: '2px' }} />
                            </div>
                            <span style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px', color: isDark ? '#fff' : '#0f172a' }}>
                                Bangla<span style={{ color: '#2563eb' }}>Go</span>
                            </span>
                        </Link>
                        <p style={{ color: isDark ? '#94a3b8' : '#475569', lineHeight: 1.7, fontSize: '0.95rem' }}>
                            Your ultimate guide to the most iconic, breathtaking, and culturally rich
                            destinations across Bangladesh.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            {[
                                { icon: FaFacebookF, color: '#1877f2' },
                                { icon: FaInstagram, color: '#e4405f' },
                                { icon: FaTwitter,   color: '#1da1f2' },
                                { icon: FaYoutube,   color: '#ff0000' }
                            ].map((social, idx) => (
                                <a key={idx} href="#" 
                                    style={{
                                        width: '42px', height: '42px', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                                        color: isDark ? '#cbd5e1' : '#64748b',
                                        boxShadow: isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.05)',
                                        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.03)',
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = social.color;
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = `0 10px 20px ${social.color}40`;
                                        e.currentTarget.style.borderColor = social.color;
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : '#fff';
                                        e.currentTarget.style.color = isDark ? '#cbd5e1' : '#64748b';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 12px rgba(0,0,0,0.05)';
                                        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.03)';
                                    }}
                                >
                                    <social.icon size={17} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: isDark ? '#fff' : '#0f172a', marginBottom: '1.5rem', letterSpacing: '-0.3px' }}>Explore</h3>
                        <ul className="flex flex-col gap-3.5">
                            {['Home', 'Destinations Gallery', 'About Us', 'Contact Support'].map((link, i) => {
                                const path = link === 'Home' ? '/' : `/${link.split(' ')[0].toLowerCase()}`;
                                return (
                                <li key={i}>
                                    <Link to={path} 
                                        className="group flex items-center gap-2"
                                        style={{ color: isDark ? '#94a3b8' : '#475569', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s ease' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#2563eb'}
                                        onMouseLeave={e => e.currentTarget.style.color = isDark ? '#94a3b8' : '#475569'}
                                    >
                                        <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" style={{ color: '#2563eb' }} />
                                        <span>{link}</span>
                                    </Link>
                                </li>
                            )})}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: isDark ? '#fff' : '#0f172a', marginBottom: '1.5rem', letterSpacing: '-0.3px' }}>Contact Us</h3>
                        <ul className="flex flex-col gap-5">
                            <li className="flex items-start gap-4">
                                <div style={{ background: isDark ? 'rgba(37,99,235,0.1)' : '#eff6ff', padding: '10px', borderRadius: '10px', color: '#2563eb' }}>
                                    <MapPin size={18} />
                                </div>
                                <span style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '2px' }}>
                                    123 Explorer Street,<br />Dhaka 1205, Bangladesh
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div style={{ background: isDark ? 'rgba(37,99,235,0.1)' : '#eff6ff', padding: '10px', borderRadius: '10px', color: '#2563eb' }}>
                                    <Phone size={18} />
                                </div>
                                <span style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.95rem' }}>+880 1234 567890</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div style={{ background: isDark ? 'rgba(37,99,235,0.1)' : '#eff6ff', padding: '10px', borderRadius: '10px', color: '#2563eb' }}>
                                    <Mail size={18} />
                                </div>
                                <span style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.95rem' }}>hello@banglago.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: isDark ? '#fff' : '#0f172a', marginBottom: '1.5rem', letterSpacing: '-0.3px' }}>Newsletter</h3>
                        <p style={{ color: isDark ? '#94a3b8' : '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                            Subscribe for the latest travel tips, hidden gems, and exclusive updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    background: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
                                    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
                                    borderRadius: '12px',
                                    padding: '14px 48px 14px 16px',
                                    color: isDark ? '#fff' : '#0f172a',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    boxShadow: isDark ? 'inset 0 2px 4px rgba(0,0,0,0.2)' : 'inset 0 2px 4px rgba(0,0,0,0.02)',
                                    transition: 'border-color  0.2s var(--ease-expo), box-shadow 0.2s var(--ease-expo)'
                                }}
                                onFocus={e => {
                                    e.target.style.borderColor = '#2563eb';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.15)';
                                }}
                                onBlur={e => {
                                    e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
                                    e.target.style.boxShadow = isDark ? 'inset 0 2px 4px rgba(0,0,0,0.2)' : 'inset 0 2px 4px rgba(0,0,0,0.02)';
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    position: 'absolute', right: '6px', top: '6px', bottom: '6px',
                                    aspectRatio: '1/1',
                                    background: '#2563eb', color: '#fff',
                                    borderRadius: '8px', border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
                                    transition: 'background 0.2s ease, transform 0.2s ease'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                                onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
                                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    paddingTop: '2rem', paddingBottom: '1rem',
                    borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                    display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem'
                }}>
                    <p style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.88rem' }}>
                        © {new Date().getFullYear()} BanglaGo. All rights reserved.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.88rem' }}>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((text, i) => (
                            <Link key={i} to="#" 
                                style={{ color: isDark ? '#64748b' : '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = isDark ? '#cbd5e1' : '#475569'}
                                onMouseLeave={e => e.currentTarget.style.color = isDark ? '#64748b' : '#94a3b8'}
                            >
                                {text}
                            </Link>
                        ))}
                    </div>
                </div>
                
                <style>
                {`
                    .footer-safe-area { display: block; height: 120px; width: 100%; }
                    @media (min-width: 768px) { .footer-safe-area { display: none; } }
                `}
                </style>
                <div className="footer-safe-area"></div>
            </div>
        </footer>
    );
}
