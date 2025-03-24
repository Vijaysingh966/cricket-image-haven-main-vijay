import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Github,
  Briefcase
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Cricket Image Haven</h3>
            <p className="text-gray-400 mb-4">
              The premier marketplace for high-quality cricket images featuring your favorite players and memorable matches.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100087899797732" target="_blank"  className="text-gray-400 hover:text-cricket-red transition-colors">
                <Facebook size={20} />
              </a>
              
              <a href="https://www.instagram.com/vijay_singh_thi_ugran/?next=%2F" target="_blank"  className="text-gray-400 hover:text-cricket-red transition-colors">
                <Instagram size={20} />
              </a>
              
              <a href="https://github.com/Vijaysingh966" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cricket-red transition-colors">
                <Github size={20} />
              </a>
              <a href="https://vijayportfolio966.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cricket-red transition-colors">
                <Briefcase size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Explore', 'Packages', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-cricket-red transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          {/* <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Licensing', 'Copyright'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-gray-400 hover:text-cricket-red transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-cricket-red mr-2 mt-0.5" />
                <span className="text-gray-400">312605 Pratapgarh, Rajasthan, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-cricket-red mr-2" />
                <span className="text-gray-400">+91 8839354160</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-cricket-red mr-2" />
                <span className="text-gray-400">Vijaysinghsisodiya966@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Cricket Image Haven. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                Designed with <span className="text-cricket-red">❤</span> for cricket fans by CodeWithSharp
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
