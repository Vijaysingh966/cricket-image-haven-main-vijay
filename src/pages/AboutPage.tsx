
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Users, 
  Heart, 
  Shield, 
  Award, 
  Image as ImageIcon, 
  Sparkles, 
  Leaf 
} from 'lucide-react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-24 mb-20"
      >
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          {...fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-cricket-red">Cricket</span><span className="text-cricket-yellow">Images</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            The premier destination for high-quality cricket photography,
            serving professionals and enthusiasts worldwide since 2015.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md">
            <div className="aspect-video bg-gradient-to-r from-cricket-red to-cricket-yellow flex items-center justify-center">
              <ImageIcon size={64} className="text-white" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400">
                At CricketImages, our mission is to capture the essence and spirit of cricket 
                through stunning photography. We aim to document every memorable moment from 
                international matches to grassroots games, preserving cricket's rich heritage 
                and making it accessible to fans worldwide.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md">
            <div className="aspect-video bg-gradient-to-r from-cricket-yellow to-cricket-red flex items-center justify-center">
              <Camera size={64} className="text-white" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We envision a world where cricket imagery is not just about sports photography, 
                but about celebrating a culture that unites millions. Through our platform, we 
                strive to create a visual narrative that tells cricket's global story, from the 
                iconic stadiums to the dusty street corners where future stars are born.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
            What sets CricketImages apart from other photography platforms
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-cricket-red/10 flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-cricket-red" />
              </div>
              <h3 className="font-bold text-xl mb-2">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                All images undergo rigorous quality checks before being added to our collection.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-cricket-yellow/10 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-cricket-yellow" />
              </div>
              <h3 className="font-bold text-xl mb-2">Secure Platform</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Your data and our content are protected with industry-leading security measures.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Passionate Team</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Our photographers and staff share a deep love for cricket that shines through in our work.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Our Journey</h2>
          
          <div className="space-y-12">
            <div className="relative pl-10 md:pl-0">
              <div className="md:grid md:grid-cols-5 items-center">
                <div className="md:col-span-1 mb-4 md:mb-0 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cricket-red text-white">
                    2015
                  </div>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold mb-2">The Beginning</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    CricketImages was founded by a group of cricket photographers who wanted to create 
                    a dedicated platform for cricket imagery that celebrated the sport's beauty and emotion.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative pl-10 md:pl-0">
              <div className="md:grid md:grid-cols-5 items-center">
                <div className="md:col-span-1 mb-4 md:mb-0 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cricket-yellow text-gray-900">
                    2018
                  </div>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold mb-2">Global Expansion</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We expanded our coverage to include cricket matches from all ICC member countries, 
                    forming partnerships with local photographers around the world.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative pl-10 md:pl-0">
              <div className="md:grid md:grid-cols-5 items-center">
                <div className="md:col-span-1 mb-4 md:mb-0 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white">
                    2023
                  </div>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold mb-2">The Digital Revolution</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Launched our new platform with advanced search capabilities, subscription models, 
                    and enhanced security features to protect our valuable content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { name: "Vijay Singh", role: "Founder & Lead Photographer", image: "https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742839373/lisjbaoksqnouscdb0gg.jpg" },
              { name: "Vijay Singh", role: "Content Director", image: "https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742839373/lisjbaoksqnouscdb0gg.jpg" },
              { name: "Vijay Sing", role: "Chief Technology Officer", image: "https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742839373/lisjbaoksqnouscdb0gg.jpg" },
              { name: "Vijay Singh", role: "Marketing Lead", image: "https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742839373/lisjbaoksqnouscdb0gg.jpg" },
            ].map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable="false"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-cricket-red/10 dark:bg-cricket-red/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Journey</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              We're always looking for passionate photographers and cricket enthusiasts to join our team. 
              If you share our vision, we'd love to hear from you.
            </p>
            <a href="/contact" className="inline-block bg-cricket-red hover:bg-cricket-red/90 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Get In Touch
            </a>
          </div>
        </motion.div>
      </motion.div>
      <Navigation />
    </>
  );
};

export default AboutPage;
