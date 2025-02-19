import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ProductContext } from "../../../contexts/product";
import { backendUrl, imageUrl } from "../../../utils/BackendURL";
import axios from "axios";
import { CartContext } from "../../../contexts/cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const ListProduct = () => {
  const { product: products, error, loading } = useContext(ProductContext);
  const { fetchCart, cart } = useContext(CartContext);

  const addToCart = async (product) => {
    try {
      await axios.post(`${backendUrl}/cart`, { product });
      fetchCart();
      toast.success("Product Added to Cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const deleteFromCart = async (product) => {
    try {
      await axios.delete(`${backendUrl}/cart/${product}`);
      fetchCart();
      toast.success("Product Removed from Cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products || products.length === 0) return <p>No products found</p>;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: "contain",
                  p: 1,
                  backgroundColor: "#f5f5f5",
                }}
                image={`${imageUrl}/${product.image}`}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: "bold",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="purple"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  <p
                    style={{ fontSize: "20px", fontWeight: "400", margin: "0" }}
                  >
                    $ {product.price.toFixed(2)}
                  </p>
                </Typography>
                {product.stock > 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontStyle: product.stock < 10 ? "normal" : "normal",
                      color:
                        product.stock < 10 ? "error.main" : "text.secondary",
                    }}
                  >
                    {product.stock < 10 ? "Low stock Only " : " "}{" "}
                    {product.stock} units available
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Out of Stock (0 units available)
                  </Typography>
                )}
              </CardContent>

              <CardActions
                sx={{ justifyContent: "center", borderTop: "1px solid #eee" }}
              >



{Array.isArray(cart) && cart.some((cartItem) => cartItem.product._id === product._id) ? (
  <IconButton
    aria-label="remove from cart"
    sx={{ color: "error.main" }}
    onClick={() => deleteFromCart(product._id)}
    disabled={product.stock === 0}
  >
    <RemoveShoppingCartIcon />
  </IconButton>
) : (
  <IconButton
    aria-label="add to cart"
    sx={{ color: "success.main" }}
    onClick={() => addToCart(product._id)}
    disabled={product.stock === 0}
  >
    <AddShoppingCartIcon />
  </IconButton>
)}






              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ListProduct;
