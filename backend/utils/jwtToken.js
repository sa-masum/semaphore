import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    httpOnly: false, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  };

  res.status(statusCode).cookie("authToken", token, options).json({
    success: true,
    message,
    token,
    user,
  });
};
