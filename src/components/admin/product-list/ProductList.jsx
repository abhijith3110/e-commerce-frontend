import React, { useContext } from "react";
import { TbShoppingBagEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { imageUrl } from "../../../utils/BackendURL";
import { ProductContext } from "../../../contexts/product";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./ProductList.css";

const ProductList = ({ openDelete, openUpdate }) => {
  const { product: products, error, loading } = useContext(ProductContext);

  return (
    <div className="product-table-container">
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <p style={{ color: "red", fontSize: "20px", textAlign: "center" }}>
          Something Went Wrong!
        </p>
      )}

      {products && products.length > 0 ? (
        <table className="product-custom-table">
          <thead>
            <tr>
              <th style={{ textAlign: "start", paddingLeft: "50px" }}>Name</th>
              <th>Price</th>
              <th>Remaining Stocks</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) &&
              products.map((product) => (
                <tr key={product._id}>
                  <td className="name-image-col">
                    <img
                      src={`${imageUrl}/${product.image}`}
                      alt="Product"
                      className="product-image"
                    />
                    {product.name}
                  </td>
                  <td>$ {product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="product-update-btn"
                      onClick={() => openUpdate(product._id)}
                    >
                      <TbShoppingBagEdit style={{ fontSize: "25px" }} />
                    </button>
                  </td>
                  <td>
                    <button
                      className="product-delete-btn"
                      onClick={() => openDelete(product._id)}
                    >
                      <MdOutlineDeleteOutline style={{ fontSize: "25px" }} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        !loading && (
          <p style={{ color: "red", fontSize: "20px", textAlign: "center" }}>
            No Products Available
          </p>
        )
      )}
    </div>
  );
};

export default ProductList;
