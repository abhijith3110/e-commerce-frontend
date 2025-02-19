import React, { useState } from "react";
import ProductList from "../product-list/ProductList";
import { IoAdd } from "react-icons/io5";
import Overlay from "../../common/Overlay";
import AddProduct from "../add-product/AddProduct";
import DeleteProduct from "../delete-product/DeleteProduct";
import UpdateProduct from "../update-product/UpdateProduct";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleOpen = (type, productId = null) => {
    setShowOverlay(true);
    setOpenAddProduct(type === "add");
    setOpenUpdateProduct(type === "update");
    setOpenDeleteProduct(type === "delete");
    setSelectedProductId(productId);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setOpenAddProduct(false);
    setOpenUpdateProduct(false);
    setOpenDeleteProduct(false);
    setSelectedProductId(null);
  };

  return (
    <>
      <header className="adminheader">
        <div className="admin-header">
          <p>Welcome, Admin!</p>
        </div>
      </header>

      <div className="admin-dashboard-container">
        <div className="admin-dashboard-add" onClick={() => handleOpen("add")}>
          <p>Add Product</p>
          <button>
            <IoAdd style={{ fontSize: "20px", textAlign: "center" }} />
          </button>
        </div>

        <ProductList
          openUpdate={(id) => handleOpen("update", id)}
          openDelete={(id) => handleOpen("delete", id)}
        />
      </div>

      {showOverlay && <Overlay onClick={handleCloseOverlay} />}

      <div className={`openAddProduct ${openAddProduct ? "show" : "hide"}`}>
        {openAddProduct && <AddProduct onClose={handleCloseOverlay} />}
      </div>

      <div className={`openAddProduct ${openUpdateProduct ? "show" : "hide"}`}>
        {openUpdateProduct && selectedProductId && (
          <UpdateProduct
            productId={selectedProductId}
            onClose={handleCloseOverlay}
          />
        )}
      </div>

      <div
        className={`openDeleteProduct ${openDeleteProduct ? "show" : "hide"}`}
      >
        {openDeleteProduct && selectedProductId && (
          <DeleteProduct
            productId={selectedProductId}
            onClose={handleCloseOverlay}
          />
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
