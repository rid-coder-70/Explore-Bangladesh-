import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Navigation, Mail, Globe, ArrowRight, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useDarkMode } from '../context/DarkModeContext';

const SOCIAL_LINKS = [
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/share/1BmG6zZqZg",
    label: "Facebook",
    hoverClass: "hover:bg-[#1877f2] hover:border-[#1877f2] hover:shadow-[#1877f2]/40",
  },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
    hoverClass: "hover:bg-[#e4405f] hover:border-[#e4405f] hover:shadow-[#e4405f]/40",
  },
  {
    icon: FaTwitter,
    href: "#",
    label: "Twitter",
    hoverClass: "hover:bg-[#1da1f2] hover:border-[#1da1f2] hover:shadow-[#1da1f2]/40",
  },
  {
    icon: FaYoutube,
    href: "#",
    label: "YouTube",
    hoverClass: "hover:bg-[#ff0000] hover:border-[#ff0000] hover:shadow-[#ff0000]/40",
  },
];

const EXPLORE_LINKS = [
  { name: "Home", path: "/" },
  { name: "Destinations Gallery", path: "/destinations" },
  { name: "About Us", path: "/about" },
  { name: "Contact Support", path: "/contact" },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

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
    <footer className="relative overflow-hidden pt-16 pb-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-[#0d1117] dark:to-[#0a0e14] border-t border-black/5 dark:border-white/5">

      {/* Ambient glows */}
      <div
        className="absolute -top-[10%] -left-[5%] w-[35%] h-[60%] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", filter: "blur(70px)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[65%] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 70%)", filter: "blur(70px)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-16 relative z-10">

        {/* ── Top grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 pb-12 border-b border-black/5 dark:border-white/5">

          {/* ── Brand ── */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-[0_8px_24px_rgba(37,99,235,0.4)] transition-transform duration-200 group-hover:scale-105">
                <Navigation size={22} className="-rotate-45 ml-0.5" />
              </div>
              <span className="font-extrabold text-[1.45rem] tracking-tight text-slate-900 dark:text-white leading-none">
                Bangla<span className="text-blue-600">Go</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-slate-500 dark:text-slate-400 text-[0.93rem] leading-relaxed max-w-[270px]">
              Your ultimate guide to the most iconic, breathtaking, and culturally rich destinations across Bangladesh.
            </p>

            {/* Powered‑by badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 w-fit">
              <span className="text-blue-700 dark:text-blue-400 text-[0.78rem] font-semibold tracking-wide">
                Powered by Grovegrid
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL_LINKS.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${s.label} page`}
                  className={`w-[40px] h-[40px] rounded-full flex items-center justify-center bg-white dark:bg-white/5 text-slate-500 dark:text-slate-300 shadow-sm border border-black/8 dark:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-lg ${s.hoverClass}`}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h3 className="font-bold text-[1rem] text-slate-900 dark:text-white mb-5 tracking-tight">
              Explore
            </h3>
            <ul className="flex flex-col gap-3.5">
              {EXPLORE_LINKS.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[0.93rem] transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <ArrowRight
                      size={13}
                      className="opacity-0 -ml-4 text-blue-600 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 shrink-0"
                    />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h3 className="font-bold text-[1rem] text-slate-900 dark:text-white mb-5 tracking-tight">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              {/* Website */}
              <li className="flex items-start gap-3">
                <div className="bg-blue-50 dark:bg-blue-600/10 p-2 rounded-lg text-blue-600 shrink-0 mt-0.5">
                  <Globe size={16} />
                </div>
                <a
                  href="https://www.grovegrid.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-slate-400 text-[0.93rem] leading-relaxed hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 break-all"
                >
                  www.grovegrid.site
                </a>
              </li>
              {/* Email */}
              <li className="flex items-start gap-3">
                <div className="bg-blue-50 dark:bg-blue-600/10 p-2 rounded-lg text-blue-600 shrink-0 mt-0.5">
                  <Mail size={16} />
                </div>
                <a
                  href="mailto:grovegridsite@gmail.com"
                  className="text-slate-500 dark:text-slate-400 text-[0.93rem] leading-relaxed hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 break-all"
                >
                  grovegridsite@gmail.com
                </a>
              </li>
              {/* Facebook */}
              <li className="flex items-start gap-3">
                <div className="bg-blue-50 dark:bg-blue-600/10 p-2 rounded-lg text-blue-600 shrink-0 mt-0.5">
                  <FaFacebookF size={15} className="mt-0.5" />
                </div>
                <a
                  href="https://www.facebook.com/share/1BmG6zZqZg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 dark:text-slate-400 text-[0.93rem] leading-relaxed hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Grovegrid on Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* ── Newsletter ── */}
          <div>
            <h3 className="font-bold text-[1rem] text-slate-900 dark:text-white mb-5 tracking-tight">
              Newsletter
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-[0.93rem] leading-relaxed mb-5">
              Subscribe for the latest travel tips, hidden gems, and exclusive updates.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="relative w-full"
              aria-label="Newsletter Subscription Form"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl py-3 pl-4 pr-14 text-slate-900 dark:text-white text-[0.93rem] outline-none shadow-inner transition-all duration-200 focus:border-blue-600 focus:ring-[3px] focus:ring-blue-600/15 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.35)] transition-all duration-200 hover:bg-blue-700 active:scale-95"
              >
                <ArrowRight size={17} />
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          {/* Copyright + Grovegrid credit */}
          <p className="text-slate-400 dark:text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-600 dark:text-slate-300 font-semibold">BanglaGo</span>
            {" "}— A product by{" "}
            <a
              href="https://www.grovegrid.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Grovegrid
            </a>
            . All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((text, i) => (
              <Link
                key={i}
                to="#"
                className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-200"
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