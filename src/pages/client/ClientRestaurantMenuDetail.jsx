import {
  Card,
  CardContent,
  CardActions,
  Grid2,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { fetchItems } from "../../features/customer/customerMenuDetailSlice";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[4],
  },
}));

export const ClientRestaurantMenuDetail = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { menuDetail } = useSelector((state) => state.client);
  const [qty, setQty] = useState(0)

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchItems(restaurantId));
    }
  }, [dispatch, restaurantId]);

  const handleOrderPlace = (orderID) => {
    navigate(`/client/orderplaced/${orderID}`);
  };



  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Grid2 container spacing={4}>
          {menuDetail.map((item) => (
            <Grid2 item key={item.id} xs={12} sm={6} md={4}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5">{item.itemName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography>Quantity</Typography>
                  {/* <QuantityInput onInputChange={(event, newValue) =>handleChange(event)} min={0} max={99}/> */}
                  <Typography variant="body1" color="text.primary" mt={2}>
                    Price: ₹{item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available Time: {item.availableTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Max Quantity Per Order: {item.maxQuantityPerOrder}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Customizations: {item.additionalCustomizations}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.available ? "Available" : "Unavailable"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!item.available}
                    onclick={() => handleOrderPlace(menuDetail.orderId)}
                  >
                    Add to Order
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};
