
const jwt = require("jsonwebtoken");



const SECRET_KEY = "gdfhghjhdrgdfhfgjghjfhdftesx876786";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "72h" });
  return token;
};

const getUserIdFromToken = async (token) => {
  const decodedToken =  jwt.verify(token, SECRET_KEY);
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
