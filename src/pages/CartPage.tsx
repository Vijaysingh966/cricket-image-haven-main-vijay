
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage = () => {
  const navigate = useNavigate();
  // Sample cart items - in a real app, these would come from a state management system
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Cricket Action Shot',
      price: 19.99,
      quantity: 2,
      image: '/placeholder.svg',
    },
    {
      id: '2',
      name: 'Stadium Aerial View',
      price: 29.99,
      quantity: 1,
      image: '/placeholder.svg',
    },
    {
      id: '3',
      name: 'Team Celebration',
      price: 24.99,
      quantity: 1,
      image: '/placeholder.svg',
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map((item) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const proceedToCheckout = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.07;
    const total = subtotal + tax;
    
    // Navigate to checkout page with cart data
    navigate('/checkout', { 
      state: { 
        cartItems,
        subtotal,
        tax,
        total
      } 
    });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <>
      <Header />
      <motion.div
        initial="initial"
        animate="in"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 pt-24 pb-32"
      >
        <h1 className="text-3xl font-bold mb-8 text-left">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <>
            <Card className="mb-8">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Image</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="h-16 w-16 rounded-md overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>₹{(item.price * 83.5).toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{(item.price * item.quantity * 83.5).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <Card className="md:w-1/3">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{(calculateSubtotal() * 83.5).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>₹{(calculateSubtotal() * 0.07 * 83.5).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{(calculateSubtotal() * 1.07 * 83.5).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-6"
                    onClick={proceedToCheckout}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild>
              <a href="/explore">Continue Shopping</a>
            </Button>
          </div>
        )}
      </motion.div>
      <Navigation />
    </>
  );
};

export default CartPage;
