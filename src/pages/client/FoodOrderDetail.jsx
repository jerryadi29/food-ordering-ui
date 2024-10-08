import {
  Card,
  CardContent,
  CircularProgress,
  Grid2,
  Typography,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../../features/customer/customerSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FoodOrderDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurantDetails, loading, error } = useSelector(
    (state) => state.client
  );
  const { user } = useSelector((state) => state.auth);

  const handleViewMenu = (restaurantId) => {
    navigate(`/client/orders/${restaurantId}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Grid2 container spacing={4}>
          {restaurantDetails.map((restaurant) => (
            <Grid2 item xs={12} md={4} key={restaurant.restaurantId}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {restaurant.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {restaurant.description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Address:</strong> {restaurant.address}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Contact:</strong> {restaurant.contact}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={restaurant.available ? "green" : "red"}
                  >
                    <strong>Status:</strong>{" "}
                    {restaurant.available ? "Available" : "Unavailable"}
                  </Typography>

                  {/* Action Buttons */}
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewMenu(restaurant.restaurantId)}
                    >
                      View Menu
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};
