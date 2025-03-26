
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  LogIn, 
  UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthFormsProps {
  onLoginSuccess: () => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Mock OTP verification (in a real app this would send an actual OTP)
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate the form and make an API call here
    console.log('Login attempt with:', loginData);
    
    // For demo purposes, we'll just simulate successful login
    localStorage.setItem('authToken', 'mock-jwt-token');
    onLoginSuccess();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // In a real app, you would make an API call here
    console.log('Registration attempt with:', registerData);
    
    // For demo purposes, show OTP verification
    setShowOTP(true);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate the OTP with an API call
    console.log('Verifying OTP:', otp);
    
    // For demo purposes, we'll just simulate successful verification and login
    localStorage.setItem('authToken', 'mock-jwt-token');
    onLoginSuccess();
  };

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <motion.form 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleLogin}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  className="pl-10"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Log In
            </Button>
          </motion.form>
        </TabsContent>
        
        <TabsContent value="register">
          {!showOTP ? (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleRegister}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    className="pl-10"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    className="pl-10"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+91 1234567890" 
                    className="pl-10"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </motion.form>
          ) : (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleVerifyOTP}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Verify Your Phone</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a verification code to {registerData.phone}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input 
                  id="otp" 
                  type="text" 
                  placeholder="••••••"  
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="text-center text-xl tracking-widest"
                />
              </div>
              
              <Button type="submit" className="w-full">
                Verify & Continue
              </Button>
              
              <Button type="button" variant="link" onClick={() => setShowOTP(false)} className="w-full">
                Back to Sign Up
              </Button>
            </motion.form>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForms;
