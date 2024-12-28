const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { addParticipant, isParticipant, confirmParticipant} = require("../controllers/participantController");
const { getUnconfirmedEvents } = require("../controllers/eventController");

router.get("/dashboard", authMiddleware, roleMiddleware("user"), (req, res) => {
  res.json({
    message: "Bine ai venit pe dashboard-ul utilizatorului!",
    user: req.user,
  });
});
// Ruta pentru adăugarea utilizatorului la eveniment
router.post("/join-event/:eventId", authMiddleware,roleMiddleware("user"), addParticipant);

// Rută pentru verificarea participării
router.get("/is-participant/:eventId", authMiddleware, isParticipant);

// Route for confirming participation
router.post("/confirm-participation/:eventId", authMiddleware, confirmParticipant);

// Ruta pentru obținerea evenimentelor neconfirmate
router.get("/unconfirmed-events", authMiddleware, roleMiddleware("user"), getUnconfirmedEvents);

// router.get("/user/profile", authMiddleware, roleMiddleware("user"), (req, res) => {
//   res.json({
//     message: "Profilul utilizatorului",
//     user: req.user,
//   });
// });

// ret inf de profil ale ut 

module.exports = router;
