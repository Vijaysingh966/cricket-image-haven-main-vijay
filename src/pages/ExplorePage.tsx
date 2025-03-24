import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import ImageCard from '@/components/ImageCard';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { Search, Filter, ArrowUpDown, CheckCircle, X } from 'lucide-react';

// Sample images data with categories
const sampleImages = [
  {
    id: 1,
    title: 'Final Match Celebration',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742418938/virat4_gimsts.jpg',
    isPremium: true,
    price: 0.2,
    category: 'Team Celebrations',
  },
  {
    id: 2,
    title: 'Perfect Batting Stance',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/f_auto,q_auto/fdpzb5ksp0qnpixgnqse',
    isPremium: false,
    price: 4.99,
    category: 'Match Highlights',
  },
  {
    id: 3,
    title: 'Indan Team',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/f_auto,q_auto/igcawpnqgbdd0jxffnlw',
    isPremium: false,
    price: "free",
    category: 'Stadium Views',
  },
  {
    id: 4,
    title: 'Player Close-up',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/f_auto,q_auto/ywxj2jhafezxvp3ibbpm',
    isPremium: false,
    price: 6.99,
    category: 'Player Portraits',
  },
  {
    id: 5,
    title: 'Team Huddle',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/f_auto,q_auto/pm4uulfbh8wbjjlzhp6i',
    isPremium: false,
    price: 7.99,
    category: 'Team Celebrations',
  },
  {
    id: 6,
    title: 'The Best Team ',
    imageUrl: '    https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834209/us75abxiymo7jmrzpeaz.jpg',
    isPremium: false,
    price: 7.99,
    category: 'Team Celebrations',
  },
  {
    id: 7,
    title: 'Critical Moment',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742836201/awnkd0lk4owcto6zctwn.jpg',
    isPremium: false,
    price: 9.00,
    category: 'Match Highlights',
  },
  {
    id: 8,
    title: 'Trophy Ceremony',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834209/ujezimxcb9plyw7u8v56.jpg',
    isPremium: true,
    price: 0.10,
    category: 'Team Celebrations',
  },
  {
    id: 9,
    title: 'Stadium Lights',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834210/swbwgdlyfzhbvzu3tpsn.jpg',
    isPremium: true,
    price: .09,
    category: 'Stadium Views',
  },
  {
    id: 10,
    title: 'Hitman The Rohit Sharma',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834208/ko30jlqeci5f6rl0upwa.jpg',
    isPremium: false,
    price: 0.8,
    category: 'Vintage Classics',
  },
  {
    id: 11,
    title: 'King Kohli',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834208/ncl7zpab7qntft43l9vy.jpg',
    isPremium: false,
    price: 9.00,
    category: 'Vintage Classics',
  },
  {
    id: 12,
    title: ' Classic KL.Rahul',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834205/tky5hlczic0xloqedfwg.jpg ',
    isPremium: false,
    price:20.00,
    category: 'Vintage Classics',
  },
  {
    id: 13,
    title: 'player of Indian team',
    imageUrl: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834206/oddzm3fzv5q4o7hzqb4h.jpg',
    isPremium: false,
    price: 32.00,
    category: 'Vintage Classics',
  },
];
// Categories
const categories = [
  "All Images",
  "Match Highlights",
  "Player Portraits",
  "Stadium Views",
  "Team Celebrations",
  "Vintage Classics",
];

const ExplorePage = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Images");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter states
  const [filters, setFilters] = useState({
    onlyFree: false,
    onlyPremium: false,
    priceRange: [0, 10],
    sortBy: "Most Recent",
    resolution: "All Resolutions"
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setImages(sampleImages);
      setFilteredImages(sampleImages);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    
    if (searchTerm.trim() === '') {
      setFilteredImages(images);
      return;
    }
    
    const results = images.filter(image => 
      image.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredImages(results);
    
    if (results.length === 0) {
      toast.info("No images found matching your search.");
    } else {
      toast.success(`Found ${results.length} matching images.`);
    }
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    if (category === "All Images") {
      setFilteredImages(images);
      toast.info("Showing all images");
    } else {
      // Filter images based on selected category
      const categoryResults = images.filter(image => image.category === category);
      setFilteredImages(categoryResults);
      
      if (categoryResults.length === 0) {
        toast.info(`No images found in the ${category} category.`);
      } else {
        toast.success(`Showing ${categoryResults.length} images in ${category} category`);
      }
    }
  };

  // Handle filter change
  const handleFilterChange = (filterKey, value) => {
    setFilters({
      ...filters,
      [filterKey]: value,
    });
  };

  // Apply filters
  const applyFilters = () => {
    let results = [...images];
    
    // Filter by category first if not "All Images"
    if (activeCategory !== "All Images") {
      results = results.filter(img => img.category === activeCategory);
    }
    
    // Filter by free/premium
    if (filters.onlyFree) {
      results = results.filter(img => !img.isPremium);
    }
    
    if (filters.onlyPremium) {
      results = results.filter(img => img.isPremium);
    }
    
    // Sort results
    if (filters.sortBy === "Price: Low to High") {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "Price: High to Low") {
      results.sort((a, b) => b.price - a.price);
    }
    
    setFilteredImages(results);
    toast.success("Filters applied successfully!");
    setShowFilters(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      onlyFree: false,
      onlyPremium: false,
      priceRange: [0, 10],
      sortBy: "Most Recent",
      resolution: "All Resolutions"
    });
    
    // Keep the current category filter
    if (activeCategory === "All Images") {
      setFilteredImages(images);
    } else {
      const categoryResults = images.filter(image => image.category === activeCategory);
      setFilteredImages(categoryResults);
    }
    
    setSearchTerm("");
    toast.info("Filters have been reset.");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <Header />
      
      {/* Content header with search */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Cricket Images</h1>
            
            <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-l-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cricket-red"
                />
              </div>
              <button 
                type="submit"
                className="bg-cricket-red text-white px-4 py-2 rounded-r-xl hover:bg-cricket-red/90 transition-colors"
              >
                Search
              </button>
            </form>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors md:ml-2"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
          
          {/* Categories */}
          <div className="mt-6 flex overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-cricket-red text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Price</p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleFilterChange('onlyFree', !filters.onlyFree)}
                      className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filters.onlyFree 
                          ? 'bg-cricket-red/10 text-cricket-red' 
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {filters.onlyFree && <CheckCircle size={14} className="mr-1" />}
                      Free Only
                    </button>
                    <button
                      onClick={() => handleFilterChange('onlyPremium', !filters.onlyPremium)}
                      className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                        filters.onlyPremium 
                          ? 'bg-cricket-yellow/20 text-gray-800' 
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {filters.onlyPremium && <CheckCircle size={14} className="mr-1" />}
                      Premium Only
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Sort By</p>
                  <select 
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                  >
                    <option>Most Recent</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Popularity</option>
                  </select>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Resolution</p>
                  <select 
                    value={filters.resolution}
                    onChange={(e) => handleFilterChange('resolution', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                  >
                    <option>All Resolutions</option>
                    <option>HD (1080p)</option>
                    <option>4K</option>
                    <option>8K</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <button 
                  onClick={resetFilters}
                  className="text-sm text-cricket-red"
                >
                  Reset Filters
                </button>
                <button 
                  onClick={applyFilters}
                  className="bg-cricket-red text-white px-4 py-1.5 rounded-lg text-sm"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Images grid */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-64 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing <span className="font-medium">{filteredImages.length}</span> images
              </p>
              <div className="flex items-center">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300"
                >
                  <ArrowUpDown size={14} />
                  Sort
                </button>
              </div>
            </div>
            
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredImages.length > 0 ? (
                filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      show: { y: 0, opacity: 1 }
                    }}
                  >
                    <ImageCard image={image} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-10 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No images found matching your criteria.</p>
                  <button 
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 rounded-lg bg-cricket-red text-white text-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </motion.div>
            
            {filteredImages.length > 0 && (
              <div className="mt-12 flex justify-center">
                <button className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
      <Navigation />
    </div>
  );
};

export default ExplorePage;
