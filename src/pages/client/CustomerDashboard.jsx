// src/components/CustomerDashboard.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredit } from "../../features/customer/customerSlice";
import { fetchRestaurants } from "../../features/customer/customerSlice";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { FoodOrderDetail } from "../../pages/client/FoodOrderDetail";

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const credit = useSelector((state) => state.auth.credit);
  const restaurants = useSelector((state) => state.restaurants.list);
  const restaurantsStatus = useSelector((state) => state.restaurants.status);

  useEffect(() => {
    if (user && user.role === "customer") {
      dispatch(fetchRestaurants(user.city));
    }
  }, [dispatch, user]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4">Welcome, {user.email}</Typography>
        <Box>
          <Typography variant="h6">Credit: {credit}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch({ type: "auth/logout" });
              navigate("/login");
            }}
            sx={{ mt: 1 }}
          >
            Logout
          </Button>
        </Box>
      </Box>
      <Typography variant="h5" gutterBottom>
        Restaurants in {user.city}
      </Typography>
      <FoodOrderDetail />
    </Container>
  );
};

export default CustomerDashboard;
