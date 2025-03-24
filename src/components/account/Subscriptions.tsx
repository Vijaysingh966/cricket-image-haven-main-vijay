
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Calendar, RefreshCw, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Mock subscription data
const mockSubscription = {
  name: 'Premium Package',
  price: 180,
  billingCycle: 'monthly',
  startDate: '2023-01-15',
  endDate: '2023-12-15',
  features: [
    'Access to 50 premium images per month',
    'HD and 4K resolution downloads',
    'No watermarks',
    'Commercial usage rights',
    'Priority customer support'
  ],
  imagesDownloaded: 45,
  imagesAllowed: 50,
  status: 'active',
  autoRenew: true
};

const Subscriptions = () => {
  const navigate = useNavigate();

  // Calculate days remaining
  const endDate = new Date(mockSubscription.endDate);
  const today = new Date();
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Calculate images remaining
  const imagesRemaining = mockSubscription.imagesAllowed - mockSubscription.imagesDownloaded;
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Handle button clicks
  const handleManageSubscription = () => {
    toast.info("Opening subscription management interface...");
  };

  const handleUpgradePackage = () => {
    navigate('/packages');
  };

  const handleDowngrade = () => {
    toast.info("Preparing to downgrade your package...");
    // In a real app, this would open a confirmation dialog
  };

  const handleViewAllTransactions = () => {
    toast.info("Loading all transaction history...");
    // In a real app, this would navigate to a transactions page
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Package</CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h3 className="text-2xl font-bold">{mockSubscription.name}</h3>
                  <p className="text-muted-foreground">₹{mockSubscription.price}/month</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span>Active</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Subscription Period</p>
                    <p className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {formatDate(mockSubscription.startDate)} - {formatDate(mockSubscription.endDate)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Auto-Renewal</p>
                    <p className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4 text-muted-foreground" />
                      {mockSubscription.autoRenew ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
                    <div className="mb-2">
                      <Progress value={(daysRemaining / 365) * 100} className="h-2" />
                    </div>
                    <p className="text-sm">{daysRemaining} days left</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Images Used</p>
                    <div className="mb-2">
                      <Progress 
                        value={(mockSubscription.imagesDownloaded / mockSubscription.imagesAllowed) * 100}
                        className={`h-2 ${imagesRemaining < 10 ? 'bg-amber-500' : ''}`}
                      />
                    </div>
                    <p className="text-sm flex items-center">
                      {imagesRemaining} images remaining
                      {imagesRemaining < 10 && (
                        <span className="flex items-center text-amber-500 ml-2">
                          <AlertTriangle size={14} className="mr-1" /> Running low
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Package Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                  {mockSubscription.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={handleManageSubscription}>Manage Subscription</Button>
              <Button onClick={handleUpgradePackage}>Upgrade Package</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Recent subscription payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => {
                const date = new Date();
                date.setMonth(date.getMonth() - index);
                
                return (
                  <div 
                    key={index} 
                    className="flex justify-between items-center py-3 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium">Premium Package</p>
                      <p className="text-sm text-muted-foreground">
                        {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹2,499</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Paid</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="link" className="w-full" onClick={handleViewAllTransactions}>View All Transactions</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Packages</CardTitle>
          <CardDescription>Upgrade or change your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Package */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Basic</CardTitle>
                <CardDescription>For casual cricket fans</CardDescription>
              </CardHeader>
              <CardContent className="pb-3 space-y-4">
                <div className="text-3xl font-bold">₹799 <span className="text-sm font-normal text-muted-foreground">/month</span></div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>10 premium images per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>HD resolution downloads</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Personal use only</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleDowngrade}>Downgrade</Button>
              </CardFooter>
            </Card>
            
            {/* Premium Package (Current) */}
            <Card className="border-cricket-red dark:border-cricket-red">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Premium</CardTitle>
                    <CardDescription>For dedicated fans</CardDescription>
                  </div>
                  <div className="px-2 py-1 bg-cricket-red text-white text-xs rounded">Current</div>
                </div>
              </CardHeader>
              <CardContent className="pb-3 space-y-4">
                <div className="text-3xl font-bold">₹2,499 <span className="text-sm font-normal text-muted-foreground">/month</span></div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>50 premium images per month</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>HD and 4K resolution downloads</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>No watermarks</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Commercial usage rights</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button disabled className="w-full">Current Plan</Button>
              </CardFooter>
            </Card>
            
            {/* Pro Package */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Pro</CardTitle>
                <CardDescription>For professionals</CardDescription>
              </CardHeader>
              <CardContent className="pb-3 space-y-4">
                <div className="text-3xl font-bold">₹4,199 <span className="text-sm font-normal text-muted-foreground">/month</span></div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Unlimited images</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Raw file downloads</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Priority access to new content</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 shrink-0 mt-0.5" />
                    <span>Extended commercial rights</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleUpgradePackage}>Upgrade</Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscriptions;
