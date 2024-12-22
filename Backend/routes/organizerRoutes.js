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
} = require("../controllers/eventController");
const { addEventGroup, getEventGroupsGroupedByUser } = require("../controllers/eventGroupController");
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
//router.get("/event/:id", showEvent);
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
router.get(
  "/event-groups/grouped-by-organizer",
  authMiddleware,
  roleMiddleware("ORGANIZATOR"),
  getEventGroupsGroupedByUser
);
router.post(
  "/add/event-groups",
  authMiddleware,
  roleMiddleware("ORGANIZATOR"),
  addEventGroup
);
module.exports = router;
