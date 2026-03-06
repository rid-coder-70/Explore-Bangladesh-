import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./CustomCursor.css";

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);

    // Directly track raw mouse values outside of React render cycle
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Apply silky smooth spring physics to the tracking
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const updateMousePosition = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            // Extensive check for anything clickable / interactive
            if (
                e.target.tagName.toLowerCase() === 'button' ||
                e.target.tagName.toLowerCase() === 'a' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                e.target.closest('.filter-btn') ||
                e.target.tagName.toLowerCase() === 'svg'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Tiny solid dot directly tracks mouse instantly */}
            <motion.div
                className="cursor-dot"
                style={{ x: cursorX, y: cursorY }}
            />

            {/* Aura ring tracks smoothly behind */}
            <motion.div
                className="cursor-ring"
                style={{ x: cursorXSpring, y: cursorYSpring }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </>
    );
};

export default CustomCursor;
