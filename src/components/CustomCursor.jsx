import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useDarkMode } from "../context/DarkModeContext";
import "./CustomCursor.css";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const { isDark } = useDarkMode();
    
    // Mouse values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring config for the outer ring
    const springConfig = { damping: 28, stiffness: 200, mass: 0.6 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const updateMousePosition = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable = 
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('.filter-btn') ||
                target.closest('.read-more-link') ||
                target.closest('.gallery-item') ||
                target.closest('input') ||
                target.closest('textarea');
            
            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Premium styling colors
    const activeColor = isDark ? "rgba(56, 139, 253, 0.15)" : "rgba(37, 99, 235, 0.15)";
    const activeBorderColor = isDark ? "rgba(56, 139, 253, 0.5)" : "rgba(37, 99, 235, 0.5)";
    const dotColor = isDark ? "#60a5fa" : "#2563eb"; // Lighter blue in dark mode for pop
    const ringColor = isDark ? "rgba(96, 165, 250, 0.6)" : "rgba(37, 99, 235, 0.6)";

    return (
        <div className="cursor-wrapper">
            {/* The sharp dot that follows the exact cursor */}
            <motion.div
                className="cursor-dot"
                style={{ 
                    x: cursorX, 
                    y: cursorY,
                    backgroundColor: dotColor,
                    boxShadow: `0 0 8px 2px ${activeColor}`
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
            />
            
            {/* The outer ring with smooth lag */}
            <motion.div
                className="cursor-ring"
                style={{ 
                    x: cursorXSpring, 
                    y: cursorYSpring,
                    borderColor: ringColor
                }}
                animate={{
                    scale: isHovering ? 1.6 : 1,
                    backgroundColor: isHovering ? activeColor : "transparent",
                    borderColor: isHovering ? activeBorderColor : ringColor,
                    borderWidth: isHovering ? "1px" : "1.5px"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </div>
    );
};

export default CustomCursor;
