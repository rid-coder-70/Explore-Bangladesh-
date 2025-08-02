import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo1.png';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={logo} alt="Explore Bangladesh Logo" className="logo-img" />
                <div className="logo_bounce">
                    <span>E</span><span>x</span><span>p</span><span>l</span>
                    <span>o</span><span>r</span><span>e</span>
                    <sapn> </sapn> <span>B</span><span>a</span><span>n</span>
                    <span>g</span><span>l</span><span>a</span><span>d</span>
                    <span>e</span><span>s</span><span>h</span>
                </div>
            </div>
            <ul className="nav-links">
                <li><Link to="/">
                    <span>H</span><span>o</span><span>m</span><span>e</span>
                </Link></li>
                <li><Link to="/about">
                    <span>A</span><span>b</span><span>o</span><span>u</span><span>t</span>
                </Link></li>
                <li><Link to="/contact">
                    <span>C</span><span>o</span><span>n</span><span>t</span>
                    <span>a</span><span>c</span><span>t</span>
                </Link></li>
            </ul>
        </nav >
    );
}
