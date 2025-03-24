
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2, Shield, AlertTriangle, Save } from 'lucide-react';

const AccountSettings = () => {
  // Mock settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    twoFactorAuth: false,
    darkMode: false, // This would typically come from a theme context
  });
  
  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Handle settings toggle
  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle password form submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    // In a real app, you would make an API call here
    console.log('Changing password', passwordForm);
    
    // Reset form
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    // Show success message
    alert('Password changed successfully');
  };
  
  return (
    <div className="space-y-8">
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about your account activity
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="marketing-emails">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new features and offers
              </p>
            </div>
            <Switch
              id="marketing-emails"
              checked={settings.marketingEmails}
              onCheckedChange={() => handleToggle('marketingEmails')}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor" className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                Two-Factor Authentication
              </Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              id="two-factor"
              checked={settings.twoFactorAuth}
              onCheckedChange={() => handleToggle('twoFactorAuth')}
            />
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Change Password</h3>
            
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            
            <Button type="submit" className="mt-2">
              <Save className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Once you delete your account, there is no going back. This action is permanent and will remove all your data from our servers.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" className="w-full sm:w-auto">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountSettings;
