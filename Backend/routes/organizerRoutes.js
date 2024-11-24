const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");


router.get("/dashboard", authMiddleware, roleMiddleware("organizer"), (req, res) => {
  res.json({
    message: "Bine ai venit pe dashboard-ul organizatorului!",
    user: req.user, 
  });
});

// router.get("/organizer/events", authMiddleware, roleMiddleware("organizer"), (req, res) => {
//   res.json({
//     message: "Lista evenimentelor organizatorului",
//     user: req.user,
//   });
// });

module.exports = router;
