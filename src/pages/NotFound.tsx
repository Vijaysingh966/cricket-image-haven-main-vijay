
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-9xl font-bold text-cricket-red">404</h1>
            <div className="w-16 h-1 bg-cricket-yellow mx-auto my-6"></div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 rounded-xl bg-cricket-red text-white hover:bg-cricket-red/90 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
      
      <div className="mt-auto">
        <Footer />
        <Navigation />
      </div>
    </div>
  );
};

export default NotFound;
