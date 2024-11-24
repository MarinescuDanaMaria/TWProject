const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Acces interzis. Rol necorespunzător." });
    }

    next();
  };
};

module.exports = roleMiddleware;
