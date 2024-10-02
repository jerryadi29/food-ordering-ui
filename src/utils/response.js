export const restaurantListData = {
  message: "Retrieved 3 restaurants.",
  restaurants: [
    {
      restaurantId: 11,
      name: "The Gourmet Spot",
      description: "A fine dining restaurant with exquisite cuisine.",
      address: "123 Main Street, Cityville",
      contact: "123-456-7890",
      merchantId: 10,
      available: true,
    },
    {
      restaurantId: 12,
      name: "Pizza Palace",
      description: "Best pizza in town with freshly baked ingredients.",
      address: "456 Elm Street, Townsville",
      contact: "987-654-3210",
      merchantId: 10,
      available: true,
    },
    {
      restaurantId: 14,
      name: "Sushi World",
      description: "Fresh sushi with an authentic experience.",
      address: "101 Maple Drive, Suburbia",
      contact: "333-444-5555",
      merchantId: 10,
      available: true,
    },
  ],
};

export const restaurantDetails = {
  "message": "Retrieved 5 items.",
  "restaurants": [
      {
          "id": 16,
          "restaurantId": 10,
          "itemName": "Rosgolla",
          "description": "Iconic Bengali sweet made of soft, spongy cheese balls soaked in syrup",
          "quantityAvailable": 5,
          "quantityUnit": "plate",
          "price": "100",
          "additionalCustomizations": "Sugar-free option",
          "availableTime": "12:00 PM - 10:00 PM",
          "maxQuantityPerOrder": 69,
          "available": false
      },
      {
          "id": 17,
          "restaurantId": 10,
          "itemName": "Mishti Dahi",
          "description": "Sweetened yogurt, a classic Bengali dessert",
          "quantityAvailable": 1,
          "quantityUnit": "bowl",
          "price": "60",
          "additionalCustomizations": "No sugar option",
          "availableTime": "12:00 PM - 10:00 PM",
          "maxQuantityPerOrder": 69,
          "available": true
      },
      {
          "id": 18,
          "restaurantId": 10,
          "itemName": "Kosha Mangsho",
          "description": "Slow-cooked spicy mutton curry with rich gravy",
          "quantityAvailable": 1,
          "quantityUnit": "plates",
          "price": "450",
          "additionalCustomizations": "Extra spicy, boneless",
          "availableTime": "12:00 PM - 3:00 PM",
          "maxQuantityPerOrder": 2,
          "available": true
      },
      {
          "id": 19,
          "restaurantId": 10,
          "itemName": "Patishapta",
          "description": "Bengali-style thin crepes stuffed with coconut and jaggery",
          "quantityAvailable": 1,
          "quantityUnit": "bowl",
          "price": "50\t",
          "additionalCustomizations": "Extra stuffing\t",
          "availableTime": "12:00 PM - 8:00 PM",
          "maxQuantityPerOrder": 5,
          "available": true
      },
      {
          "id": 20,
          "restaurantId": 10,
          "itemName": "Luchi-Alur Dom",
          "description": "Fried flatbreads (luchi) served with spiced potato curry (alur dom)",
          "quantityAvailable": 1,
          "quantityUnit": "plates",
          "price": "120\t",
          "additionalCustomizations": "Extra curry, less oily",
          "availableTime": "8:00 AM - 11:00 AM",
          "maxQuantityPerOrder": 4,
          "available": true
      }
  ]
}