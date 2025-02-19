import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { BsHandbagFill } from "react-icons/bs";
import './Dashboard.css'
import ListProduct from "../list-product/ListProduct";

const Dashboard = () => {

  return (

    <div className='dashboard'>
      <header className='customer-header'>
        <div className='customer-header-container'>
        <div className="customer-header-heading"><h1>Welcome, Customer ! </h1></div>
        <div className="customer-header-content">
          <div><FaCartShopping /></div>
          <div><BsHandbagFill/></div>
        </div>
        </div>
      </header>

      <div className="all-product-container">
        <div className="all-product-heading">
          <h1>All Products</h1>
        </div>
        <ListProduct/>
      </div>
      
    </div>
  )

}

export default Dashboard