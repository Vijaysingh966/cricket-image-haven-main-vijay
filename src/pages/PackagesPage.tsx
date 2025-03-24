import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Download, Package as PackageIcon, Camera, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    id: 1,
    title: 'Basic',
    price: 100,
    frequency: 'month',
    description: 'Perfect for casual photo enthusiasts',
    features: [
      { text: '50 downloads per month', included: true },
      { text: 'SD quality images', included: true },
      { text: 'Commercial license', included: false },
      { text: 'Exclusive premium content', included: false },
      { text: 'API access', included: false },
    ],
    popular: false,
    color: 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    icon: Camera,
  },
  {
    id: 2,
    title: 'Pro',
    price: 120,
    frequency: 'month',
    description: 'Ideal for professionals and creators',
    features: [
      { text: '200 downloads per month', included: true },
      { text: 'HD quality images', included: true },
      { text: 'Commercial license', included: true },
      { text: 'Exclusive premium content', included: true },
      { text: 'API access', included: false },
    ],
    popular: true,
    color: 'bg-cricket-red/10 border-cricket-red/30 dark:bg-cricket-red/20 dark:border-cricket-red/30',
    buttonColor: 'bg-cricket-red hover:bg-cricket-red/90',
    icon: PackageIcon,
  },
  {
    id: 3,
    title: 'Enterprise',
    price: 180,
    frequency: 'month',
    description: 'For businesses with advanced needs',
    features: [
      { text: 'Unlimited downloads', included: true },
      { text: '4K quality images', included: true },
      { text: 'Extended commercial license', included: true },
      { text: 'All premium content', included: true },
      { text: 'API access & support', included: true },
    ],
    popular: false,
    color: 'bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-900',
    buttonColor: 'bg-purple-600 hover:bg-purple-700',
    icon: ImageIcon,
  },
];

const PackagesPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (packageId: number) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      toast.error("You need to be logged in to subscribe", {
        description: "Redirecting you to the login page."
      });
      
      setTimeout(() => {
        navigate('/account');
      }, 1500);
      return;
    }
    
    toast.success(`Subscription process initiated for package ID: ${packageId}`, {
      description: "Please complete the payment process on the next screen."
    });
  };

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-24 mb-20"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Perfect <span className="text-cricket-red">Package</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get access to our extensive collection of premium cricket images
            with flexible subscription options to meet your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl p-6 border ${pkg.color} shadow-sm overflow-hidden`}
            >
              {pkg.popular && (
                <Badge className="absolute top-4 right-4 bg-cricket-yellow text-black font-medium">
                  Most Popular
                </Badge>
              )}
              
              <div className="mb-6 flex justify-center">
                <div className={`p-3 rounded-full ${pkg.color}`}>
                  <pkg.icon size={32} className="text-gray-900 dark:text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-center mb-2">{pkg.title}</h3>
              <div className="text-center mb-4">
                <span className="text-4xl font-bold">₹{pkg.price}</span>
                <span className="text-gray-500 dark:text-gray-400">/{pkg.frequency}</span>
              </div>
              
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                {pkg.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-500"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${pkg.buttonColor} text-white`}
                onClick={() => handleSubscribe(pkg.id)}
              >
                Subscribe Now
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Can I cancel my subscription at any time?</h3>
              <p className="text-gray-600 dark:text-gray-400">Yes, you can cancel your subscription at any time. Your access will remain active until the end of your current billing period.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">How do the download limits work?</h3>
              <p className="text-gray-600 dark:text-gray-400">Download limits reset at the beginning of each billing cycle. Unused downloads do not roll over to the next month.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">What is the difference between SD, HD, and 4K images?</h3>
              <p className="text-gray-600 dark:text-gray-400">SD images are 1280x720px, HD images are 1920x1080px, and 4K images are 3840x2160px. Higher resolutions provide better quality, especially for printing.</p>
            </div>
          </div>
        </div>
      </motion.div>
      <Navigation />
    </>
  );
};

export default PackagesPage;
