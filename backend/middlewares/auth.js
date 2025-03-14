import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies?.userToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Not authenticated!", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found!", 404));
    }

    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid token!", 401));
  }
});