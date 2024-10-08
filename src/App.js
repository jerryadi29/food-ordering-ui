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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavigationBar } from "./components/NavigationBar";
import { Login } from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerDashboard from "./pages/client/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import Unauthorized from "./pages/Unauthorized";
import ItemList from "../src/pages/client/ItemList";

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
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes for Customers */}
          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Route for Restaurant Items */}
        <Route
          path="merchants/items/:restaurantId"
          element={
            <ProtectedRoute requiredRole="customer">
               <ItemList />
            </ProtectedRoute>
          }
        />

          {/* Protected Routes for Merchants */}
          <Route
            path="/merchant-dashboard"
            element={
              <ProtectedRoute requiredRole="merchant">
                <MerchantDashboard />
              </ProtectedRoute>
            }
          />

          {/* Route for Restaurant Items */}
          <Route
            path="/merchants/addRestaurant/:restaurantId"
            element={
              <ProtectedRoute requiredRole="merchant">
                <RestuarantMenuDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/merchants/addRestaurant"
            element={
              <ProtectedRoute requiredRole="merchant">
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
