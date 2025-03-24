
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface NetBankingPaymentProps {
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

const formSchema = z.object({
  bankName: z.string({
    required_error: "Please select a bank.",
  }),
});

const bankLogos = {
  "sbi": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/State_Bank_of_India_logo.svg/220px-State_Bank_of_India_logo.svg.png",
  "hdfc": "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/HDFC_Bank_Logo.svg/220px-HDFC_Bank_Logo.svg.png",
  "icici": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/ICICI_Bank_Logo.svg/220px-ICICI_Bank_Logo.svg.png",
  "axis": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/220px-Axis_Bank_logo.svg.png",
  "kotak": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Kotak_Mahindra_Bank_logo.svg/220px-Kotak_Mahindra_Bank_logo.svg.png",
  "other": "https://placehold.co/50x50?text=Bank"
};

const NetBankingPayment = ({ onSubmit, isProcessing }: NetBankingPaymentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankName: "",
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
          name="bankName"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select Your Bank</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {Object.entries(bankLogos).map(([key, logo]) => (
                    <div key={key} className="flex flex-col items-center space-y-2 p-3 border rounded-md hover:bg-accent cursor-pointer">
                      <RadioGroupItem value={key} id={key} className="sr-only" />
                      <img src={logo as string} alt={key} className="h-8 object-contain" />
                      <label htmlFor={key} className="cursor-pointer text-sm font-medium capitalize">
                        {key === 'other' ? 'Other Banks' : key.toUpperCase()}
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
            "Continue to Net Banking"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NetBankingPayment;
