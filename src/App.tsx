import React, { useRef } from 'react';
import './App.css';
import ShaderBackground from './components/ShaderBackground';
import SparkleNavbar from "./components/SparleNav";
import HeroText from './components/HeroText';
import { DotBackground } from './components/GridBackground';
import { ScrollTimeline, TimelineEvent } from './components/ScrollTimeLine';
import ZoomOnScrollSection from './components/ZoomOnScrollSection';
import PerspectiveContactForm from './components/PerspectiveContactForm';
import { motion, useScroll, useTransform } from 'framer-motion'; // Import motion and scroll utilities
import SlidingLogoMarquee from './components/SlidingLogoMarque';
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from './components/3dScorollTrigger'; // Import 3D Scroll Trigger components
import TerminalCard from './components/TerminalCard';

const timelineEvents: TimelineEvent[] = [
  {
    year: "2023",
    title: "Started a New Project",
    subtitle: "Side Hustle",
    description: "Began working on a new and exciting project that solves a real-world problem.",
  },
  {
    year: "2022",
    title: "Mastered a New Skill",
    subtitle: "React & TypeScript",
    description: "Deepened my knowledge of front-end development by mastering React and TypeScript.",
  },
  {
    year: "2021",
    title: "Contributed to Open Source",
    subtitle: "Framer Motion",
    description: "Made my first significant contribution to a popular open-source library.",
  },
  {
    year: "2020",
    title: "Graduated University",
    subtitle: "Computer Science",
    description: "Completed my degree in Computer Science with a focus on Human-Computer Interaction.",
  },
  {
    year: "2019",
    title: "Graduated University",
    subtitle: "Computer Science",
    description: "Completed my degree in Computer Science with a focus on Human-Computer Interaction.",
  },
];



function App() {
  const threeDScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: threeDScrollRef,
    offset: ['start end', 'end start']
  });
  const zIndex = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [10, 20, 10]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.6, 1, 1, 0.6]
  );
  // Smooth zoom in effect while scrolling down
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 0.9, 1.1, 1.2]
  );
  
  // Parallax effect for depth
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '-20%']
  );
  
  // 3D rotation for more dynamic effect
  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 5]
  );
  
  // Perspective for 3D effect
  const perspective = useTransform(
    scrollYProgress,
    [0, 1],
    [1000, 500]
  );
  
  // Container style for 3D effect
  const containerStyle = {
    perspective: perspective,
    transformStyle: 'preserve-3d' as const,
  };
  return (
    <div className="relative w-full min-h-screen bg-black">
      <div className="fixed inset-0 z-0">
        <ShaderBackground />
      </div>
      <div className="relative z-10 h-screen flex flex-col"> {/* Removed items-center justify-center */}
        <div className="absolute top-0 w-full">
            {/* <div className="container mx-auto px-4 py-6 flex justify-center">
              <SparkleNavbar items={['Home', 'About', 'Projects', 'Contact']} color="#FFFFFF"/>
            </div> */}
        </div>
        {/* Centered Hero Content */}
        <div className="flex-grow flex items-center justify-center mt-10"> {/* This div will center the content */}
          <div className="container px-12 py-6 flex justify-center items-center mb-20">
            <HeroText />
            <div className="w-[450px] h-[450px] ml-20">
              <div className="w-full h-full bg-white rounded-full overflow-hidden">
                <motion.img
                  src="./Avatar.png"
                  alt=""
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Marquee at the bottom */}
        <div className="absolute bottom-0 w-full mb-[-65px] "> {/* Removed mt-auto */}
          <SlidingLogoMarquee />
        </div>
      </div>
      <div className="relative z-10">
        <DotBackground>
          <ScrollTimeline
            events={timelineEvents}
            title="My Journey"
            subtitle="A brief history of my experiences and achievements."
            cardAlignment="alternating"
            cardEffect="glow"
            revealAnimation="fade"
            darkMode={true}
          />
        </DotBackground>
      </div>
     
      <div className="relative z-10">
        <ZoomOnScrollSection />
      </div>
       {/* New 3D Scroll Trigger Section */}
       {/* New 3D Scroll Trigger Section */}
       <motion.div
         ref={threeDScrollRef}
         style={{
           ...containerStyle,
           zIndex: zIndex,
           opacity: opacity,
           position: 'relative',
           minHeight: '100vh',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           backgroundColor: 'black',
           padding: '4rem 0',
           overflow: 'hidden',
           willChange: 'transform, opacity, perspective',
           transform: `translateY(${y}) scale(${scale}) rotateX(${rotateX}deg)`,
           transformOrigin: 'center center',
           transition: 'transform 0.3s ease-out',
         }}
       >
         <ThreeDScrollTriggerContainer>
           <ThreeDScrollTriggerRow baseVelocity={-5} direction={-1}> {/* Experiment with baseVelocity and direction */}
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-blue-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-blue-400 text-sm font-mono mb-1">React</div>
               <div className="text-xl font-bold mb-1">Frontend</div>
               <div className="text-xs text-gray-400">Next.js, TypeScript, Tailwind</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-green-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-green-400 text-sm font-mono mb-1">Node.js</div>
               <div className="text-xl font-bold mb-1">Backend</div>
               <div className="text-xs text-gray-400">Express, NestJS, GraphQL</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-purple-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-purple-400 text-sm font-mono mb-1">MongoDB</div>
               <div className="text-xl font-bold mb-1">Database</div>
               <div className="text-xs text-gray-400">MongoDB, PostgreSQL, Redis</div>
             </div>
           </ThreeDScrollTriggerRow>
           <ThreeDScrollTriggerRow baseVelocity={5} direction={1}>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-yellow-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 hover:border-yellow-500 hover:scale-105">
               <div className="text-yellow-400 text-sm font-mono mb-1">Docker</div>
               <div className="text-xl font-bold mb-1">DevOps</div>
               <div className="text-xs text-gray-400">Kubernetes, AWS, GitHub Actions</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-red-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 hover:border-red-500 hover:scale-105">
               <div className="text-red-400 text-sm font-mono mb-1">Python</div>
               <div className="text-xl font-bold mb-1">Data Science</div>
               <div className="text-xs text-gray-400">Pandas, NumPy, PyTorch</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-pink-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 hover:border-pink-500 hover:scale-105">
               <div className="text-pink-400 text-sm font-mono mb-1">Web3</div>
               <div className="text-xl font-bold mb-1">Blockchain</div>
               <div className="text-xs text-gray-400">Solidity, Hardhat, Ethers.js</div>
             </div>
           </ThreeDScrollTriggerRow>
           <ThreeDScrollTriggerRow baseVelocity={-8} direction={-1}>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-cyan-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-cyan-400 text-sm font-mono mb-1">TypeScript</div>
               <div className="text-xl font-bold mb-1">Full Stack</div>
               <div className="text-xs text-gray-400">React, Node, Express, MongoDB</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-emerald-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-emerald-400 text-sm font-mono mb-1">GraphQL</div>
               <div className="text-xl font-bold mb-1">API Development</div>
               <div className="text-xs text-gray-400">Apollo Server, TypeGraphQL</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-violet-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-violet-400 text-sm font-mono mb-1">Next.js</div>
               <div className="text-xl font-bold mb-1">React Framework</div>
               <div className="text-xs text-gray-400">Server Components, API Routes</div>
             </div>
           </ThreeDScrollTriggerRow>
           <ThreeDScrollTriggerRow baseVelocity={8} direction={1}>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-orange-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-orange-400 text-sm font-mono mb-1">AWS</div>
               <div className="text-xl font-bold mb-1">Cloud Services</div>
               <div className="text-xs text-gray-400">EC2, S3, Lambda, RDS</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-rose-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-rose-400 text-sm font-mono mb-1">Git</div>
               <div className="text-xl font-bold mb-1">Version Control</div>
               <div className="text-xs text-gray-400">GitHub, GitLab, Bitbucket</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-lime-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-lime-400 text-sm font-mono mb-1">Jest</div>
               <div className="text-xl font-bold mb-1">Testing</div>
               <div className="text-xs text-gray-400">Jest, React Testing Library, Cypress</div>
             </div>
           </ThreeDScrollTriggerRow>
           <ThreeDScrollTriggerRow baseVelocity={-10} direction={-1}>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-indigo-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-indigo-400 text-sm font-mono mb-1">Tailwind CSS</div>
               <div className="text-xl font-bold mb-1">Styling</div>
               <div className="text-xs text-gray-400">CSS Modules, Styled Components</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-amber-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-amber-400 text-sm font-mono mb-1">Figma</div>
               <div className="text-xl font-bold mb-1">Design</div>
               <div className="text-xs text-gray-400">UI/UX, Prototyping, Wireframing</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-sky-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-sky-400 text-sm font-mono mb-1">Firebase</div>
               <div className="text-xl font-bold mb-1">Backend as a Service</div>
               <div className="text-xs text-gray-400">Authentication, Firestore, Storage</div>
             </div>
           </ThreeDScrollTriggerRow>
           <ThreeDScrollTriggerRow baseVelocity={10} direction={1}>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-teal-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-teal-400 text-sm font-mono mb-1">REST API</div>
               <div className="text-xl font-bold mb-1">API Development</div>
               <div className="text-xs text-gray-400">Express, FastAPI, Django REST</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-fuchsia-500/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300 ">
               <div className="text-fuchsia-400 text-sm font-mono mb-1">WebSockets</div>
               <div className="text-xl font-bold mb-1">Real-time</div>
               <div className="text-xs text-gray-400">Socket.io, Pusher, Firebase</div>
             </div>
             <div className="relative group text-white w-[320px] mb-2 h-[110px] p-4 border-2 border-rose-400/30 bg-gray-900/80 backdrop-blur-sm rounded-lg mx-2 transition-all duration-300  ">
               <div className="text-rose-300 text-sm font-mono mb-1">CI/CD</div>
               <div className="text-xl font-bold mb-1">DevOps</div>
               <div className="text-xs text-gray-400">GitHub Actions, Jenkins, CircleCI</div>
             </div>
           </ThreeDScrollTriggerRow>
         </ThreeDScrollTriggerContainer>
       </motion.div>
      
     
          
      
      {/* Contact Form Section */}
      <div className="relative z-10">
        <PerspectiveContactForm />
      </div>
    </div>
  );
}

export default App;