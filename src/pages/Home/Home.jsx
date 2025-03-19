import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { About } from "../About/About";
import { Courses } from "../Course/Courses";
import { Instructor } from "../Instructor/Instructor";
import { Blog } from "../Blog/Blog";
import Testimonials from "../Testimonial/Testimonials";
import "./Home.css";

// Import images for the carousel
import image1 from "../../components/assets/images/carousel1.jpg";
import image2 from "../../components/assets/images/carousel2.jpg";
import image3 from "../../components/assets/images/carousel3.jpg";

export const Home = () => {
  return (
    <>
      <HomeContent />

      <SectionWrapper initialX={-100} initialY={0}>
        <About />
      </SectionWrapper>

      <SectionWrapper initialX={100} initialY={0}>
        <Courses />
      </SectionWrapper>

      <SectionWrapper initialX={-100} initialY={0}>
        <Instructor />
      </SectionWrapper>

      <SectionWrapper initialX={100} initialY={0}>
        <Blog />
      </SectionWrapper>

      <SectionWrapper initialX={0} initialY={100}>
        <Testimonials />
      </SectionWrapper>
    </>
  );
};

// Reusable Section Wrapper Component
const SectionWrapper = ({ children, initialX, initialY }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ x: 0, y: 0, opacity: 1 }); // Start animation after mount
  }, [controls]);

  return (
    <motion.div
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{ position: "relative" }} // Prevent layout shifts
    >
      {children}
    </motion.div>
  );
};

// HomeContent Component
export const HomeContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const images = [image1, image2, image3];
  const quotes = [
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "The beautiful thing about learning is that no one can take it away from you. - B.B. King",
    "An investment in knowledge pays the best interest. - Benjamin Franklin",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 }); // Start animation after mount
  }, [controls]);

  return (
    <section className="h-[92vh] md:h-screen relative overflow-hidden">
      {/* Carousel with Slide Animation */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: index === currentIndex ? 1 : 0, x: index === currentIndex ? 0 : 50 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{ zIndex: index === currentIndex ? 1 : 0 }} // Ensure correct stacking order
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={controls}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-4 text-yellow-400 drop-shadow-lg"
          style={{ fontFamily: "Arial, sans-serif", position: "relative" }} // Prevent layout shifts
        >
          BEST E-LEARNING PLATFORM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl mb-8 max-w-2xl text-white drop-shadow-lg"
          style={{ fontFamily: "Arial, sans-serif", position: "relative" }} // Prevent layout shifts
        >
          {quotes[currentIndex]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
          style={{ position: "relative" }} // Prevent layout shifts
        >
          <button
            onClick={() => console.log("Read More button clicked!")}
            className="cursor-pointer bg-blue-600 text-white py-3 px-6 rounded-md text-sm font-semibold 
            hover:bg-black hover:text-white active:scale-95 transition duration-300 shadow-lg 
            hover:shadow-xl shadow-blue-500/50"
          >
            Read More
          </button>
          <button
            onClick={() => console.log("Join Now button clicked!")}
            className="cursor-pointer bg-green-600 text-white py-3 px-6 rounded-md text-sm font-semibold 
            hover:bg-black hover:text-white active:scale-95 transition duration-300 shadow-lg 
            hover:shadow-xl shadow-green-500/50"
          >
            Join Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;