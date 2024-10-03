import axios from 'axios';

export const merchantAPI = axios.create({
  baseURL: 'http://localhost:9090/food-ordering/merchants/restaurants/', // Your backend API URL
});

export const postRestaurantDetails = async (restaurantDetail) => {
  try { // Send the FormData directly as the second argument
    const response = await axios.post("http://localhost:9090/food-ordering/merchants/addRestaurant", restaurantDetail, {
      headers: { // You don't need to set Content-Type explicitly as Axios will do it for FormData 
        "Content-Type": "multipart/form-data",
      },
    }); // Return the response status 
    console.log("-----I am hero-----")
    console.log(response)
    return response.data.restaurants[0];
  }
  catch (error) {
    console.error("Error submitting restaurant details: ", error);
    throw error;
  }
};