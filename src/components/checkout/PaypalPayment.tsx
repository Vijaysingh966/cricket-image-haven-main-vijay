
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader2, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaypalPaymentProps {
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

const formSchema = z.object({
  acceptTerms: z.boolean().default(true),
});

const PaypalPayment = ({ onSubmit, isProcessing }: PaypalPaymentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      acceptTerms: true,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-md p-6 border rounded-lg bg-gradient-to-b from-blue-50 to-white">
            <div className="flex justify-center mb-6">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/124px-PayPal.svg.png" 
                alt="PayPal" 
                className="h-10" 
              />
            </div>
            
            <p className="text-center text-sm mb-6">
              Click the PayPal button below to securely pay with your PayPal account or credit card.
            </p>
            
            <div className="flex justify-center mb-4">
              <Button
                type="submit"
                className="w-full max-w-xs font-semibold"
                disabled={isProcessing}
                style={{ 
                  backgroundColor: '#0070ba', 
                  borderRadius: '50px',
                  height: '44px'
                }}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  "Pay with PayPal"
                )}
              </Button>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              By clicking, you agree to PayPal's terms and services.
            </p>
          </div>
          
          <Alert className="bg-blue-50 border-blue-100">
            <Shield className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-xs text-blue-800">
              PayPal protects your financial information with industry-leading security. Your payment details are never shared with sellers.
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-wrap justify-center gap-4">
            <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="Payment methods" className="h-5 object-contain" />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PaypalPayment;
