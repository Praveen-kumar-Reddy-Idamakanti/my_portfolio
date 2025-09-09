import React from "react";
import { cn } from "../lib/utils";
import python from "../assets/python-brands-solid-full.svg";
import node from "../assets/node-js-brands-solid-full.svg";
import react from "../assets/react-brands-solid-full.svg";
import github from "../assets/github-brands-solid-full.svg";

const logos = [
  { src: python, alt: "Python", href: "https://www.python.org" },
  { src: node, alt: "Node.js", href: "https://nodejs.org" },
  { src: react, alt: "React", href: "https://reactjs.org" },
  { src: github, alt: "GitHub", href: "https://github.com" },
];

const Marquee = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 10,
  ...props
}: {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}) => {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

const MarqueeDemo = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-20 md:shadow-xl">
      <Marquee pauseOnHover reverse className="[--duration:20s]">
        {logos.map((logo, idx) => (
          <a href={logo.href} target="_blank" rel="noopener noreferrer">
            <img src={logo.src} alt={logo.alt} key={idx} className="h-12 w-12 mx-4 filter brightness-0 invert" />
          </a>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeDemo;
