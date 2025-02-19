import React, { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { BsHandbagFill } from "react-icons/bs";
import "./Dashboard.css";
import ListProduct from "../list-product/ListProduct";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../contexts/cart";

const Dashboard = () => {
  const navigate = useNavigate();
  const { carts } = useContext(CartContext);

  return (
    <div className="dashboard">
      <header className="customer-header">
        <div className="customer-header-container">
          <div className="customer-header-heading">
            <h1>Welcome, Customer ! </h1>
          </div>
          <div className="customer-header-content">
            <div onClick={() => navigate("/cart")} className="cart-div">
              <FaCartShopping style={{ fontSize: "30px" }} />
              <p>{carts.length}</p>
            </div>
            <div>
              <BsHandbagFill style={{ fontSize: "30px" }} onClick={() => navigate("/orders")}/>
            </div>
          </div>
        </div>
      </header>

      <div className="all-product-container">
        <div className="all-product-heading">
          <h1>All Products</h1>
        </div>
        <ListProduct />
      </div>
    </div>
  );
};

export default Dashboard;
