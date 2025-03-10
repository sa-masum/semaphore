import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js"; 
import { Customer } from "../models/customerSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const userSignup = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
      return next(new ErrorHandler("Please fill out the full form!", 400));
  } 
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`A user with the email '${email}' already exists!`, 400));
    }
  
    const user = await User.create({
        username,
        email,
        password,
    });
    
    res.status(201).json({
      success: true,
      message: "User registered successfully! Please log in to continue.",
    });
});
  
export const userLogin = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // console.log("Received Email:", email);  
    // console.log("Received Password:", password);
  
    if (!email || !password ) {
      return next(new ErrorHandler("Please enter all fields!", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email!", 401));
    }
  
    const isPasswordMatch = await user.comparePassword(password);
  
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid password!", 401));
    }
  
    generateToken(user, "Login successful!", 200, res);
});

export const addCustomer = catchAsyncErrors(async (req, res, next) => {
  // console.log('Received customer data:', req.body);
  const {
    createDate,
    branch,
    area,
    zone,
    name,
    email,
    creditLimit,
    customerCode,
    phone1,
    phone2,
    birthDate,
    website,
    billingAddress,
    deliveryAddress,
    city,
    zipCode,
    country,
    salesPerson,
    customerType,
    remarks,
    openBalanceData,
    contactname,
    contactphone,
    contactmobile,
    contactemail,
    parentAccHead,
  } = req.body;

  if (!name || !email || !customerCode || !phone1) {
    return next(new ErrorHandler("Please fill in the required fields (name, email, customer code, phone1)!", 400));
  }

  const isCustomerExists = await Customer.findOne({ customerCode });
  if (isCustomerExists) {
    return next(new ErrorHandler(`A customer with the customer code '${customerCode}' already exists!`, 400));
  }

  const customer = await Customer.create({
    createDate,
    branch,
    area,
    zone,
    name,
    email,
    creditLimit,
    customerCode,
    phone1,
    phone2,
    birthDate,
    website,
    billingAddress,
    deliveryAddress,
    city,
    zipCode,
    country,
    salesPerson,
    customerType,
    remarks,
    openBalanceData,
    contactname,
    contactphone,
    contactmobile,
    contactemail,
    parentAccHead,
  });

  res.status(201).json({
    success: true,
    message: "Customer added successfully!",
    customer, 
  });
});

export const getCustomers = catchAsyncErrors(async (req, res, next) => {
  try {
    const customers = await Customer.find({})
      .sort({ createdAt: -1 })
      .select([
        'salesPerson',
        'name',
        'customerCode',
        'phone1',
        'billingAddress',
        'zone',
        'area',
        'openBalanceData',
        'customerType',
        'email',
        'phone2',
        'website',
        'deliveryAddress',
        'city',
        'zipCode',
        'country',
        'birthDate',
        'branch',
        'creditLimit',
        'contactname',
        'contactphone',
        'contactmobile',
        'contactemail',
        'parentAccHead',
        'remarks',
        'createdAt'
      ]);

    if (!customers) {
      return next(new ErrorHandler('No customers found', 404));
    }

    res.status(200).json({
      success: true,
      count: customers.length,
      customers
    });
  } catch (error) {
    console.error('Error in getCustomers:', error);
    return next(new ErrorHandler('Error fetching customers', 500));
  }
});

export const getCustomerCount = catchAsyncErrors(async (req, res, next) => {
  try {
    const count = await Customer.countDocuments();
    
    res.status(200).json({
      success: true,
      count: count
    });
  } catch (error) {
    console.error('Error getting customer count:', error);
    return next(new ErrorHandler('Error fetching customer count', 500));
  }
});

export const fetchProfile = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user?._id; 

  if (!userId) {
      return next(new ErrorHandler("User not authenticated!", 401));
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
      return next(new ErrorHandler("User not found!", 404));
  }

  res.status(200).json({
      success: true,
      profile: {
          username: user.username,
          email: user.email
      }
  });
});

export const editProfile = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user?._id;
    const { username, email } = req.body;

    if (!username || !email) {
        return next(new ErrorHandler("Please provide both username and email!", 400));
    }

    try {
        const existingUser = await User.findOne({ 
            email, 
            _id: { $ne: userId } 
        });
        
        if (existingUser) {
            return next(new ErrorHandler("Email already in use!", 400));
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return next(new ErrorHandler("User not found!", 404));
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            profile: {
                username: updatedUser.username,
                email: updatedUser.email
            }
        });
    } catch (error) {
        console.error('Edit profile error:', error);
        return next(new ErrorHandler(error.message || "Error updating profile", 500));
    }
});

export const changePassword = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user?._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return next(new ErrorHandler("Please provide both current and new password!", 400));
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
        return next(new ErrorHandler("User not found!", 404));
    }

    const isPasswordMatch = await user.comparePassword(currentPassword);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Current password is incorrect!", 401));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Password changed successfully!"
    });
});

export const updateCustomer = catchAsyncErrors(async (req, res, next) => {
  const customerId = req.params.id;
  const updateData = req.body;

  const customer = await Customer.findByIdAndUpdate(
    customerId,
    updateData,
    { new: true, runValidators: true }
  );

  if (!customer) {
    return next(new ErrorHandler("Customer not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    customer
  });
});