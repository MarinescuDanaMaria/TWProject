const express = require("express");
const { getEventGroupsGroupedByUser } = require("../controllers/eventGroupController");

const router = express.Router();
router.get("/event-groups/grouped-by-organizer", getEventGroupsGroupedByUser);
module.exports = router;