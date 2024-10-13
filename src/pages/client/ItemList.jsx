// src/components/ItemList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, clearItems } from "../../features/customer/itemsSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  decrementQuantity,
  incrementQuantity,
} from "../../features/customer/itemsSlice";
import { AddShoppingCart, Visibility } from "@mui/icons-material";
import { addToCart } from "../../features/customer/cartSlice"; // Assuming you have a cartSlice

const ItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  const items = useSelector((state) => state.items.list);
  const itemsStatus = useSelector((state) => state.items.status);
  const itemsError = useSelector((state) => state.items.error);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchItems(restaurantId));
    }

    // Cleanup on component unmount
    return () => {
      dispatch(clearItems());
    };
  }, [dispatch, restaurantId]);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleIncreament = (item, index) => {
    if (item.quantity >= item.maxQuantityPerOrder) {
      return;
    }
    dispatch(incrementQuantity(index));
  };
  const handleDecreament = (index) => {
    dispatch(decrementQuantity(index));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    // Optionally, show a success message or snackbar
    alert(`Added ${item.itemName} to cart!`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Back Button */}
      <Box sx={{ mb: 4 }}>
        <Button variant="outlined" onClick={handleBack}>
          Back to Restaurants
        </Button>
      </Box>

      {/* Title */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">Menu Items</Typography>
      </Box>

      {/* Content */}
      {itemsStatus === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {itemsStatus === "failed" && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {itemsError}
        </Alert>
      )}

      {itemsStatus === "succeeded" && (
        <>
          {items.length === 0 ? (
            <Typography variant="body1">
              No items available for this restaurant.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {items.map((item, index) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Item Name */}
                      <Typography gutterBottom variant="h6" component="div">
                        {item.itemName}
                      </Typography>

                      {/* Description */}
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>

                      {/* Price and Availability */}
                      <Box sx={{ mt: 2 }}>
                        <Chip label={`Price: ₹${item.price}`} color="primary" />
                        <Chip
                          label={`Available: ${item.available ? "Yes" : "No"}`}
                          color={item.available ? "success" : "error"}
                          sx={{ ml: 1 }}
                        />
                      </Box>

                      {/* Quantity and Time */}
                      {/* <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          Quantity Available: {item.quantityAvailable}{" "}
                          {item.quantityUnit}
                        </Typography>
                        <Typography variant="body2">
                          Available Time: {item.availableTime}
                        </Typography>
                        <Typography variant="body2">
                          Max Quantity per Order: {item.maxQuantityPerOrder}
                        </Typography>
                      </Box>

                      {/* Additional Customizations */}
                      {/* {item.additionalCustomizations && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Customizations: {item.additionalCustomizations}
                          </Typography>
                        </Box>
                      )}  */}
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleDecreament(index)}
                        >
                          -
                        </Button>
                        <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleIncreament(item, index)}
                        >
                          +
                        </Button>
                      </Box>
                      <Tooltip
                        title={
                          item.available ? "Add to Cart" : "Item Unavailable"
                        }
                      >
                        <span>
                          <Button
                            size="small"
                            variant="contained"
                            color={item.available ? "info" : "error"}
                            startIcon={
                              item.available ? <AddShoppingCart /> : null
                            }
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.available || item.quantity === 0}
                          >
                            {item.available
                              ? `Add to Cart`
                              : `Item is Unavailable`}
                          </Button>
                        </span>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      <></>
    </Container>
  );
};

export default ItemList;
