// src/components/MerchantDashboard.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
} from '@mui/material';

const MerchantDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Welcome, {user.email}</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch({ type: 'auth/logout' });
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </Box>
      <Typography variant="h5" gutterBottom>
        Merchant Dashboard
      </Typography>
      {/* Placeholder for merchant functionalities like adding restaurants */}
      <Typography>
        Here you can manage your restaurants, add new menus, and view orders.
      </Typography>
    </Container>
  );
};

export default MerchantDashboard;
