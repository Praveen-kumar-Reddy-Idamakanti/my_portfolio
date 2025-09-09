import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import emailjs from '@emailjs/browser';



const PerspectiveContactForm = () => {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formElement = useRef<HTMLFormElement>(null);
  const { scrollYProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scale from 0.8 to 1.1 based on scroll position
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  
  // Opacity based on scroll position
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Y position for subtle floating effect
  const y = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -100]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isSent) return;
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = event.clientX - left - width / 2;
    const y = event.clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isSent) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!formElement.current) return;
    
    setIsLoading(true);
    
    try {
      // Get EmailJS credentials from environment variables
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';
      
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your .env file.');
      }
      
      await emailjs.sendForm(serviceId, templateId, formElement.current, publicKey);
      
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={formRef} className="relative bg-gradient-to-b from-gray-900 to-black text-white py-40 px-4 overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <div className="container mx-auto text-center mb-12">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground mt-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a project in mind? I'd love to hear from you.
        </motion.p>
      </div>
      <motion.div
        style={{ y, opacity, scale }}
        className="w-full max-w-2xl mx-auto relative"
      >
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "800px" }}
          className="w-full"
        >
        <motion.form
          ref={formElement}
          onSubmit={handleSubmit}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500"
        >
          {/* Front side of the form */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: isSent ? 0 : 1, scale: isSent ? 0.1 : 1 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="mb-6" style={{ transform: "translateZ(20px)" }}>
              <label htmlFor="name" className="block text-left text-sm font-medium mb-2 text-cyan-100">Name</label>
              <motion.input
                whileFocus={{ scale: 1.05, y: -5 }}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600/50"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-6" style={{ transform: "translateZ(20px)" }}>
              <label htmlFor="email" className="block text-left text-sm font-medium mb-2 text-cyan-100">Email</label>
              <motion.input
                whileFocus={{ scale: 1.05, y: -5 }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600/50"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-8" style={{ transform: "translateZ(20px)" }}>
              <label htmlFor="message" className="block text-left text-sm font-medium mb-2 text-cyan-100">Message</label>
              <motion.textarea
                whileFocus={{ scale: 1.05, y: -5 }}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-gray-900/50 border border-gray-700/50 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600/50"
                placeholder="Your Message"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0, 255, 252, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold py-3.5 px-6 rounded-lg text-lg shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Send Message'}
            </motion.button>
          </motion.div>

          {/* Success message */}
          {isSent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-cyan-900/30 to-gray-900/90 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 mb-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Message Sent!</h3>
              <p className="text-lg">Your message has been sent successfully.</p>
            </motion.div>
          )}
        </motion.form>

        
        </div>
      </motion.div>
    </section>
  );
};

export default PerspectiveContactForm;