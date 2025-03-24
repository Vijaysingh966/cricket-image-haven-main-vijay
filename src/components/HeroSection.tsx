
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-900 min-h-[95vh] flex flex-col items-center justify-center text-center">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 cricket-gradient opacity-20"></div>
        <div className="absolute inset-y-0 left-0 w-1/3 bg-cricket-red opacity-10 transform -skew-x-12"></div>
        <div className="absolute inset-y-0 right-0 w-1/3 bg-cricket-yellow opacity-10 transform skew-x-12"></div>
      </div>

      <div className="container relative z-10 px-4 py-16 sm:px-6 lg:px-8 max-w-6xl animate-fade-in">
        <div
          className={`transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide uppercase rounded-full bg-cricket-yellow-light text-cricket-red">
            Premium Cricket Images
          </span>
        </div>

        <h1 
          className={`mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white transition-all duration-1000 delay-100 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="block text-cricket-red">Cricket Image</span> 
        </h1>

        <p 
          className={`mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Discover and purchase high-resolution images of your favorite cricket players,
          matches, and iconic moments from around the world.
        </p>

        <div 
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <Link to="/explore">
            <Button className="rounded-full px-8 py-6 text-base bg-cricket-red hover:bg-cricket-red/90 shadow-md hover:shadow-lg transition-all group">
              Explore Images
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/packages">
            <Button variant="outline" className="rounded-full px-8 py-6 text-base border-cricket-red text-cricket-red hover:bg-cricket-red/10">
              View Packages
            </Button>
          </Link>
        </div>

        <div 
          className={`mt-20 transition-all duration-1000 delay-400 transform ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Trusted by cricket fans worldwide
          </p>
          <div className="mt-4 flex justify-center space-x-8 grayscale opacity-75">
            <div className="h-8 sm:h-10 w-auto">ICC</div>
            <div className="h-8 sm:h-10 w-auto">BCCI</div>
            <div className="h-8 sm:h-10 w-auto">IPL</div>
            <div className="h-8 sm:h-10 w-auto">Cricket Australia</div>
          </div>
        </div>
      </div>

      {/* Animated arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="h-10 w-10 rounded-full flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-cricket-red"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
