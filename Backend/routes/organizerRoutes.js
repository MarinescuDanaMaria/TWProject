const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  addEvent,
  getEventDetails,
  getEventsByGroup,
  showEvent,
  deleteEvent,
  updateEvent,
  getEventDetailsForOrganizer,
  getEventStats
} = require("../controllers/eventController");
const { addEventGroup } = require("../controllers/eventGroupController");
const { getGroupEvents } = require("../controllers/eventGroupController");

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("organizer"),
  (req, res) => {
    res.json({
      message: "Bine ai venit pe dashboard-ul organizatorului!",
      user: req.user,
    });
  }
);
//Events Routes
router.get("/event/:id", getEventDetails);
router.get("/group/:id/events", getEventsByGroup);
router.delete("/event/:id", deleteEvent);
router.put("/event/:id", updateEvent);

router.post(
  "/events-group/:groupId/add/events",
  authMiddleware,
  roleMiddleware("ORGANIZATOR"),
  addEvent
);

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

router.get("/group/:idGroup/event/:idEvent", authMiddleware,  roleMiddleware("ORGANIZATOR"), getEventDetailsForOrganizer);

//participants 
const {
  getParticipantsByEvent,
  exportParticipantsCSV,
  exportParticipantsPDF,
  exportGroupParticipantsCSV
} = require("../controllers/participantController");

router.get("/event/:eventId/participants", authMiddleware,  roleMiddleware("ORGANIZATOR"), getParticipantsByEvent);
router.get("/event/:eventId/participants/csv", authMiddleware, roleMiddleware("ORGANIZATOR"), exportParticipantsCSV);
router.get("/event/:eventId/participants/pdf", authMiddleware, roleMiddleware("ORGANIZATOR"), exportParticipantsPDF);

router.get("/export/group/:groupId/participants/csv", exportGroupParticipantsCSV);

router.get("/event-stats", authMiddleware, roleMiddleware("ORGANIZATOR"), getEventStats);

module.exports = router;
