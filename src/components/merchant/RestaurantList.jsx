import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRestaurant,
  getRestaurants,
} from "../../features/merchantSlice";
import {
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

// Modal box styling
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const RestaurantList = () => {
  const { id } = useParams(); // Get the merchant id
  const dispatch = useDispatch();
  const { restaurants, loading, error } = useSelector(
    (state) => state.merchants
  );

  // Modal state for "Add Restaurant"
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    contact: "",
  });

  // Fetch restaurants when component mounts
  useEffect(() => {
    if (id) {
      dispatch(getRestaurants(id));
    }
  }, [dispatch, id]);

  // Handle opening/closing the modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Handle form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    const restaurantData = {
      ...formData,
      merchantId: id, // Pass merchantId
    };
    console.log(restaurantData)
    dispatch(addRestaurant(restaurantData));
    handleCloseModal(); // Close the modal after submission
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <>
      <Grid container spacing={6} sx={{ margin: "20px" }} direction="column">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Add Restaurant
          </Button>
        </Grid>

        <Grid item>
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <Grid item xs={12} md={4} key={restaurant.restaurantId}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{restaurant.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {restaurant.description}
                    </Typography>
                    <Typography variant="body2">{restaurant.address}</Typography>
                    <Typography variant="body2">
                      Contact: {restaurant.contact}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        alert(`Redirect to menu of ${restaurant.name}`)
                      }
                    >
                      View Menu
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No restaurants found for this merchant.</Typography>
          )}
        </Grid>

        {/* Modal for Adding Restaurant */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" mb={2}>
              Add Restaurant
            </Typography>
            <FormGroup>
              <TextField
                label="Restaurant Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                margin="normal"
                fullWidth
              />
            </FormGroup>
            <Box mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseModal}
                sx={{ marginRight: 2 }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </>
  );
};
