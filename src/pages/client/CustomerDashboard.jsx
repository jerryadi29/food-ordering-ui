// src/components/CustomerDashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '.../features/slices/restaurantsSlice';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';
import RestaurantList from './RestaurantList';

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const credit = useSelector((state) => state.auth.credit);
  const restaurants = useSelector((state) => state.restaurants.list);
  const restaurantsStatus = useSelector((state) => state.restaurants.status);

  useEffect(() => {
    if (user && user.role === 'customer') {
      dispatch(fetchRestaurants(user.city));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' });
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Welcome, {user.email}</Typography>
        <Box>
          <Typography variant="h6">Credit: ₹{credit}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ mt: 1 }}
          >
            Logout
          </Button>
        </Box>
      </Box>
      <Typography variant="h5" gutterBottom>
        Restaurants in {user.city}
      </Typography>
      <RestaurantList />
    </Container>
  );
};

export default CustomerDashboard;