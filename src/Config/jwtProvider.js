const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");

// Load environment variables from .env file
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "72h" });
  return token;
};

const getUserIdFromToken = async (token) => {
  const decodedToken = jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
