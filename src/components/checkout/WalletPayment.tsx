
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface WalletPaymentProps {
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

const formSchema = z.object({
  walletName: z.string({
    required_error: "Please select a wallet.",
  }),
});

const walletLogos = {
  "paytm": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/220px-Paytm_Logo_%28standalone%29.svg.png",
  "phonepe": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/PhonePe_Logo.png/220px-PhonePe_Logo.png",
  "amazonpay": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Amazon_Pay_logo.svg/200px-Amazon_Pay_logo.svg.png",
  "googlepay": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/220px-Google_Pay_Logo_%282020%29.svg.png",
  "mobikwik": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/MobiKwik_Logo.svg/220px-MobiKwik_Logo.svg.png",
  "freecharge": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Freecharge_Logo_%282022%29.svg/200px-Freecharge_Logo_%282022%29.svg.png"
};

const WalletPayment = ({ onSubmit, isProcessing }: WalletPaymentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletName: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="walletName"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select Your Wallet</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {Object.entries(walletLogos).map(([key, logo]) => (
                    <div key={key} className="flex flex-col items-center space-y-2 p-3 border rounded-md hover:bg-accent cursor-pointer">
                      <RadioGroupItem value={key} id={key} className="sr-only" />
                      <img src={logo as string} alt={key} className="h-8 object-contain" />
                      <label htmlFor={key} className="cursor-pointer text-sm font-medium capitalize">
                        {key === 'googlepay' ? 'Google Pay' : 
                         key === 'amazonpay' ? 'Amazon Pay' : 
                         key === 'phonepe' ? 'PhonePe' : 
                         key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            "Pay via Wallet"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default WalletPayment;
