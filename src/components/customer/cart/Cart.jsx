import React, { useContext } from "react";
import { CartContext } from "../../../contexts/cart";
import { backendUrl, imageUrl } from "../../../utils/BackendURL";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import "./Cart.css";

const Cart = () => {
  const { carts, error, loading, fetchCart } = useContext(CartContext);

  const updateQuantity = async (id, newQuantity) => {
    try {
      await axios.put(`${backendUrl}/cart/${id}`, { quantity: newQuantity });
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity!");
    }
  };

  const deleteFromCart = async (productId) => {
    try {
      await axios.delete(`${backendUrl}/cart/${productId}`);
      fetchCart();
      toast.success("Product removed from cart!");
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const grandTotal = carts.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0
  );

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/cart/create-checkout-session`,
        { carts }
      );

      const stripe = await loadStripe(
        "pk_test_51OTIAJSIBQHp4SrpnAMD9ufpg5DJiGLdmzMcNOiCo2KByrnqO7jKDvUJ8Ddvihj6s5nace7mYrm1jjNArTy1yViY00LErcEJBa"
      );

      const { error } = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Product Cart</h1>
        </div>

        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(carts) && carts.length > 0 ? (
              carts.map((item) => (
                <tr key={item._id}>
                  <td className="cart-product-image-name">
                    <img
                      src={
                        `${imageUrl}/${item.product.image}` || "Image Not Found"
                      }
                      alt={item.product?.name || "No Name"}
                      className="cart-item-image"
                    />
                    <div className="cart-product-name">
                      <p>{item.product?.name || "Unknown Product"}</p>
                    </div>
                  </td>
                  <td className="cart-product-price">
                    ${item.product?.price || 0}
                  </td>
                  <td className="quantity-count">
                    <div className="quantity-buttons">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.product?.price || 0) * item.quantity}</td>
                  <td style={{ cursor: "pointer" }}>
                    <RemoveShoppingCartIcon
                      onClick={() => deleteFromCart(item.product._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Your cart is empty.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="checkout-container">
          <div className="checkout-total">
            <p>Grand Total: ${grandTotal}</p>
          </div>
          <div className="checkout-btn">
            <button disabled={carts.length === 0} onClick={handlePayment}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
