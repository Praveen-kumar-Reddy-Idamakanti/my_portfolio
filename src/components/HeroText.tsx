"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HeroText = () => {
  const text = "Praveen, ";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="text-white"
      initial={{ opacity: 0, y: 50 }} // Initial state: transparent and slightly below
      animate={{ opacity: 1, y: 0 }} // Animate to: fully opaque and in place
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} // Smooth transition with a slight delay
    >
      <div
        className="text-2xl text-left md:text-5xl font-street-drips mb-5 text-white font-800"
      >
        I'm  
      </div>
      <div className="flex flex-wrap justify-left cursor-pointer">
        {text.split('').map((char, index) => (
          <div
            key={index}
            className={`text-6xl md:text-9xl font-street-drips mx-0.5 transition-all duration-500 ease-in-out hover:translate-y-[-35px] hover:text-primary`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {char === ' ' ? '\u00A0' : char}
          </div>
        ))}
      </div>
      <div
        className="text-2xl text-left md:text-5xl space-x-2 tracking-wider font-street-drips mb-5 text-white font-800"
      >
        Software Developer.
      </div>
    </motion.div>
    
  );
};

export default HeroText;