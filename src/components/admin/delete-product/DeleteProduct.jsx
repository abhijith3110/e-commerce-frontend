import React, { useContext } from "react";
import "./DeleteProduct.css";
import axios from "axios";
import { backendUrl } from "../../../utils/BackendURL";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductContext } from "../../../contexts/product";

const DeleteProduct = ({ productId, onClose }) => {
  const { fetchProduct } = useContext(ProductContext);

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`${backendUrl}/product/${productId}`);
      onClose();
      fetchProduct();
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  return (
    <div className="delete-product-overlay">
      <div className="delete-product-modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this product?</p>
        <div className="delete-product-buttons">
          <button className="delete-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-btn" onClick={() => handleDeleteProduct()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
