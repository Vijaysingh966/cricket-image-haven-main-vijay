
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CreditCard, ShieldCheck, IndianRupee, Smartphone, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Loader2, PaypalIcon } from '@/components/ui/custom-icons';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import PaymentForm from '@/components/checkout/PaymentForm';
import PaymentSuccess from '@/components/checkout/PaymentSuccess';
import UPIPayment from '@/components/checkout/UPIPayment';
import NetBankingPayment from '@/components/checkout/NetBankingPayment';
import WalletPayment from '@/components/checkout/WalletPayment';
import PaypalPayment from '@/components/checkout/PaypalPayment';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("card");
  
  // Get cart items from location state or use empty array if none
  const cartItems: CartItem[] = location.state?.cartItems || [];
  const subtotal = location.state?.subtotal || 0;
  const tax = location.state?.tax || 0;
  const total = location.state?.total || 0;
  
  const handleGoBack = () => {
    navigate('/cart');
  };

  const processPayment = (paymentMethod: string, paymentDetails: any) => {
    // Reset errors
    setPaymentError(null);
    setIsProcessing(true);
    
    // Track payment progress
    setProcessingStage("Initializing payment");
    setProcessingProgress(10);
    
    // Simulated payment flow with multiple stages
    const simulatePaymentFlow = () => {
      setTimeout(() => {
        setProcessingStage("Verifying details");
        setProcessingProgress(30);
        
        setTimeout(() => {
          setProcessingStage("Processing payment");
          setProcessingProgress(60);
          
          setTimeout(() => {
            setProcessingStage("Confirming transaction");
            setProcessingProgress(90);
            
            setTimeout(() => {
              // Simulated response after processing
              finishPaymentProcess();
            }, 500);
          }, 600);
        }, 500);
      }, 400);
    };
    
    // Start the payment flow simulation
    simulatePaymentFlow();
  };
  
  const finishPaymentProcess = () => {
    // Simulate 90% success rate
    const isSuccessful = Math.random() < 0.9;
    
    if (isSuccessful) {
      const txnId = `TXN${Math.floor(Math.random() * 1000000)}`;
      setTransactionId(txnId);
      setProcessingProgress(100);
      setProcessingStage("Payment completed");
      
      // Short delay before showing success screen
      setTimeout(() => {
        setPaymentSuccess(true);
        setIsProcessing(false);
        
        // Add purchased items to user's account
        const purchasedItems = cartItems.map(item => ({
          id: parseInt(item.id),
          title: item.name,
          url: item.image,
          date: new Date().toISOString().split('T')[0],
          price: item.price
        }));
        
        // In a real app, you would save this to a database
        // For now, we'll simulate this with localStorage
        const existingItems = JSON.parse(localStorage.getItem('purchasedImages') || '[]');
        localStorage.setItem('purchasedImages', JSON.stringify([...existingItems, ...purchasedItems]));
        
        // Send email confirmation (simulated)
        sendEmailConfirmation(txnId, cartItems, total);
      }, 500);
    } else {
      setIsProcessing(false);
      setProcessingProgress(0);
      setProcessingStage(null);
      
      // Random error messages for demonstration
      const errorMessages = [
        "Payment was declined by your bank. Please try another payment method.",
        "The payment service is temporarily unavailable. Please try again.",
        "Your payment could not be authorized. Please check your details.",
        "Network error occurred during payment processing. Please try again."
      ];
      
      const errorMsg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      setPaymentError(errorMsg);
      
      toast.error("Payment Failed", {
        description: errorMsg,
      });
    }
  };
  
  const sendEmailConfirmation = (txnId: string, items: CartItem[], total: number) => {
    console.log(`Sending email confirmation for transaction ${txnId}`);
    // In a real app, this would call an API to send an email
  };

  const handleRetryPayment = () => {
    setPaymentError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (paymentSuccess) {
    return <PaymentSuccess transactionId={transactionId} navigate={navigate} />;
  }

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 pt-24 pb-32"
      >
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={handleGoBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold">Secure Checkout</h1>
        </div>

        {isProcessing && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500 mr-2" />
                <AlertTitle className="text-blue-700">Processing Payment</AlertTitle>
              </div>
              <AlertDescription className="text-blue-600">
                {processingStage}. Please don't close or refresh this page.
              </AlertDescription>
              <Progress value={processingProgress} className="h-1.5 mt-2" />
            </div>
          </Alert>
        )}
        
        {paymentError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Payment Failed</AlertTitle>
            <AlertDescription>
              {paymentError}
              <Button variant="outline" size="sm" onClick={handleRetryPayment} className="ml-4">
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-green-600" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-5 mb-8">
                    <TabsTrigger value="card" className="flex flex-col items-center gap-2 py-3">
                      <CreditCard className="h-5 w-5" />
                      <span className="text-xs">Card</span>
                    </TabsTrigger>
                    <TabsTrigger value="upi" className="flex flex-col items-center gap-2 py-3">
                      <Smartphone className="h-5 w-5" />
                      <span className="text-xs">UPI</span>
                    </TabsTrigger>
                    <TabsTrigger value="netbanking" className="flex flex-col items-center gap-2 py-3">
                      <IndianRupee className="h-5 w-5" />
                      <span className="text-xs">Net Banking</span>
                    </TabsTrigger>
                    <TabsTrigger value="wallet" className="flex flex-col items-center gap-2 py-3">
                      <ShieldCheck className="h-5 w-5" />
                      <span className="text-xs">Wallets</span>
                    </TabsTrigger>
                    <TabsTrigger value="paypal" className="flex flex-col items-center gap-2 py-3">
                      <PaypalIcon className="h-5 w-5" />
                      <span className="text-xs">PayPal</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card">
                    <PaymentForm 
                      onSubmit={(details) => processPayment('card', details)} 
                      isProcessing={isProcessing}
                    />
                  </TabsContent>
                  
                  <TabsContent value="upi">
                    <UPIPayment 
                      onSubmit={(details) => processPayment('upi', details)} 
                      isProcessing={isProcessing}
                    />
                  </TabsContent>
                  
                  <TabsContent value="netbanking">
                    <NetBankingPayment 
                      onSubmit={(details) => processPayment('netbanking', details)} 
                      isProcessing={isProcessing}
                    />
                  </TabsContent>
                  
                  <TabsContent value="wallet">
                    <WalletPayment 
                      onSubmit={(details) => processPayment('wallet', details)} 
                      isProcessing={isProcessing}
                    />
                  </TabsContent>
                  
                  <TabsContent value="paypal">
                    <PaypalPayment 
                      onSubmit={(details) => processPayment('paypal', details)} 
                      isProcessing={isProcessing}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex-col space-y-2 items-start border-t pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Lock className="mr-2 h-4 w-4" />
                  All transactions are secure and encrypted
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Your personal data is protected by SSL/TLS encryption
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded overflow-hidden mr-2">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm">
                        {item.name} × {item.quantity}
                      </span>
                    </div>
                    <span>₹{(item.price * item.quantity * 83.5).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{(subtotal * 83.5).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes</span>
                    <span>₹{(tax * 83.5).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{(total * 83.5).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <div className="flex items-center justify-center w-full space-x-2 text-xs text-muted-foreground mt-4">
                  <Lock className="h-3 w-3" />
                  <span>Secure Payment</span>
                  <span>|</span>
                  <ShieldCheck className="h-3 w-3" />
                  <span>100% Guaranteed</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.div>
      <Navigation />
    </>
  );
};

export default CheckoutPage;
