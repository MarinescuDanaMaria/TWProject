const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // obtine token-ul din antetul auth 

  if (!token) { 
    return res.status(401).json({ message: "Token-ul nu a fost furnizat." });
  }

  try {  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    }; 
    req.user = decoded;  
    next();  
  } catch (error) {
    return res.status(401).json({ message: "Token invalid." });
  }
};

module.exports = authMiddleware;
