
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, Calendar, Lock, Loader2 } from 'lucide-react';

interface PaymentFormProps {
  onSubmit: (data: any) => void;
  isProcessing: boolean;
}

const formSchema = z.object({
  cardNumber: z.string().min(16, {
    message: "Card number must be 16 digits.",
  }).max(19),
  cardName: z.string().min(3, {
    message: "Name on card is required.",
  }),
  expiryDate: z.string().min(5, {
    message: "Expiry date is required.",
  }).max(5),
  cvv: z.string().min(3, {
    message: "CVV must be 3-4 digits.",
  }).max(4),
});

const PaymentForm = ({ onSubmit, isProcessing }: PaymentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  // Credit card number formatter
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Expiry date formatter (MM/YY)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Card Number */}
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="1234 5678 9123 4567"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                    className="pl-10"
                    maxLength={19}
                  />
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name on Card */}
        <FormField
          control={form.control}
          name="cardName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name on Card</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {/* Expiry Date */}
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="MM/YY"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value);
                        field.onChange(formatted);
                      }}
                      className="pl-10"
                      maxLength={5}
                    />
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CVV */}
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="123"
                      {...field}
                      className="pl-10"
                      maxLength={4}
                    />
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            <>
              <Lock className="mr-2 h-4 w-4" />
              Pay Securely ₹
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
