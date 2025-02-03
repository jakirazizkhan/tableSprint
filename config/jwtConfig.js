const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { serialize } = require("cookie");  

dotenv.config();
dotenv.config();
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
};

const setCookie = (res, token) => {
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookie in production
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

module.exports = { generateToken, verifyToken, setCookie };
