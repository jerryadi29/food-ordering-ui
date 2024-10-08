// src/components/RestaurantItems.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { fetchItems , clearItems  } from '../../features/customer/itemSlice';

const RestaurantItems = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleAddToCart = (item) => {
    // Implement add to cart functionality
    // For example, dispatch an action to add the item to the cart in the Redux store
    alert(`Added ${item.itemName} to cart!`);
  };

  if (itemsStatus === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (itemsStatus === 'failed') {
    return (
      <Typography color="error" variant="h6" align="center" sx={{ mt: 4 }}>
        {itemsError}
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
        Back to Restaurants
      </Button>
      <Typography variant="h5" gutterBottom>
        Items
      </Typography>
      {items.length === 0 ? (
        <Typography variant="body1">No items available for this restaurant.</Typography>
      ) : (
        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.itemName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Chip label={`Price: ₹${item.price}`} color="primary" />
                    <Chip label={`Available: ${item.available ? 'Yes' : 'No'}`} color={item.available ? 'success' : 'error'} sx={{ ml: 1 }} />
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2">
                      Quantity Available: {item.quantityAvailable} {item.quantityUnit}
                    </Typography>
                    <Typography variant="body2">
                      Available Time: {item.availableTime}
                    </Typography>
                    <Typography variant="body2">
                      Max Quantity per Order: {item.maxQuantityPerOrder}
                    </Typography>
                  </Box>
                  {item.additionalCustomizations && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Customizations: {item.additionalCustomizations}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Tooltip title={item.available ? 'Add to Cart' : 'Item Unavailable'}>
                    <span>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCart />}
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.available}
                      >
                        Add to Cart
                      </Button>
                    </span>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default RestaurantItems;