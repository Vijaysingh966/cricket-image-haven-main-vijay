import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageCard from './ImageCard';
 
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// Updated cricket images featuring Indian cricketers in 4K quality
const sampleImages = [
  {
    id: 1,
    title: 'KL Rahul Century Celebration',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834207/brbgnfyciyyvjf9kuvih.jpg',
    isPremium: false,
    price: 7.99,
  },
  {
    id: 2,
    title: 'Rohit Sharma Cover Drive',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2073&auto=format&fit=crop',
    isPremium: false,
    price: 6.99,
  },
  {
    id: 3,
    title: 'shresh aier Century Celebration',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834208/ha1fx06v128tizm6wpyi.jpg',
    isPremium: false,
    price: 0,
  },
  {
    id: 4,
    title: ' Indian Team Victory Celebration',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834209/yi2rpa9jya71z45jb4qu.jpg',
    isPremium: false,
    price: 8.99,
  },
  {
    id: 5,
    title: 'Team Player',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834211/crkf49vraum9apwlj9u6.jpg',
    isPremium: false,
    price: 9.99,
  },
  {
    id: 6,
    title: 'Hitman And King',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834210/aoef81lozbbq61sixero.jpg',
    isPremium: false,
    price: 0,
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50
    }
  }
};

const FeaturedImages = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setImages(sampleImages);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Featured Images
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our collection of high-resolution cricket images from memorable matches and iconic players
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {images.map((image) => (
              <motion.div key={image.id} variants={item}>
                <ImageCard image={image} />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <div className="mt-16 text-center">
          <a 
            href="/explore" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cricket-red hover:bg-cricket-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cricket-red transition-colors"
          >
            View All Images
          </a>
          <Link to="/explore">
            <Button className="rounded-full px-8 py-6 text-base bg-cricket-red hover:bg-cricket-red/90 shadow-md hover:shadow-lg transition-all group">
            View All Images
              {/* <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /> */}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedImages;
