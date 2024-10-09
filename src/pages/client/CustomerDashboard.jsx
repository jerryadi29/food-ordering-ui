// src/components/CustomerDashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCredit, fetchRestaurants } from '../../features/authSlice';
import { fetchRestaurantsList } from '../../features/customer/restaurantsSlice';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import RestaurantCard from './RestaurantCard';

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const credit = useSelector((state) => state.auth.credit);
  const restaurants = useSelector((state) => state.restaurants.restaurants);
  const restaurantsStatus = useSelector((state) => state.restaurants.status);
  const restaurantsError = useSelector((state) => state.restaurants.error);
  console.log("---customer dashboard outside user---",user);
  useEffect(() => {
    if (user && user.role === 'customer') {
      console.log("---customer dashboard inside user---",user);
      dispatch(fetchRestaurantsList(user.city));
    }
  }, [navigate]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Customer!
        </Typography>
        <Typography variant="h6">Your Credit: ₹{credit}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">Available Restaurants in {user.city}</Typography>
      </Box>
      <Grid container spacing={3}>
        {restaurantsStatus === 'loading' && <Typography>Loading restaurants...</Typography>}
        {restaurantsStatus === 'failed' && <Typography color="error">{restaurantsError}</Typography>}
        {restaurantsStatus === 'succeeded' &&
          restaurants.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant.restaurantId}>
              <RestaurantCard restaurant={restaurant} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default CustomerDashboard;
