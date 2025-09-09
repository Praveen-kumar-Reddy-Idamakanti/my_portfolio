"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const content = [
  {
    src: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Projects",
  },
  {
    src: "./CloudShield.png",
    description: "Anomaly Detection Engine",
  },
  {
    src: "./PMS.png",
    description: "Project Management System",
  },
  {
    src: "./SCH.png",
    description: "Social Privacy Hub",
  },
];

const ImageSection = ({ src, description, scrollYProgress, index, numImages }: { src: string; description: string; scrollYProgress: MotionValue<number>; index: number; numImages: number; }) => {
  const sectionStart = index / numImages;
  const sectionEnd = (index + 1) / numImages;
  const isProjects = description === 'Projects';

  const opacity = useTransform(scrollYProgress,
    [sectionStart, sectionStart + 0.1, sectionEnd - 0.1, sectionEnd],
    [index === 0 ? 1 : 0, 1, 1, 0]
  );

  // Scale animation with four values for smoother transitions
  const scale = useTransform(
    scrollYProgress,
    isProjects 
      ? [sectionStart, sectionStart + 0.3, sectionStart + 0.7,sectionStart + 1.2, sectionStart + 1.6, sectionEnd] 
      : [sectionStart, sectionStart,sectionStart + 0.3, sectionEnd, sectionEnd, sectionEnd],
    isProjects 
      ? [2, 2.5, 3, 3.5, 4, 3.5]  // Scale: 1x → 2x → 3.5x → 1x for Projects
      : [1, 1, 1.2, 1.2,1.2,1.2] // Normal scale for other sections
  );

  return (
    <motion.div
      className="absolute inset-0 h-full w-full"
      style={{ opacity, scale }}
    >
      <img src={src} alt={description} className="h-full w-full object-cover blur-sm" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-8">
        <motion.div className="relative">
          <motion.p 
            className={`text-3xl md:text-5xl font-bold text-center max-w-4xl leading-tight p-4 ${
              description === 'Projects' ? '' : 'text-white'
            }`}
            style={
              description === 'Projects' 
                ? {
                    background: 'linear-gradient(45deg, #ffffff, #a5b4fc, rgb(0, 251, 255), rgb(0, 251, 255), #6366f1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '300% 300%',
                    animation: 'gradient 8s ease infinite'
                  }
                : {}
            }
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ZoomOnScrollSection = () => {
  // Add keyframes for gradient animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(style);

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const numImages = content.length;

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {content.map((item, i) => {
          return (
            <ImageSection
              key={item.src}
              src={item.src}
              description={item.description}
              scrollYProgress={scrollYProgress}
              index={i}
              numImages={numImages}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ZoomOnScrollSection;