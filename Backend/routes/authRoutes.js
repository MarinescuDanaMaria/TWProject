const express = require('express'); // modul necesar pt creare router 
const router = express.Router(); // creeaza o inst de router pt a def rute 
const { signIn, logIn } = require('../controllers/authController');  // Importă corect funcțiile
// importa functiile signIn, logIn din authController.js 
// aceste fct vor fi apelate at cand rutele sunt accesate 

router.post('/sign-in', signIn); // def o RUTA POST pt sign-in , cand ruta e accesata, fct signIn din controller e apelata 
router.post('/login', logIn); // ruta POST pt login

module.exports = router; // exporta routerul


