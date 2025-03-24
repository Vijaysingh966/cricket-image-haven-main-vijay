
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, User, ShoppingCart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide navigation when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const items = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Explore', path: '/explore', icon: Search },
    { name: 'Cart', path: '/cart', icon: ShoppingCart },
    { name: 'Account', path: '/account', icon: User },
  ];

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center py-2 px-4 bg-white dark:bg-gray-900 glass shadow-lg border-t border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              'flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-200',
              isActive
                ? 'text-cricket-red font-medium scale-105'
                : 'text-gray-500 hover:text-cricket-red'
            )}
          >
            <item.icon
              className={cn(
                'h-6 w-6 mb-1 transition-transform',
                isActive && 'animate-fade-in'
              )}
            />
            <span className="text-xs">{item.name}</span>
            {isActive && (
              <div className="absolute bottom-0.5 h-1 w-10 bg-cricket-red rounded-full animate-fade-in" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default Navigation;
