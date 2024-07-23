const jwtProvider = require('../Config/jwtProvider');
const UserService = require("../Service/User.service");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ error: "Token not found" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({ error: "Token not found" });
    }

    let userId;
    try {
      // Attempt to get user ID from token
      userId = await jwtProvider.getUserIdFromToken(token);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // Handle token expiration specifically
        return res.status(401).send({ error: 'Token expired' });
      }
      // Handle any other errors that may occur during token verification
      return res.status(401).send({ error: 'Invalid token' });
    }

    try {
      // Find the user by the decoded userId
      const user = await UserService.findUserById(userId);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      req.user = user;
      next();
    } catch (userError) {
      // Handle any errors that may occur while fetching the user
      return res.status(500).send({ error: 'Error fetching user' });
    }
  } catch (error) {
    // Catch any other unexpected errors
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { authenticate };
