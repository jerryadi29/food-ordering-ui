// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RestaurantList } from "../src/components/merchant/RestaurantList"; // Import the ProductList page
import { RestuarantDetail } from '../src/pages/RestuarantDetail'
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Auth />} />
        <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} /> */}
        <Route path="/merchants/restaurants/:id" element={<RestaurantList />} />
        <Route path="/merchants/items/:restaurantId" element={<RestuarantDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
