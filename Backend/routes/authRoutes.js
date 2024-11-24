const express = require('express');
const router = express.Router();
const { signIn, logIn } = require('../controllers/authController');  // Importă corect funcțiile

router.post('/sign-in', signIn);
router.post('/login', logIn);

module.exports = router;

// router.get("/profile", authMiddleware, (req, res) => {
//   res.status(200).json({
//     message: "Acces la profilul utilizatorului",
//     user: req.user, // Datele utilizatorului decodificate din token
//   });
// });

