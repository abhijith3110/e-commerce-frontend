import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../utils/BackendURL";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null); 

    try {
      const response = await axios.get(`${backendUrl}/product`);
      setProduct(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []); 

  return (
    <ProductContext.Provider value={{ product, error, loading, fetchProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
