import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Camera, Check } from 'lucide-react';
import { toast } from 'sonner';

const UserProfile = () => {
  // Updated user data with Vijay Singh's information
  const [userData, setUserData] = useState({
    name: 'Vijay Singh',
    email: 'vijaysinghsisodiya966@gmail.com',
    phone: '+91 8839354160',
    avatarUrl: '',
    bio: 'Cricket enthusiast and photographer from Rajasthan'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // In a real app, you would make an API call here
    // If we have a new avatar file, process it
    if (avatarFile) {
      // Create an object URL for the file
      const avatarUrl = URL.createObjectURL(avatarFile);
      setFormData(prev => ({ ...prev, avatarUrl }));
    }
    
    setUserData(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Preview the image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData(prev => ({ ...prev, avatarUrl: event.target.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative mb-6">
            <Avatar className="h-32 w-32 cursor-pointer" onClick={handleAvatarClick}>
              <AvatarImage src={formData.avatarUrl} alt={formData.name} />
              <AvatarFallback className="text-3xl bg-cricket-red text-white">
                {getInitials(formData.name)}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="absolute -bottom-2 right-0">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="rounded-full h-10 w-10 hover:bg-cricket-red hover:text-white"
                  onClick={handleAvatarClick}
                >
                  <Camera size={16} />
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="mb-4"
          >
            {isEditing ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
          
          {!isEditing && (
            <div className="w-full space-y-4 text-center">
              <h3 className="text-xl font-semibold">{userData.name}</h3>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
              <p className="text-sm text-muted-foreground">{userData.phone}</p>
              <p className="text-sm">{userData.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {isEditing && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      
      {!isEditing && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Stats</CardTitle>
            <CardDescription>Your activity on Cricket Images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-cricket-red">12</p>
                <p className="text-sm text-muted-foreground">Purchased Images</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-cricket-yellow">1</p>
                <p className="text-sm text-muted-foreground">Active Package</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-cricket-red">3</p>
                <p className="text-sm text-muted-foreground">Months Subscribed</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-cricket-yellow">5</p>
                <p className="text-sm text-muted-foreground">Images Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;
