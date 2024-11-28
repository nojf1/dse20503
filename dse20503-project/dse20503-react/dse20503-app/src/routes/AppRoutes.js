import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import CarsPage from "../pages/CarsPage"; 
import SellCarPage from "../pages/SellCarPage";
import BuyCarPage from "../pages/BuyCarPage";
import UserProfilePage from "../pages/UserProfilePage";
import AdminPage from "../pages/AdminPage";
import AdminCarPage from "../pages/AdminCarPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cars" element={<CarsPage />} /> 
      <Route path="/sellcar" element={<SellCarPage />} />
      <Route path="/buycar/:id" element={<BuyCarPage />} />
      <Route path="/userprofile/:id" element={<UserProfilePage />} />
      <Route path="/adminusers" element={<AdminPage />} />
      <Route path="/admincars" element={<AdminCarPage />} />

      {/* Fallback Route */}
      <Route path="*" element={<div>404 Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;