// src/components/RestaurantCard.js
import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const handleViewItems = () => {
    navigate(`/restaurants/${restaurant.restaurantId}/items`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {restaurant.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {restaurant.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact: {restaurant.contact}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {restaurant.available ? 'Available' : 'Unavailable'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleViewItems} disabled={!restaurant.available}>
          View Items
        </Button>
      </CardActions>
    </Card>
  );
};

export default RestaurantCard;
