
import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedImages from '@/components/FeaturedImages';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { motion } from 'framer-motion';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              Why Choose Our Platform
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              We provide the highest quality cricket images with flexible licensing options
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "High Resolution",
                description: "All our images are available in 4K resolution for professional use",
                icon: "🖼️",
              },
              {
                title: "Flexible Packages",
                description: "Choose from various packages that suit your needs and budget",
                icon: "📦",
              },
              {
                title: "Instant Downloads",
                description: "Get immediate access to your purchased images without waiting",
                icon: "⚡",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <FeaturedImages />
      <CTASection />
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              What Our Users Say
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Vijay Singh",
                role: "Sports Journalist",
                quote: "The image quality is exceptional. I use these photos for all my cricket articles now.",
              },
              {
                name: "Vijay Singh",
                role: "Cricket Blogger",
                quote: "The variety of images available is amazing. I've found rare shots that I couldn't find anywhere else.",
              },
              {
                name: "Vijay SIngh",
                role: "Cricket Fan",
                quote: "The subscription model is perfect for me - I get new images every month for my collection.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-md"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-cricket-red flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
              >
                Stay Updated with New Images
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-4 text-gray-600 dark:text-gray-300"
              >
                Subscribe to our newsletter and be the first to know when we add new cricket images
              </motion.p>
            </div>
            
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-4"
            >
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cricket-red dark:bg-gray-800 dark:text-white"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-cricket-red text-white rounded-xl font-medium hover:bg-cricket-red/90 transition-colors"
              >
                Subscribe
              </button>
            </motion.form>
          </div>
        </div>
      </section>
      
      <Footer />
      <Navigation />
    </motion.div>
  );
};

export default Index;
