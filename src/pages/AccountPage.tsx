
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { 
  UserCircle, 
  Package, 
  ImageIcon, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';
import { motion } from 'framer-motion';
import UserProfile from '@/components/account/UserProfile';
import PurchasedImages from '@/components/account/PurchasedImages';
import Subscriptions from '@/components/account/Subscriptions';
import AccountSettings from '@/components/account/AccountSettings';
import AuthForms from '@/components/account/AuthForms';

const AccountPage = () => {
  // Mock authentication state - in a real app, this would come from a context or state management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear any tokens or user data from storage
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    
    // Navigate to home page
    navigate('/');
  };

  // Go to home page
  const goToHome = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="container mx-auto px-4 py-24 min-h-screen"
      >
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <AuthForms onLoginSuccess={handleLoginSuccess} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-24 min-h-screen"
    >
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Account</h1>
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              className="flex items-center gap-2"
              onClick={goToHome}
            >
              <Home size={16} />
              <span>Go Home</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex flex-col items-center gap-2 py-3">
              <UserCircle />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="flex flex-col items-center gap-2 py-3">
              <ImageIcon />
              <span>My Images</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex flex-col items-center gap-2 py-3">
              <Package />
              <span>Packages</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col items-center gap-2 py-3">
              <Settings />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
          
          <TabsContent value="images">
            <PurchasedImages />
          </TabsContent>
          
          <TabsContent value="packages">
            <Subscriptions />
          </TabsContent>
          
          <TabsContent value="settings">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default AccountPage;
