
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QrCode, AtSign, Loader2, Shield, AlertCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UPIPaymentProps {
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

const formSchema = z.object({
  upiMethod: z.enum(["id", "qr"]),
  upiId: z.string().optional().refine((val) => {
    // If method is ID, require valid UPI ID format
    if (val === undefined) return true;
    return val.includes('@') || val === '';
  }, {
    message: "Please enter a valid UPI ID (e.g., username@upi)",
  }),
});

const UPIPayment = ({ onSubmit, isProcessing }: UPIPaymentProps) => {
  const [upiMethod, setUpiMethod] = useState<"id" | "qr">("id");
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      upiMethod: "id",
      upiId: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  const popularUPIApps = [
    { name: "Google Pay", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/220px-Google_Pay_Logo_%282020%29.svg.png" },
    { name: "PhonePe", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.png/220px-PhonePe_Logo.png" },
    { name: "Paytm", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/220px-Paytm_Logo_%28standalone%29.svg.png" },
    { name: "Amazon Pay", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Amazon_Pay_logo.svg/200px-Amazon_Pay_logo.svg.png" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="upiMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Choose UPI Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value: "id" | "qr") => {
                    field.onChange(value);
                    setUpiMethod(value);
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="id" id="upi-id" />
                    <label htmlFor="upi-id" className="cursor-pointer flex items-center">
                      <AtSign className="mr-2 h-4 w-4" />
                      <span>Pay via UPI ID</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="qr" id="upi-qr" />
                    <label htmlFor="upi-qr" className="cursor-pointer flex items-center">
                      <QrCode className="mr-2 h-4 w-4" />
                      <span>Scan QR Code</span>
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {upiMethod === "id" && (
          <>
            <FormField
              control={form.control}
              name="upiId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UPI ID</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="yourname@upi"
                        {...field}
                        className="pl-10"
                        list="upi-suggestions"
                      />
                      <datalist id="upi-suggestions">
                        <option value="username@okicici" />
                        <option value="username@okhdfc" />
                        <option value="username@okhdfcbank" />
                        <option value="username@oksbi" />
                        <option value="username@ybl" />
                        <option value="username@upi" />
                      </datalist>
                      <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-4 gap-2 mt-2">
              {popularUPIApps.map((app) => (
                <div key={app.name} className="flex flex-col items-center p-2 border rounded-md hover:bg-accent cursor-pointer">
                  <img src={app.icon} alt={app.name} className="h-8 object-contain mb-1" />
                  <span className="text-xs text-center">{app.name}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {upiMethod === "qr" && (
          <div className="flex flex-col items-center justify-center p-6 border rounded-md">
            <div className="bg-white p-1 rounded mb-4 border">
              <QrCode className="w-48 h-48" />
            </div>
            <div className="text-sm text-center space-y-1">
              <p className="font-medium">Steps to pay:</p>
              <ol className="text-xs text-muted-foreground list-decimal list-inside">
                <li>Open any UPI app on your mobile</li>
                <li>Select 'Scan QR' option</li>
                <li>Point your camera to this QR code</li>
                <li>Confirm payment in your UPI app</li>
              </ol>
            </div>
          </div>
        )}

        <div className="mt-4">
          <div 
            className="flex items-center text-sm text-primary cursor-pointer mb-2" 
            onClick={() => setShowSecurityInfo(!showSecurityInfo)}
          >
            <Shield className="mr-2 h-4 w-4" />
            <span>Payment Security Information {showSecurityInfo ? '▲' : '▼'}</span>
          </div>
          
          {showSecurityInfo && (
            <Alert className="bg-primary-foreground">
              <AlertDescription className="text-xs">
                <ul className="list-disc list-inside space-y-1">
                  <li>Your payment information is secured with end-to-end encryption</li>
                  <li>We do not store your UPI details on our servers</li>
                  <li>Transactions are processed on secure banking channels</li>
                  <li>We comply with all digital payment security standards</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            "Pay via UPI"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UPIPayment;
