import React, { useContext, useState } from "react";
import { backendUrl } from "../../../utils/BackendURL";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddProduct.css";
import { ProductContext } from "../../../contexts/product";

const AddProduct = ({ onClose }) => {
  const { fetchProduct } = useContext(ProductContext);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = "Product name is required.";
    }

    if (!product.price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(product.price) || Number(product.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!product.stock) {
      newErrors.stock = "Stock quantity is required.";
    } else if (isNaN(product.stock) || Number(product.stock) < 0) {
      newErrors.stock = "Stock must be a non-negative number.";
    }

    if (!product.image) {
      newErrors.image = "Product image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProduct({ ...product, image: file, imagePreview: imageUrl });
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("image", product.image);

    try {
      const response = await axios.post(`${backendUrl}/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {

        onClose();
        fetchProduct();
        toast.success("Product added successfully!", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Failed to add product. Please try again.", { autoClose: 3000 });
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group image-upload-section">
          <div className="image-upload-wrapper">
            <label htmlFor="image-upload" className="image-upload-label">
              {product.imagePreview ? (
                <img
                  src={product.imagePreview}
                  alt="Product Preview"
                  className="product-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <p>Click to upload product image</p>
                </div>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              onChange={handleImageChange}
              className="image-upload-input"
              accept="image/*"
            />
            {errors.image && <p style={{color:"red",margin:"0"}}>{errors.image}</p>}
          </div>
        </div>

        <div className="form-group">
          <label className="input-label">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="form-input"
          />
          {errors.name && <p style={{color:"red",margin:"0"}}>{errors.name}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="0.00"
              className="form-input"
            />
            {errors.price && <p style={{color:"red",margin:"0"}}>{errors.price}</p>}
          </div>

          <div className="form-group">
            <label className="input-label">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="0"
              className="form-input"
            />
            {errors.stock && <p style={{color:"red",margin:"0"}}>{errors.stock}</p>}
          </div>
        </div>

        <div className="add-product-btns">
          <button className="cancel-btn" onClick={onClose} type="button">
            Cancel
          </button>

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;