const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get("/dashboard", authMiddleware, roleMiddleware("user"), (req, res) => {
  res.json({
    message: "Bine ai venit pe dashboard-ul utilizatorului!",
    user: req.user,
  });
});

// router.get("/user/profile", authMiddleware, roleMiddleware("user"), (req, res) => {
//   res.json({
//     message: "Profilul utilizatorului",
//     user: req.user,
//   });
// });

// ret inf de profil ale ut 

module.exports = router;
