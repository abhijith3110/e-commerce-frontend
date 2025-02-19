import React, { useContext, useState, useEffect } from "react";
import { backendUrl, imageUrl } from "../../../utils/BackendURL";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductContext } from "../../../contexts/product";
import "./UpdateProduct.css";

const UpdateProduct = ({ onClose, productId }) => {
  const { fetchProduct } = useContext(ProductContext);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/product/${productId}`);
        const productData = response.data.data;
        setProduct({
          name: productData.name,
          price: productData.price,
          stock: productData.stock,
          image: productData.image || "",
          imagePreview: productData.image
            ? `${imageUrl}/${productData.image}`
            : "",
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const validate = () => {
    let newErrors = {};
    if (!product.name.trim()) newErrors.name = "Product name is required.";
    if (!product.price || isNaN(product.price) || Number(product.price) <= 0)
      newErrors.price = "Price is Invalid";
    if (!product.stock || isNaN(product.stock) || Number(product.stock) < 0)
      newErrors.stock = "Stock is Invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    if (product.image) formData.append("image", product.image);

    try {
      const response = await axios.put(
        `${backendUrl}/product/${productId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Product updated successfully!", { autoClose: 3000 });
        fetchProduct();
        onClose();
      }
    } catch (error) {
      toast.error("Failed to update product. Please try again.", {
        autoClose: 3000,
      });
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group image-upload-section">
          <div className="image-upload-wrapper">
            <label htmlFor="image-upload" className="image-upload-label">
              {product.imagePreview ? (
                <img
                  src={product.imagePreview || "/placeholder-image.png"}
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
          {errors.name && <p className="error-text">{errors.name}</p>}
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
            {errors.price && <p className="error-text">{errors.price}</p>}
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
            {errors.stock && <p className="error-text">{errors.stock}</p>}
          </div>
        </div>

        <div className="add-product-btns">
          <button className="cancel-btn" onClick={onClose} type="button">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
