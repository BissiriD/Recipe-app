import jwt from "jsonwebtoken";


const secretKey = "secret"
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Attach the decoded user to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export default verifyToken;
