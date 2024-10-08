// src/components/Signup.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupCustomer, signupMerchant } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Alert,
  CircularProgress,
  FormControl,
  FormLabel,
} from '@mui/material';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    userType: 'customer', // default to customer
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserTypeChange = (e) => {
    const { value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      userType: value,
      city: value === 'customer' ? prevData.city : '', // Clear city if not customer
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (credentials.userType === 'customer') {
        await dispatch(
          signupCustomer({
            email: credentials.email,
            password: credentials.password,
            city: credentials.city,
          })
        ).unwrap();
        alert('Customer sign-up successful! Please log in.');
        navigate('/login');
      } else if (credentials.userType === 'merchant') {
        await dispatch(
          signupMerchant({
            email: credentials.email,
            password: credentials.password,
          })
        ).unwrap();
        alert('Merchant sign-up successful! Please log in.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Sign Up Failed:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Sign Up
        </Typography>
        {authError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {authError}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={credentials.password}
            onChange={handleChange}
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">User Type</FormLabel>
            <RadioGroup
              row
              aria-label="userType"
              name="userType"
              value={credentials.userType}
              onChange={handleUserTypeChange}
            >
              <FormControlLabel value="customer" control={<Radio />} label="Customer" />
              <FormControlLabel value="merchant" control={<Radio />} label="Merchant" />
            </RadioGroup>
          </FormControl>
          {credentials.userType === 'customer' && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="address-level2"
              value={credentials.city}
              onChange={handleChange}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={authStatus === 'loading'}
            sx={{ mt: 3, mb: 2 }}
          >
            {authStatus === 'loading' ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Already have an account?{' '}
          <Button variant="text" color="primary" onClick={() => navigate('/login')}>
            Log In
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
