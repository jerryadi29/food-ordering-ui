import axios from "axios";
import {
  restaurantDetails,
  clientRestaurantDetail,
  clientMenuDetail,
} from "./response";  

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9090/food-ordering",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Merchant API
 */
export const postMerchantRestaurantDetails = async (restaurantDetail) => {
  try {
    // Send the FormData directly as the second argument
    const response = await axiosInstance.post(
      "/merchants/addRestaurant",
      restaurantDetail,
      {
        headers: {
          // You don't need to set Content-Type explicitly as Axios will do it for FormData
          "Content-Type": "multipart/form-data",
        },
      }
    ); // Return the response status
    console.log(response);
    return response.data.restaurants[0];
  } catch (error) {
    console.error("Error submitting restaurant details: ", error);
    throw error;
  }
};

export const fetchMerchantRestaurantDetails = async (restaurantId) => {
  const response = await axiosInstance.get("/merchants/restaurants/" + restaurantId);
  return response.data.restaurants
  // return restaurantDetails.restaurants;
};

export const postUpdatedMerchantRestaurantDetails = async (
  restaurantDetails
) => {
  try {
    const response = await axiosInstance.put(
      "/merchants/update/restaurant",
      restaurantDetails,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // return restaurantDetails.restaurants;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Client API
 */

export const getClientCreditDetails = async (customerId) => {
  try {
    const response = await axiosInstance.get(
      `/users/getCredit/${customerId}`
    );
    return response.data.restaurants;
  } catch (error) {
    console.log(error);
  }
};

export const getClientRestaurants = async (cityName) => {
  try {
    const response = await axiosInstance.get(
      `/users/get-restaurant/{cityName}`
    );
    return response.data.restaurants;
    // return clientRestaurantDetail.restaurants;
  } catch (error) {
    console.log(error);
  }
};

export const getClientRestaurantId = async (reastaurantId) => {
  try {
    const response = await axiosInstance.get(
      `/merchants/items/{restaurantId}`
    );
    return response.data.restaurants;
    // return clientMenuDetail.restaurants;
  } catch (error) {
    console.log(error);
  }
};

/**
 *
 * @param {name, email, password} credentail
 */
export const postSignInDetails = async (endpoint, credential) => {
  const response = await axiosInstance.post(
    endpoint,
    credential
  );
  console.log("---apna response---",response);
  return response.data;
};

export const postSignUpDetails = async (endpoint, credential) => {
  const response = await axiosInstance.post(
    endpoint,
    credential
  );
  return response.data;
};
