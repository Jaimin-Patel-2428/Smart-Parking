import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const MagneticCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse values for the center dot (Instant feedback)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring values for the outer ring (Smooth lag)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.6 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e) => {
      const isInteractive = e.target.closest(
        "button, a, input, textarea, .group",
      );
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block">
      {/* THE OUTER MAGNETIC RING (The laggy circle in your image) */}
      <motion.div
        className="absolute top-0 left-0 w-10 h-10 rounded-full border border-[#FA8112]/60 pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering
            ? "rgba(250, 129, 18, 0.1)"
            : "rgba(250, 129, 18, 0)",
        }}
      />

      {/* THE INNER DOT (Replaces the white arrow) */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 bg-[#FA8112] rounded-full pointer-events-none shadow-[0_0_15px_rgba(250,129,18,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
};

export default MagneticCursor;
