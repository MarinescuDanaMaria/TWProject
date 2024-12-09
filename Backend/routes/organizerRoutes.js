const express = require("express");
const router = express.Router();  // creeaza o instanta de router
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { addEvent, getEvents } = require("../controllers/eventController"); // import fct controller
const {addEventGroup}=require("../controllers/eventGroupController");
const { getEventGroupList } = require("../controllers/eventGroupController");

// importa middleware-urile 
// ( auth - verif daca ut e autentificat - are token valid )
// ( role - verif daca ut are rol de ,,organizer,,)

// def o RUTA GET pt /dashboard 
router.get("/dashboard", authMiddleware, roleMiddleware("organizer"), (req, res) => { // verif autentif, dupa permite accesul doar daca ut are rolul de org 
  res.json({
    message: "Bine ai venit pe dashboard-ul organizatorului!",
    user: req.user, // inf ut autentificat 
  });
});


//----------
// router.get("/organizer/events", authMiddleware, roleMiddleware("organizer"), (req, res) => {
//   res.json({
//     message: "Lista evenimentelor organizatorului",
//     user: req.user,
//   });
// });
//----------

// Ruta GET pt obt lista even
router.get("/get/events/:groupId", authMiddleware, roleMiddleware("ORGANIZATOR"), getEvents);

// Ruta POST pt ad even
router.post("/add/events", authMiddleware, roleMiddleware("ORGANIZATOR"), addEvent);


///

router.post("/add/event-groups", authMiddleware, roleMiddleware("ORGANIZATOR"), addEventGroup);

router.get("/get/event-groups",authMiddleware,roleMiddleware("ORGANIZATOR"),getEventGroupList);

module.exports = router;
