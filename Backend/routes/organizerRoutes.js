const express = require("express");
const router = express.Router(); // creeaza o instanta de router
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { addEvent, getEvents, getEventDetails, getEventsByGroup } = require("../controllers/eventController"); // import fct controller
const { addEventGroup } = require("../controllers/eventGroupController");
const { getGroupEvents } = require("../controllers/eventGroupController");

// importa middleware-urile
// ( auth - verif daca ut e autentificat - are token valid )
// ( role - verif daca ut are rol de ,,organizer,,)

// def o RUTA GET pt /dashboard
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("organizer"),
  (req, res) => {
    // verif autentif, dupa permite accesul doar daca ut are rolul de org
    res.json({
      message: "Bine ai venit pe dashboard-ul organizatorului!",
      user: req.user, // inf ut autentificat
    });
  }
);

//----------
// router.get("/organizer/events", authMiddleware, roleMiddleware("organizer"), (req, res) => {
//   res.json({
//     message: "Lista evenimentelor organizatorului",
//     user: req.user,
//   });
// });
//----------

// Ruta GET pt obt lista even
router.get("/events", authMiddleware, roleMiddleware("ORGANIZATOR"), getEvents);
router.get("/event/:id", getEventDetails);
router.get("/group/:id/events", getEventsByGroup);

// Ruta POST pt ad even
router.post(
  "/events-group/:groupId/add/events",
  authMiddleware,
  roleMiddleware("ORGANIZATOR"),
  addEvent
);

///
router.get(
  "/event-groups",
  authMiddleware,
  roleMiddleware("ORGANIZATOR"),
  getGroupEvents
);
router.post(
  "/add/event-groups",
  authMiddleware,
  roleMiddleware("ORGANIZATOR"),
  addEventGroup
);
module.exports = router;
