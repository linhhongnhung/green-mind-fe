import React, { createContext, useContext, useState } from "react";

interface CartContextProps {
  selectedProducts: number[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<number[]>>;
  clearSelectedProducts: () => void;

  cartItems: CartItem[];
  setcartItems: any;
}

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  };
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [cartItems, setcartItems] = useState<CartItem[]>([]);

  const clearSelectedProducts = () => {
    setSelectedProducts([]);
  };

  const contextValue: CartContextProps = {
    selectedProducts,
    setSelectedProducts,
    clearSelectedProducts,
    cartItems,
    setcartItems,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
