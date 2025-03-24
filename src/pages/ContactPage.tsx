import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  MessageSquare, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields", {
        description: "Name, email and message are required"
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address", {
        description: "Please enter a valid email address"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible."
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again later or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-24 mb-20"
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get in <span className="text-cricket-red">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We'd love to hear from you. Whether you have a question about our images,
            packages, or anything else, our team is ready to help.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-cricket-red/10 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-cricket-red" />
            </div>
            <h3 className="font-bold text-lg mb-2">Our Location</h3>
            <p className="text-gray-600 dark:text-gray-400">
              312605 Pratapgarh<br />
              Rajasthan, India
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-cricket-yellow/10 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-cricket-yellow" />
            </div>
            <h3 className="font-bold text-lg mb-2">Phone Number</h3>
            <p className="text-gray-600 dark:text-gray-400">
              General Inquiries:<br />
              +91 8839354160<br />
              <br />
              Support:<br />
              +91 8839354160
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Email Address</h3>
            <p className="text-gray-600 dark:text-gray-400">
              General Inquiries:<br />
              vijaysinghsisodiya966@gmail.com<br />
              <br />
              Support:<br />
              support@cricketimages.com
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MessageSquare className="mr-2 text-cricket-red" />
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name <span className="text-cricket-red">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-cricket-red">*</span></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inquiryType">Inquiry Type</Label>
                <Select 
                  value={formData.inquiryType} 
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your message"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message <span className="text-cricket-red">*</span></Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={6}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-cricket-red hover:bg-cricket-red/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Sending Message...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <HelpCircle className="mr-2 text-cricket-yellow" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">How do I purchase images?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You can purchase images by subscribing to one of our packages or buying individual images. 
                    Visit our Packages page to learn more about our subscription options.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">What format are the images available in?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All our images are available in high-resolution JPG format. Premium 
                    subscribers also get access to RAW and TIFF formats where available.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can I use the images commercially?</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Commercial usage rights depend on your subscription plan. Basic plans are for 
                    personal use only, while Pro and Enterprise plans include commercial licenses.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-cricket-red/10 dark:bg-cricket-red/20 p-6 rounded-xl">
              <div className="flex items-start mb-4">
                <AlertCircle className="text-cricket-red mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Need Urgent Help?</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    For time-sensitive inquiries, you can reach our support team directly at:
                  </p>
                  <p className="font-semibold mt-2">+91 88393 54160 (9 AM - 8 PM IST)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden h-80">
            {/* Embed map here - this is a placeholder for a Google Maps embed */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <MapPin className="w-10 h-10 text-cricket-red" />
              <span className="ml-2 text-lg font-medium">Interactive Map Placeholder</span>
            </div>
          </div>
        </div>
      </motion.div>
      <Navigation />
    </>
  );
};

export default ContactPage;
