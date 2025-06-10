import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import CropGuide from './pages/CropGuide';
import Weather from './pages/Weather';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerDashboard from './pages/SellerDashboard';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function App() {
  // For debugging purposes, log if we have a token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token found in localStorage');
    } else {
      console.log('No token found in localStorage');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Protected routes based on user type */}
        <Route 
          path="/marketplace" 
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/marketplace/product/:id" 
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/seller-dashboard" 
          element={
            <ProtectedRoute requiredUserType="seller">
              <SellerDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/marketplace/seller/add-product" 
          element={
            <ProtectedRoute requiredUserType="seller">
              <AddProduct />
            </ProtectedRoute>
          } 
        />
        
        {/* Public routes */}
        <Route path="/crop-recommendation" element={<CropGuide />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
