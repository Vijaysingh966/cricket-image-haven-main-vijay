import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, EyeOff, Download } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageViewerProps {
  imageUrl: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewer = ({ imageUrl, title, isOpen, onClose }: ImageViewerProps) => {
  // Handle escape key press to close the viewer
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleDownload = async () => {
    try {
      // For mobile compatibility, we need to fetch the image first
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Extract filename from the URL or use the title
      const filename = imageUrl.split('/').pop() || `${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      
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
        description: `Downloading ${title}`
      });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed", {
        description: "There was an error downloading this image. Please try again."
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-contain"
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
              style={{ pointerEvents: "none" }}
            />
            
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                onClick={handleDownload}
                aria-label="Download image"
              >
                <Download size={20} />
              </motion.button>
            
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={onClose}
                aria-label="Close image viewer"
              >
                <X size={24} />
              </motion.button>
            </div>

            <div className="absolute top-4 left-4 bg-black/60 px-3 py-1.5 rounded-full flex items-center">
              <EyeOff size={16} className="mr-2" />
              <span className="text-white text-sm">Protected Content</span>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-3 text-white flex justify-between items-center"
            >
              <h3 className="text-lg font-medium text-left">{title}</h3>
              <button 
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 transition-colors px-3 py-1 rounded-lg text-sm font-medium"
                onClick={handleDownload}
              >
                <Download size={14} />
                Download
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageViewer;
