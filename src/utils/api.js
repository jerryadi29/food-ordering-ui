import axios from 'axios';

export const merchantAPI = axios.create({
  baseURL: 'http://localhost:9090/food-ordering/merchants/restaurants/', // Your backend API URL
});

export const postRestaurantDetails = createAsyncThunk(
  "merchant/addRestaurant",
  async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:9090/food-ordering/merchants/addRestaurant",
        formData, // Send FormData as body
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data; // Handle the response accordingly
    } catch (error) {
      console.error("Error adding restaurant:", error);
      throw error;
    }
  }
);