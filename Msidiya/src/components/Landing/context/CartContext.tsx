import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CartItem {
  main_image: string | undefined;
  id: number;
  title: string;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  totalPrice: number;
  inCart: (id: number) => boolean;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => { },
  removeFromCart: () => { },
  clearCart: () => { },
  totalPrice: 0,
  inCart: (id: number) => id != undefined && false,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize cartItems from localStorage or as an empty array
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [totalPrice, setTotalPrice] = useState(0)

  const inCart = (id: number): boolean => {
    return cartItems.some(item => item.id == id)
  }

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setTotalPrice(cartItems.reduce((acc, item) => acc + item.price, 0))
  }, [cartItems]);

  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    console.log("Adding item to cart:", item);

    // Validate price
    if (typeof item.price !== "number") {
      console.error("Invalid price format for item:", item);
      return;
    }

    setCartItems((prev) => {
      // Check if the item already exists in the cart
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.filter(i => i.id != item.id); // Do not add duplicates
      } else {
        return [...prev, item];
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice, inCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
