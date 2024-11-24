const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token-ul nu a fost furnizat." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Token invalid." });
  }
};

module.exports = authMiddleware;