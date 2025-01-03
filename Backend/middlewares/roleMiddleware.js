const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user?.role; 

    if (userRole.toLowerCase() !== requiredRole.toLowerCase()) {
      console.log("Acces interzis: Rol necorespunzător.");
      return res
        .status(403)
        .json({ message: "Acces interzis. Rol necorespunzător." });
    }

    next(); 
  };
};

module.exports = roleMiddleware;
