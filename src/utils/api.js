import axios from "axios";
import {
  restaurantDetails,
  clientRestaurantDetail,
  clientMenuDetail,
} from "./response";

/**
 * Merchant API
 */
export const getAllMerchantRestaurants = axios.create({
  baseURL: "http://localhost:9090/food-ordering/merchants/restaurants/", // Your backend API URL
});

export const postMerchantRestaurantDetails = async (restaurantDetail) => {
  try {
    // Send the FormData directly as the second argument
    const response = await axios.post(
      "http://localhost:9090/food-ordering/merchants/addRestaurant",
      restaurantDetail,
      {
        headers: {
          // You don't need to set Content-Type explicitly as Axios will do it for FormData
          "Content-Type": "multipart/form-data",
        },
      }
    ); // Return the response status
    console.log("-----I am hero-----");
    console.log(response);
    return response.data.restaurants[0];
  } catch (error) {
    console.error("Error submitting restaurant details: ", error);
    throw error;
  }
};

export const fetchMerchantRestaurantDetails = async (restaurantId) => {
  // const response = await axios.get("http://localhost:9090/food-ordering/merchants/items/" + restaurantId);
  // return response.data.restaurants
  return restaurantDetails.restaurants;
};

export const postUpdatedMerchantRestaurantDetails = async (
  restaurantDetails
) => {
  try {
    // const response = await axios.put(
    //   "http://localhost:9090/food-ordering/merchants/update/item",
    //   restaurantDetails,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    return restaurantDetails.restaurants;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Client API
 */
export const getClientRestaurants = async (cityName) => {
  try {
    // const response = await axios.get(
    //   `http://localhost:9090/food-ordering/users/get-restaurant/${cityName}`
    // );
    // return response.data.restaurants;
    return clientRestaurantDetail.restaurants;
  } catch (error) {
    console.log(error);
  }
};

export const getClientRestaurantId = async (reastaurantId) => {
  try {
    // const response = await axios.get(
    //   `http://localhost:9090/food-ordering/users/get-restaurant/${cityName}`
    // );
    // return response.data.restaurants;
    return clientMenuDetail.restaurants;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {name, email, password} credentail
 */
export const postUserLoginDetails = async (credentail) => {
  // const response = await axios.post(
  //   "http://localhost:9090/auth/login",
  //   credentials
  // );
  // return response.data;
};

export const postSignInDetails = async (credentials) => {
  // const response = await axios.post(
  //   "http://localhost:9090/auth/signup",
  //   credentials
  // );
  // return response.data;
};

export const getUserDetails = async (Endpoint) => {
  try {
    // const response = await axios.get(Endpoint); // Endpoint to get current user
    // return response.data;
  } catch (error) {
    console.log(error);
  }
};
