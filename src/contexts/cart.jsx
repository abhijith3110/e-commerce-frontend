import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../utils/BackendURL";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${backendUrl}/cart`);
      setCarts(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      setError(error.message);
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ carts, error, loading, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
