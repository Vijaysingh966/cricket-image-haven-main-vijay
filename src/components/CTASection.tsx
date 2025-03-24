
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  const handleGetStarted = (packageId: number) => {
    // Navigate to cart page
    navigate('/cart');
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with diagonal cut */}
      <div className="absolute inset-0 bg-cricket-red clip-diagonal" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Unlock Premium Cricket Images
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-white/90"
          >
            Choose from our range of packages and get access to high-resolution images
            of your favorite cricket moments. Perfect for fans, journalists, and creators.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              {
                id: 1,
                title: "Starter Pack",
                price: "₹10.00",
                features: ["10 HD images", "30 days access", "Personal use"],
              },
              {
                id: 2,
                title: "Pro Pack",
                price: "₹50.00",
                features: ["30 HD images", "60 days access", "Commercial license"],
                highlighted: true,
              },
              {
                id: 3,
                title: "Team Pack",
                price: "₹110.00",
                features: ["100 HD images", "90 days access", "Extended license"],
              },
            ].map((pack, index) => (
              <div 
                key={index}
                className={`
                  rounded-2xl overflow-hidden p-6
                  ${pack.highlighted 
                    ? 'bg-white shadow-xl scale-105 transform' 
                    : 'bg-white/90 shadow-lg'}
                `}
              >
                <h3 className={`
                  text-xl font-bold mb-2
                  ${pack.highlighted ? 'text-cricket-red' : 'text-gray-900'}
                `}>
                  {pack.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-4">{pack.price}</p>
                <ul className="text-left mb-6 space-y-2">
                  {pack.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <ChevronRight className="h-4 w-4 text-cricket-red mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`
                    w-full py-2 rounded-xl font-medium
                    ${pack.highlighted 
                      ? 'bg-cricket-red text-white hover:bg-cricket-red/90' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                    transition-colors
                  `}
                  onClick={() => handleGetStarted(pack.id)}
                >
                  Get Started
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
