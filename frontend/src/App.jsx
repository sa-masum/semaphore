import { useState, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Profile from './components/Profile';
import AddCustomer from './pages/AddCustomer';
import CustomerList from './pages/CustomerList';
import About from './pages/About';

function App() {
  const { user, setUser } = useContext(Context);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/about" element={<About />} />
        {/* 
        <Route path="/services" element={<Services />} />
         */}
      </Routes>
    </Router>
  );
}

export default App;