// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AddRestaurantDetail } from "../src/pages/merchant/AddRestaurantDetail"; // Import the ProductList page
import { RestuarantMenuDetail } from "../src/pages/merchant/RestuarantMenuDetail";
import {  ClientRestaurantMenuDetail  } from "../src/pages/client/ClientRestaurantMenuDetail";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavigationBar } from "./components/NavigationBar";
import { ClientDashboard } from "./pages/client/ClientDashboard";
import { FoodOrderDetail } from "./pages/client/FoodOrderDetail";
import { useSelector } from "react-redux";

const theme = createTheme({
  typography: {
    fontSize: "2.8rem",
    fontFamily: "Georgia",
  },
});

function App() {
  // const {user} = useSelector((state) => state.auth)
  const user = { userType: "client" };
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavigationBar />

        <Routes>
          <Route
            path="/client/dashboard"
            element={
              user && user.userType === "client" ? (
                <ClientDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/client/orders"
            element={
              user && user.userType === "client" ? (
                <FoodOrderDetail />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
           <Route
            path="client/orders/:id"
            element={<ClientRestaurantMenuDetail />}
          />
          {/* <Route
          path ='/client/orderplaced/:id'
          element={<OrderPlace/>}/> */}


          <Route
            path="/merchants/restaurants/:id"
            element={<AddRestaurantDetail />}
          />
          <Route
            path="/merchants/items/:restaurantId"
            element={<RestuarantMenuDetail />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
