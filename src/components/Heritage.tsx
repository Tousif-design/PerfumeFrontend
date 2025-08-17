// At the top of the file
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import Image1 from '../Assets/pic15.png';
import Image2 from '../Assets/pic10.png';
import Image3 from '../Assets/pic9.png';


const heritageData = [
  {
    title: "Our Heritage",
    description:
      "At Premium Ittars, we are dedicated to crafting the finest natural perfumes using traditional methods passed down through generations. Our journey began with a passion for authentic fragrances and a commitment to purity. We believe in the power of nature to create scents that are not only beautiful but also evoke a sense of well-being and connection to ancient traditions.",
    image:
    Image1,
    stat: "10+",
    statLabel: "Years of Expertise",
    bg: "from-[#f8efe3] via-[#f6e7d7] to-[#f3e3c3]",
  },
  {
    title: "Why Choose Us?",
    description:
      "We meticulously source only the finest natural ingredients from around the world, ensuring each ittar is a masterpiece of aroma and purity. Our commitment to traditional distillation methods guarantees that every bottle captures the true essence of its botanical components. Experience the difference of alcohol-free, long-lasting fragrances that are kind to your skin and soul.",
    image:
      Image2,
    stat: "100%",
    statLabel: "Natural & Pure",
    bg: "from-[#f6e7d7] via-[#f3e3c3] to-[#f8efe3]",
  },
  {
    title: "Our Craftsmanship",
    description:
      "Each ittar is a testament to the artistry and dedication of our master perfusers. With decades of experience, they blend rare and exquisite oils to create unique fragrances that are both timeless and contemporary. Our small-batch production ensures the highest quality and attention to detail, making each Premium Ittar a truly exclusive experience.",
    image:
    Image3,
    stat: "50+",
    statLabel: "Unique Blends",
    bg: "from-[#f3e3c3] via-[#f8efe3] to-[#f6e7d7]",
  },
];

const Heritage = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Track scroll position for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Check device size on mount and resize
  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  // Handle manual navigation for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left - next section
      handleManualNavigation(Math.min(currentSection + 1, heritageData.length - 1));
    }
    
    if (touchStart - touchEnd < -75) {
      // Swipe right - previous section
      handleManualNavigation(Math.max(currentSection - 1, 0));
    }
  };
  
  const handleManualNavigation = (index) => {
    setCurrentSection(index);
    // For mobile, we'll manually set the scroll position instead of relying on scroll events
    if (isMobile || isTablet) {
      const sectionHeight = containerRef.current.scrollHeight / heritageData.length;
      window.scrollTo({
        top: sectionHeight * index,
        behavior: 'smooth'
      });
    }
  };
  
  // Update active section based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!isMobile && !isTablet) {
      const sectionIndex = Math.min(
        heritageData.length - 1,
        Math.floor(value * heritageData.length)
      );
      setCurrentSection(sectionIndex);
    }
  });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="w-full h-[300vh] sm:h-[300vh] relative bg-gradient-to-br from-[#f8efe3] via-[#f6e7d7] to-[#f3e3c3] ornament-pattern-ultra"
    >
      {/* Fixed viewport container */}
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence>
          {heritageData.map((item, idx) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: false, amount: 0.5 });
            
            // Use scrollYProgress directly for transforms
            const opacity = useTransform(
              scrollYProgress,
              [idx / heritageData.length, (idx + 0.8) / heritageData.length, (idx + 1) / heritageData.length],
              [0, 1, 0]
            );
            
            const imageY = useTransform(
              scrollYProgress,
              [idx / heritageData.length, (idx + 1) / heritageData.length],
              ["-5%", "5%"]
            );
            
            const textX = useTransform(
              scrollYProgress,
              [idx / heritageData.length, (idx + 0.3) / heritageData.length, (idx + 0.8) / heritageData.length],
              ["10%", "0%", "0%"]
            );

            return (
              <motion.div
                key={idx}
                ref={ref}
                style={{ 
                  opacity: isMobile || isTablet ? (currentSection === idx ? 1 : 0) : opacity,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                className={`flex flex-col md:flex-row items-center justify-center bg-gradient-to-br ${item.bg} ornament-pattern-ultra relative overflow-hidden`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isMobile || isTablet ? (currentSection === idx ? 1 : 0) : undefined }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Image with parallax */}
                <motion.div 
                  className="w-full md:w-1/2 h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12"
                  style={{ y: isMobile || isTablet ? 0 : imageY }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-3xl shadow-2xl object-cover w-full h-full max-h-[600px] transition-transform duration-700"
                      style={{
                        transform: isInView ? "scale(1)" : "scale(0.95)",
                      }}
                      loading="lazy"
                    />
                    {/* Stat badge */}
                    <motion.div 
                      className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold text-amber-700">{item.stat}</div>
                      <div className="text-xs sm:text-sm text-amber-900 font-medium">{item.statLabel}</div>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Description with slide-in effect */}
                <motion.div 
                  className="w-full md:w-1/2 flex flex-col items-center md:items-start px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-0"
                  style={{ x: isMobile || isTablet ? 0 : textX }}
                  initial={{ opacity: 0, x: isMobile || isTablet ? 0 : "10%" }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-amber-900 text-center md:text-left drop-shadow-lg">
                    {item.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-amber-800/90 mb-6 sm:mb-8 leading-relaxed text-center md:text-left max-w-xl">
                    {item.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
                    <motion.button 
                      className="bg-amber-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-amber-800 transition-all duration-300 shadow-lg w-full sm:w-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Discover Our Story
                    </motion.button>
                    <motion.button 
                      className="border-2 border-amber-700 text-amber-700 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-amber-700 hover:text-white transition-all duration-300 shadow-lg w-full sm:w-auto"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Master Perfumers
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Progress indicator - enhanced for better mobile interaction */}
        <div className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-10">
          {heritageData.map((_, idx) => (
            <motion.div 
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                currentSection === idx ? 'bg-amber-600 scale-125' : 'bg-amber-300'
              }`}
              onClick={() => handleManualNavigation(idx)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              role="button"
              aria-label={`Go to section ${idx + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
        
        {/* Mobile navigation arrows */}
        {(isMobile || isTablet) && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-8 z-10">
            <motion.button
              className={`bg-amber-700/80 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${currentSection === 0 ? 'opacity-50' : 'opacity-100'}`}
              onClick={() => handleManualNavigation(Math.max(currentSection - 1, 0))}
              disabled={currentSection === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous section"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              className={`bg-amber-700/80 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${currentSection === heritageData.length - 1 ? 'opacity-50' : 'opacity-100'}`}
              onClick={() => handleManualNavigation(Math.min(currentSection + 1, heritageData.length - 1))}
              disabled={currentSection === heritageData.length - 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next section"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Heritage;