import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Lock, EyeOff, Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import ImageViewer from './ImageViewer';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

interface ImageCardProps {
  image: {
    id: number;
    title: string;
    imageUrl: string;
    isPremium: boolean;
    price: number;
  };
}

const ImageCard = ({ image }: ImageCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const navigate = useNavigate();

  const handleImageClick = () => {
    if (!image.isPremium) {
      setViewerOpen(true);
    }
  };

  const handlePurchase = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/cart');
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (image.isPremium) {
      // Block downloads for premium images and show a notification
      toast.error("This is premium content", {
        description: "Please subscribe to a package to download premium content."
      });
      return;
    }
    
    // For free images, trigger the download
    try {
      // For better mobile compatibility, fetch the image first
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Extract filename from the URL or use the title
      const filename = image.imageUrl.split('/').pop() || `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      
      // Check if this is a mobile device (iOS/Android)
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Create a temporary anchor with download attribute
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Trigger click event to start download
        link.click();
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        }, 100);
      } else {
        // Desktop browsers - standard download approach
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }
      
      toast.success("Download started", {
        description: `Downloading ${image.title}`
      });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed", {
        description: "There was an error downloading this image. Please try again."
      });
    }
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewerOpen(true);
  };

  return (
    <>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white dark:bg-gray-800 cursor-pointer"
        onClick={handleImageClick}
      >
        <div 
          className={cn(
            "relative w-full aspect-[4/3] overflow-hidden",
            isLoading ? "bg-gray-200 dark:bg-gray-700 animate-pulse" : ""
          )}
        >
          {/* Blur overlay for premium images */}
          {image.isPremium && (
            <div className={cn(
              "absolute inset-0 backdrop-blur-sm bg-black/30 z-10 flex flex-col items-center justify-center p-4 text-white transition-opacity",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <Lock className="w-12 h-12 mb-2" />
              <p className="text-center font-semibold">Premium Content</p>
              <p className="text-sm opacity-80 mb-4">Purchase to unlock this image</p>
              <button 
                className="mt-2 px-4 py-2 rounded-full bg-cricket-red text-white text-sm font-medium hover:bg-cricket-red/90 transition-colors"
                onClick={handlePurchase}
              >
                ₹{(image.price * 83.5).toFixed(2)} - Unlock
              </button>
            </div>
          )}

          <img
            src={image.imageUrl}
            alt={image.title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500 ease-out",
              isHovered && !image.isPremium ? "scale-110" : "",
              image.isPremium ? "blur-sm" : "",
              "pointer-events-none" // Disable right-click saving
            )}
            onLoad={() => setIsLoading(false)}
            onContextMenu={(e) => e.preventDefault()} // Prevent context menu
            draggable="false" // Disable dragging
          />

          {/* Secure content overlay */}
          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full flex items-center">
            <EyeOff size={12} className="mr-1" />
            <span>Protected</span>
          </div>

          {/* Premium badge */}
          {image.isPremium && (
            <div className="absolute top-2 right-2 bg-cricket-yellow text-gray-900 text-xs font-bold px-2 py-1 rounded-full z-20 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              PREMIUM
            </div>
          )}

          {/* Download button for free images */}
          {!image.isPremium && (
            <div 
              className={cn(
                "absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-2 shadow-lg z-20 transition-all",
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
              onClick={handleDownload}
            >
              <Download className="w-5 h-5" />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-lg text-gray-900 dark:text-white">{image.title}</h3>
          
          <div className="mt-2 flex justify-between items-center">
            {image.isPremium ? (
              <span className="text-cricket-red font-semibold">₹{(image.price * 83.5).toFixed(2)}</span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-green-600 dark:text-green-400 font-semibold">Free</span>
                <button 
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                  onClick={handleDownload}
                >
                  <Download size={16} />
                </button>
              </div>
            )}
            
            <button 
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1",
                image.isPremium 
                  ? "bg-cricket-red/10 text-cricket-red hover:bg-cricket-red/20" 
                  : "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
              )}
              onClick={image.isPremium ? handlePreview : handlePreview}
            >
              {image.isPremium ? (
                <>Preview<Eye size={14} className="ml-1" /></>
              ) : (
                <>View<Eye size={14} /></>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Image Viewer Modal */}
      <ImageViewer 
        imageUrl={image.imageUrl} 
        title={image.title} 
        isOpen={viewerOpen} 
        onClose={() => setViewerOpen(false)} 
      />
    </>
  );
};

export default ImageCard;
