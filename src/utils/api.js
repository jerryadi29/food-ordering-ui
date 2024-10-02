import axios from 'axios';

export const merchantAPI = axios.create({
  baseURL: 'http://localhost:9090/food-ordering/merchants/restaurants/', // Your backend API URL
});

export const postRestaurantDetails = async (resturantDetail) =>{
  let response = await axios.post('/addRestaurant',{
    body: resturantDetail,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.status
}