import { Button, Card, CardContent, Grid2, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

export const ClientDashboard = () => {
  const { credit } = useSelector((state) => state.client);
  return (
    <>
      <Box container>
        <Typography variant="h4">Welcome User</Typography>

        <Card>
          <CardContent>
            <Typography component="div">Your credit</Typography>
            <Typography>{credit} credits </Typography>
          </CardContent>
        </Card>

        <Grid2 container spacing={4}>
        <Grid2 item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Available Restaurants</Typography>
              <Typography variant="body2" color="text.secondary">
                Browse through a list of available restaurants in your city.
              </Typography>
              <Button>Order Food</Button>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Your Orders</Typography>
              <Typography variant="body2" color="text.secondary">
                View your past and current orders.
              </Typography>
              {/* You can add a button or link to navigate to order history */}
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
      </Box>
    </>
  );
};
