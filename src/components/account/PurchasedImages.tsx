
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Download, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ImageViewer from '@/components/ImageViewer';
import { toast } from 'sonner';

// Define the type for purchased images
interface PurchasedImage {
  id: number;
  title: string;
  url: string;
  date: string;
  price: number;
}

const PurchasedImages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewImage, setViewImage] = useState<{url: string, title: string} | null>(null);
  const [purchasedImages, setPurchasedImages] = useState<PurchasedImage[]>([]);
  
  // Load purchased images from localStorage on component mount
  useEffect(() => {
    const storedImages = localStorage.getItem('purchasedImages');
    if (storedImages) {
      const parsedImages = JSON.parse(storedImages);
      setPurchasedImages(parsedImages);
    } else {
      // If no stored images, use mock data as fallback
      setPurchasedImages([
        {
          id: 1,
          title: 'Virat Kohli Century Celebration',
          url: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834210/swbwgdlyfzhbvzu3tpsn.jpg',
          date: '2023-03-15',
          price: 5.99,
        },
        {
          id: 2,
          title: 'Rohit Sharma Double Century',
          url: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834208/ko30jlqeci5f6rl0upwa.jpg',
          date: '2023-02-28',
          price: 4.99,
        },
        {
          id: 3,
          title: 'KL Rahul',
          url: 'https://res.cloudinary.com/dv7cxq4fy/image/upload/v1742834205/tky5hlczic0xloqedfwg.jpg ',
          date: '2023-01-10',
          price: 6.99,
        },
         
      ]);
    }
  }, []);
  
  // Filter images based on search term
  const filteredImages = purchasedImages.filter(image => 
    image.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Function to download image
  const handleDownload = (url: string, title: string) => {
    // In a real app, you would handle actual download logic here
    console.log(`Downloading image: ${title}`);
    
    // Create a simulated download effect
    const link = document.createElement('a');
    link.href = url;
    link.download = title.replace(/\s+/g, '-').toLowerCase() + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Download started", {
      description: `${title} is being downloaded to your device.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">My Purchased Images</h2>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map(image => (
            <div 
              key={image.id} 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <img 
                  src={image.url} 
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onContextMenu={(e) => e.preventDefault()} // Prevent right-click
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Button 
                    size="icon" 
                    variant="secondary"
                    onClick={() => setViewImage({ url: image.url, title: image.title })}
                  >
                    <Eye size={18} />
                  </Button>
                  <Button 
                    size="icon" 
                    onClick={() => handleDownload(image.url, image.title)}
                  >
                    <Download size={18} />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1 truncate">{image.title}</h3>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Purchased: {new Date(image.date).toLocaleDateString()}</span>
                  <span>₹{(image.price * 83.5).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No Images Found</h3>
          <p className="text-muted-foreground">You don't have any images matching your search.</p>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Purchase History</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchasedImages.map(image => (
                <TableRow key={image.id}>
                  <TableCell>{image.title}</TableCell>
                  <TableCell>{new Date(image.date).toLocaleDateString()}</TableCell>
                  <TableCell>₹{(image.price * 83.5).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDownload(image.url, image.title)}
                    >
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {viewImage && (
        <ImageViewer 
          imageUrl={viewImage.url} 
          title={viewImage.title} 
          isOpen={!!viewImage} 
          onClose={() => setViewImage(null)} 
        />
      )}
    </div>
  );
};

export default PurchasedImages;
