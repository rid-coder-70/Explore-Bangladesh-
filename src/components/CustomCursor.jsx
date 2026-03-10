import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useDarkMode } from "../context/DarkModeContext";
import "./CustomCursor.css";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const { isDark } = useDarkMode();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
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
                target.closest('.gallery-item');
            
            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Cursor colors based on theme
    const activeColor = isDark ? "rgba(56, 139, 253, 0.4)" : "rgba(37, 99, 235, 0.2)";
    const dotColor = isDark ? "#388bfd" : "#2563eb";

    return (
        <div className="cursor-wrapper">
            <motion.div
                className="cursor-dot"
                style={{ 
                    x: cursorX, 
                    y: cursorY,
                    backgroundColor: dotColor
                }}
            />
            <motion.div
                className="cursor-ring"
                style={{ 
                    x: cursorXSpring, 
                    y: cursorYSpring,
                    borderColor: dotColor
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    backgroundColor: isHovering ? activeColor : "rgba(0,0,0,0)",
                    borderWidth: isHovering ? "0px" : "2px"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
        </div>
    );
};

export default CustomCursor;
