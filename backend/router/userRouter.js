import express from "express";

import { userSignup, userLogin, addCustomer, getCustomers, fetchProfile, editProfile, changePassword, getCustomerCount, updateCustomer } from "../controllers/userController.js";

import {
    isAuthenticated,
  } from "../middlewares/auth.js";

  const router = express.Router();

  router.post("/signup", userSignup);
  router.post("/signin", userLogin);
  router.post("/addcustomer", isAuthenticated, addCustomer);
  router.get("/customers", isAuthenticated, getCustomers);
  router.get("/profile", isAuthenticated, fetchProfile);
  router.put("/edit-profile", isAuthenticated, editProfile);
  router.put("/change-password", isAuthenticated, changePassword);
  router.get("/customer-count", getCustomerCount);
  router.put("/customer/:id", isAuthenticated, updateCustomer);

  export default router;