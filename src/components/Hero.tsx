import React, { useState, useEffect } from "react";
import Image2 from "../Assets/image1.png";
import { Link } from "react-router-dom";

// Placeholder image component
const Image1 = () => (
  <div className="w-full h-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden">
    <div className="absolute top-4 left-4 w-6 h-12 bg-gradient-to-r from-white to-transparent opacity-40 rounded-full blur-sm"></div>
    <div className="absolute top-6 right-5 w-3 h-16 bg-gradient-to-b from-white to-transparent opacity-30 rounded-full blur-sm"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-10 bg-black bg-opacity-20 rounded backdrop-blur-sm flex items-center justify-center">
      <span className="text-white text-sm font-bold tracking-wider">ATTAR</span>
    </div>
  </div>
);

// Premium Decorative Elements
const PremiumDecorations = () => {
  return (
    <>
      {/* Elegant corner ornaments - Top Left */}
      <div className="absolute top-12 left-12 w-20 h-20 opacity-20">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-700 to-transparent"></div>
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-700 to-transparent"></div>
        <div className="absolute top-2 left-2 w-4 h-4 border border-amber-600 transform rotate-45"></div>
      </div>

      {/* Elegant corner ornaments - Top Right */}
      <div className="absolute top-12 right-12 w-20 h-20 opacity-20 transform rotate-90">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-700 to-transparent"></div>
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-700 to-transparent"></div>
        <div className="absolute top-2 left-2 w-4 h-4 border border-amber-600 transform rotate-45"></div>
      </div>
      
      {/* Elegant corner ornaments - Bottom Right */}
      <div className="absolute bottom-12 right-12 w-20 h-20 opacity-20 transform rotate-180">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-700 to-transparent"></div>
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-700 to-transparent"></div>
        <div className="absolute top-2 left-2 w-4 h-4 border border-amber-600 transform rotate-45"></div>
      </div>
      
      {/* Elegant corner ornaments - Bottom Left */}
      <div className="absolute bottom-12 left-12 w-20 h-20 opacity-20 transform -rotate-90">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-700 to-transparent"></div>
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-amber-700 to-transparent"></div>
        <div className="absolute top-2 left-2 w-4 h-4 border border-amber-600 transform rotate-45"></div>
      </div>

      {/* Floating luxury elements with CSS animations */}
      <div className="absolute top-1/3 left-[20%] w-1 h-1 bg-amber-500 rounded-full animate-pulse"></div>
      <div className="absolute top-2/3 right-[20%] w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-bounce"></div>

      {/* Subtle geometric patterns */}
      <div className="absolute top-1/2 left-8 w-px h-32 bg-gradient-to-b from-transparent via-amber-600 to-transparent opacity-20"></div>
      <div className="absolute top-1/2 right-8 w-px h-32 bg-gradient-to-b from-transparent via-amber-600 to-transparent opacity-20"></div>
    </>
  );
};

// Main Hero Component
const AttarHeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    
    // Staggered animation effect
    const animationTimer = setInterval(() => {
      setAnimationStep(prev => prev < 4 ? prev + 1 : prev);
    }, 200);

    setTimeout(() => clearInterval(animationTimer), 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(animationTimer);
    };
  }, []);

  return (
    <>
      <style >{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes floatAnimation {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }


        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 1.2s ease-out forwards;
        }

        .animate-float {
          animation: floatAnimation 4s ease-in-out infinite;
        }

        .animate-glow {
          animation: glowPulse 3s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-800 {
          animation-delay: 0.8s;
        }
      `}</style>

      <section className="min-h-screen bg-gradient-to-br from-[#f8efe3] via-[#f6e7d7] to-[#f3e3c3] ornament-pattern-ultra relative overflow-hidden flex items-center py-2 px-3 sm:py-4 sm:px-8 lg:py-12 lg:px-4 pt-[80px]">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-3xl animate-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-3xl animate-glow delay-400"></div>
          
          {/* Enhanced background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.1)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,219,255,0.1)_0%,transparent_50%)]"></div>
          
          {/* Subtle dot pattern overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.1) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* Add the premium decorations */}
        <PremiumDecorations />

        {/* Content Container */}
        <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          {/* Left Content */}
          <div className={`w-full md:w-1/2 max-w-2xl space-y-4 md:space-y-8 text-center md:text-left transition-all duration-800 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Brand Name */}
            <div className={`mb-1 md:mb-2 ${animationStep >= 1 ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h1
                className="text-lg sm:text-2xl md:text-3xl font-light text-[#8B4513] tracking-[0.2em] md:tracking-[0.25em] mb-1 md:mb-2"
                style={{ fontFamily: "serif" }}
              >
                PREMIUM ITTARS
              </h1>
              <p className="text-xs sm:text-sm text-amber-800/80 tracking-[0.1em] md:tracking-[0.15em] uppercase">
                NATURAL PERFUMERY
              </p>
            </div>

            {/* Main Headline */}
            <div className={`${animationStep >= 2 ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
              <h2 className="font-playfair">
                <span className="block text-2xl sm:text-4xl md:text-6xl font-bold text-[#8B4513] leading-tight">
                  Experience the 
                </span>
                <span className="block text-2xl sm:text-4xl md:text-6xl font-bold text-[#B8860B] leading-tight">
                  Essence of Nature
                </span>
              </h2>
              <p className="text-lg sm:text-xl md:text-3xl font-serif italic text-[#8B4513] mt-1 md:mt-2">
                With Our Premium Ittars
              </p>
            </div>

            {/* Description */}
            <div className={`space-y-2 md:space-y-4 ${animationStep >= 3 ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
              <p className="text-sm sm:text-base md:text-lg text-amber-900/80 leading-relaxed">
                Step into a world of timeless elegance and pure indulgence with our handcrafted ittars.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-amber-800/70 italic">
                Handcrafted natural perfumes made from pure essential oils — alcohol-free, long-lasting, and truly unforgettable.
              </p>
            </div>

            {/* Features */}
            <div className={`flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center md:justify-start mt-4 md:mt-6 ${animationStep >= 4 ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
              {["100% NATURAL", "TRADITIONAL SCENTS", "NO ALCOHOL"].map(
                (feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-600 rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm uppercase tracking-wider text-amber-900">
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* CTA Button */}
            <div className={`mt-6 md:mt-8 ${animationStep >= 4 ? 'animate-fade-in-up delay-800' : 'opacity-0'}`}>
              <Link to="/collections">
                <button className="px-6 sm:px-8 py-2 sm:py-3 bg-[#FFB800] text-white text-sm sm:text-base md:text-lg font-medium tracking-wider rounded-full hover:bg-[#E5A500] transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  View Products
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className={`w-full md:w-1/2 flex justify-center md:justify-end ${isLoaded ? 'animate-slide-in-right delay-400' : 'opacity-0'}`}>
            <div className="relative w-[220px] h-[280px] sm:w-[300px] sm:h-[380px] md:w-[420px] md:h-[540px] lg:w-[520px] lg:h-[650px]">
              {/* Background decorative elements behind the bottle */}
              <div className="absolute inset-0 -z-20">
                {/* Subtle background pattern */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-amber-200/40 via-yellow-200/30 to-amber-100/20 rounded-full blur-2xl"></div>
                
                {/* Additional background layers for depth */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] bg-gradient-to-r from-amber-300/30 to-yellow-300/20 rounded-full blur-xl"></div>
                
                {/* Subtle geometric background elements */}
                <div className="absolute top-1/4 left-1/4 w-16 h-16 border border-amber-300/20 rounded-full transform rotate-45"></div>
                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 border border-yellow-300/20 rounded-full transform -rotate-45"></div>
                <div className="absolute top-1/2 right-1/3 w-8 h-8 border border-amber-200/30 rounded-full"></div>
              </div>
              
              {/* Main perfume bottle image */}
              <img
                src={Image2}
                alt="Al Wajhi Oudh & Perfumes"
                className="w-full h-full object-cover animate-float relative z-10"
              />
              
              {/* Enhanced glow effect around the bottle */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-gradient-to-r from-amber-400/40 via-yellow-400/30 to-amber-300/20 rounded-full blur-3xl animate-glow"></div>
              </div>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-amber-400/60 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-yellow-400/50 rounded-full animate-bounce delay-300"></div>
                <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-amber-300/40 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-yellow-300/30 rounded-full animate-bounce delay-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AttarHeroSection;