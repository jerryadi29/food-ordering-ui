// src/components/Cart.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  TextField,
  Alert,
  Snackbar,
  Alert as MuiAlert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../../features/customer/cartSlice";
// import axios from "../api/axiosConfig"; // Ensure axios is configured
import { useNavigate } from "react-router-dom";
import { fetchPlacedOrder } from "../../features/customer/orderSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartRestaurantId = useSelector((state) => state.cart.restaurantId);
  const userId = useSelector((state) => state.auth.user.id);
  // Assuming user ID is stored here
  console.log(cartRestaurantId, "cartRestaurantId ====");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleIncrement = (index) => {
    dispatch(incrementQuantity(index));
  };

  const handleDecrement = (index) => {
    dispatch(decrementQuantity(index));
  };

  const handleRemove = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setSnackbarMessage("Cart has been cleared.");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handlePlaceOrder = async () => {
    // Construct payload
    const payload = cartItems.map((item) => ({
      id: item.id,
      itemName: item.itemName,
      itemQuantity: item.quantity,
      itemPrice: item.price,
    }));

    try {
      const response = await axios.post(
        `http://localhost:9090/food-ordering/users/order/${cartRestaurantId}/${userId}`,
        payload
      );

      
      /// {status: 200 , orderId :18}
      // Assuming a successful response status
      if (response.status === 200 || response.status === 201) {
        setSnackbarMessage("Order placed successfully!");
        setOpenSnackbar(true);
        dispatch(clearCart());
        dispatch(fetchPlacedOrder(response.orderId));

        navigate(
          `/customer/items/${cartRestaurantId}/order-status/${response.orderId}`
        );
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage(
        error.response?.data?.message || "Failed to place order."
      );
      setOpenSnackbar(true);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCancelOrder = () => {
    dispatch(clearCart());
    setOpenDialog(false);
    setSnackbarMessage("Order has been canceled.");
    setOpenSnackbar(true);
    navigate("/customer-dashboard");
  };
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button variant="outlined" onClick={handleBack}>
          Back to Items List
        </Button>
      </Box>
      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {/* Order Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="order-dialog-title"
        aria-describedby="order-dialog-description"
      >
        <DialogTitle id="order-dialog-title">Confirm Order</DialogTitle>
        <DialogContent>
          <DialogContentText id="order-dialog-description">
            Are you sure you want to place this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handlePlaceOrder}
            variant="contained"
            color="primary"
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Title */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">Your Cart</Typography>
      </Box>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6">{item?.itemName}</Typography>

                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            Quantity Available: {item.quantityAvailable}{" "}
                            {item.quantityUnit}
                          </Typography>
                          <Typography variant="body2">
                            Available Time: {item.availableTime}
                          </Typography>
                        </Box>
                        {/* Display Customizations */}
                        {/* {Object.keys(item.additionalCustomizations).length >
                          0 && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="subtitle2">
                              Customizations:
                            </Typography>
                            {Object.entries(item.additionalCustomizations).map(
                              ([key, value]) => (
                                <Chip
                                  key={key}
                                  label={`${key}: ${
                                    Array.isArray(value)
                                      ? value.join(", ")
                                      : value
                                  }`}
                                  sx={{ mr: 1, mt: 1 }}
                                />
                              )
                            )}
                          </Box>
                        )} */}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          Price: ₹{item.price}
                        </Typography>
                        <Typography variant="body1">
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography variant="body1">
                          Subtotal: ₹{item.price * item.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => dispatch(decrementQuantity(index))}
                        disabled={item.quantity === 1}
                      >
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        onClick={() => dispatch(incrementQuantity(index))}
                      >
                        <Add />
                      </IconButton>
                      <IconButton
                        onClick={() => dispatch(removeFromCart(index))}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Bill Details */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Bill Details</Typography>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">Item Name</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">Quantity</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">Price</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">Subtotal</Typography>
                </Grid>
              </Grid>
              {cartItems.map((item, index) => (
                <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2">{item.itemName}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">{item.quantity}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">₹{item.price}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      ₹{item.price * item.quantity}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}></Grid>
                <Grid item xs={4}>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6">₹{totalPrice}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* Order Actions */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearCart}
            >
              Cancel Order
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Place Order
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
