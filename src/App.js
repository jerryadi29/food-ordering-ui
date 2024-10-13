// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AddRestaurantDetail } from "../src/pages/merchant/AddRestaurantDetail"; // Import the ProductList page
import { RestuarantMenuDetail } from "../src/pages/merchant/RestuarantMenuDetail";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavigationBar } from "./components/NavigationBar";
import { Login } from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerDashboard from "./pages/client/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import Unauthorized from "./pages/Unauthorized";
import ItemList from "../src/pages/client/ItemList";
import { useDispatch } from "react-redux";
import { setUser } from "../src/features/authSlice";
import Cart from "./pages/client/Cart";
import { OrderStatus } from "./pages/client/OrderStatus";

const theme = createTheme({
  typography: {
    fontSize: "2.8rem",
    fontFamily: "Georgia",
  },
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes for Customers */}
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute requiredRole="customer">
                  <NavigationBar />
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Route for Restaurant Items */}
          <Route
            path="/customer/items/:restaurantId"
            element={
              <ProtectedRoute requiredRole="customer">
                  <NavigationBar />
                <ItemList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute requiredRole="customer">
                  <NavigationBar />
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route path ='/customer/items/:restaurantId/order-status/:orderId' element={
            <ProtectedRoute requiredRole="customer">
              <NavigationBar/>
              <OrderStatus/>
            </ProtectedRoute>
          }/>

          {/* Protected Routes for Merchants */}
          <Route
            path="/merchant-dashboard"
            element={
              <ProtectedRoute requiredRole="merchant">
                  <NavigationBar />
                <MerchantDashboard />
              </ProtectedRoute>
            }
          />

          {/* Route for Restaurant Items */}
          <Route
            path="/merchants/addRestaurant/:restaurantId"
            element={
              <ProtectedRoute requiredRole="merchant">
                  <NavigationBar />
                <RestuarantMenuDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/merchants/addRestaurant"
            element={
              <ProtectedRoute requiredRole="merchant">
                  <NavigationBar />
                <AddRestaurantDetail />
              </ProtectedRoute>
            }
          />

          {/* Unauthorized Access */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;