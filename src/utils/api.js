import axios from 'axios';

export const merchantAPI = axios.create({
  baseURL: 'http://localhost:9090/food-ordering/merchants/restaurants/', // Your backend API URL
});
