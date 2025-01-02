const express = require("express");
const { getEventGroupsGroupedByUser } = require("../controllers/eventGroupController");
const { getEventDetails, getFilteredEventGroups } = require("../controllers/eventController");

const router = express.Router();
router.get("/event-groups/grouped-by-organizer", getEventGroupsGroupedByUser);
router.get("/event-web/:id", getEventDetails);
module.exports = router;