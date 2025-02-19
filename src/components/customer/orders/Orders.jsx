import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Chip,
  Divider,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";
import { backendUrl, imageUrl } from "../../../utils/BackendURL";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${backendUrl}/order`);
      setOrders(response.data.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircleIcon color="success" sx={{ mr: 1 }} />;
      case "pending":
        return <PendingActionsIcon color="warning" sx={{ mr: 1 }} />;
      default:
        return <ErrorOutlineIcon color="error" sx={{ mr: 1 }} />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, background: "#ccc" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
        }}
      >
        Your Order History
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
            color: "error.main",
          }}
        >
          <ErrorOutlineIcon sx={{ mr: 1 }} />
          <Typography>Error loading orders: {error}</Typography>
        </Box>
      )}

      {!loading && !error && orders.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
            color: "text.secondary",
          }}
        >
          <Typography variant="h6">No orders found. Start shopping!</Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        {orders.map((order, index) => (
          <Grid item xs={12} key={order._id || index}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Typography variant="h5" component="div">
                    Order #{index + 1}
                  </Typography>
                  <Chip
                    label={order.payment.status.toUpperCase()}
                    icon={getStatusIcon(order.payment.status)}
                    variant="outlined"
                    sx={{
                      fontWeight: "bold",
                      borderWidth: 2,
                      borderColor: "primary.main",
                    }}
                  />
                </Stack>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body1">
                      Items: {order.products.length}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body1">
                      Total: $ {order.grand_total.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="subtitle1"
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  Products
                </Typography>

                <Grid container spacing={3}>
                  {order.products.map((item, itemIndex) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={item._id || itemIndex}
                    >
                      <Card sx={{ display: "flex", height: "100%" }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 120, objectFit: "cover" }}
                          image={`${imageUrl}/${item.product.image}`}
                          alt={item.product.name}
                        />
                        <CardContent sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            {item.product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Price: $ {item.product.price.toFixed(2)}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            Subtotal: $
                            {(item.quantity * item.product.price).toFixed(2)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Orders;
