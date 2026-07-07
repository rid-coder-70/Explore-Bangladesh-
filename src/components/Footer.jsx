import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Navigation, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useDarkMode } from '../context/DarkModeContext';

// 1. Move static data outside the component to prevent redeclaration on every render
const SOCIAL_LINKS = [
    { icon: FaFacebookF, color: "hover:bg-[#1877f2] hover:border-[#1877f2] hover:shadow-[#1877f2]/40", name: "Facebook" },
    { icon: FaInstagram, color: "hover:bg-[#e4405f] hover:border-[#e4405f] hover:shadow-[#e4405f]/40", name: "Instagram" },
    { icon: FaTwitter, color: "hover:bg-[#1da1f2] hover:border-[#1da1f2] hover:shadow-[#1da1f2]/40", name: "Twitter" },
    { icon: FaYoutube, color: "hover:bg-[#ff0000] hover:border-[#ff0000] hover:shadow-[#ff0000]/40", name: "YouTube" }
];

const EXPLORE_LINKS = [
    { name: 'Home', path: '/' },
    { name: 'Destinations Gallery', path: '/destinations' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Support', path: '/contact' }
];

const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

export default function Footer() {
    const [email, setEmail] = useState("");
    
    // Assuming your app uses Tailwind's 'dark:' classes via a parent wrapper or HTML tag.
    // We keep the hook in case you need it for logic, but styling is now handled via Tailwind.
    const { isDark } = useDarkMode();

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            toast.success("Thank you for subscribing to our newsletter!");
            setEmail("");
        }
    };

    return (
        <footer className="relative overflow-hidden pt-12 pb-8 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-t border-black/5 dark:border-white/5">
            
            {/* Ambient Background Glows */}
            <div className="absolute -top-[10%] -left-[5%] w-[30%] h-[50%] bg-[radial-gradient(circle,rgba(37,99,235,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,transparent_70%)] blur-[60px] pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[60%] bg-[radial-gradient(circle,rgba(147,51,234,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(147,51,234,0.08)_0%,transparent_70%)] blur-[60px] pointer-events-none" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-12">
                    
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-transform duration-200 group-hover:scale-105">
                                <Navigation size={22} className="-rotate-45 ml-0.5" />
                            </div>
                            <span className="font-extrabold text-[1.4rem] tracking-tight text-slate-900 dark:text-white">
                                Bangla<span className="text-blue-600">Go</span>
                            </span>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[0.95rem] m-0 max-w-[280px]">
                            Your ultimate guide to the most iconic, breathtaking, and culturally rich destinations across Bangladesh.
                        </p>
                        
                        <div className="flex items-center gap-4 mt-2">
                            {SOCIAL_LINKS.map((social, idx) => (
                                <a 
                                    key={idx} 
                                    href="#" 
                                    aria-label={`Visit our ${social.name} page`}
                                    className={`w-[42px] h-[42px] rounded-full flex items-center justify-center bg-white dark:bg-white/5 text-slate-500 dark:text-slate-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-none border border-black/5 dark:border-white/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:text-white hover:shadow-lg ${social.color}`}
                                >
                                    <social.icon size={17} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-[1.05rem] text-slate-900 dark:text-white mb-5 tracking-tight">Explore</h3>
                        <ul className="flex flex-col gap-3">
                            {EXPLORE_LINKS.map((link, i) => (
                                <li key={i}>
                                    <Link 
                                        to={link.path} 
                                        className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 text-[0.95rem] transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-500"
                                    >
                                        <ArrowRight size={14} className="opacity-0 -ml-4 text-blue-600 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-[1.05rem] text-slate-900 dark:text-white mb-5 tracking-tight">Contact Us</h3>
                        <ul className="flex flex-col gap-4">
                            {[
                                { icon: MapPin, text: "123 Explorer Street,<br />Dhaka 1205, Bangladesh" },
                                { icon: Phone, text: "+880 1234 567890" },
                                { icon: Mail, text: "hello@banglago.com" }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="bg-blue-50 dark:bg-blue-600/10 p-2.5 rounded-lg text-blue-600 shrink-0">
                                        <item.icon size={18} />
                                    </div>
                                    <span 
                                        className="text-slate-600 dark:text-slate-400 text-[0.95rem] leading-relaxed mt-0.5"
                                        dangerouslySetInnerHTML={{ __html: item.text }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-[1.05rem] text-slate-900 dark:text-white mb-5 tracking-tight">Newsletter</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-[0.95rem] leading-relaxed mb-5">
                            Subscribe for the latest travel tips, hidden gems, and exclusive updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative w-full" aria-label="Newsletter Subscription Form">
                            <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 pl-4 pr-12 text-slate-900 dark:text-white text-[0.95rem] outline-none shadow-inner transition-all duration-200 focus:border-blue-600 focus:ring-[3px] focus:ring-blue-600/15"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-all duration-200 hover:bg-blue-700 active:scale-95"
                            >
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 pb-4 border-t border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-6">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        © {new Date().getFullYear()} BanglaGo. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm flex-wrap justify-center">
                        {LEGAL_LINKS.map((text, i) => (
                            <Link 
                                key={i} 
                                to="#" 
                                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-200"
                            >
                                {text}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}