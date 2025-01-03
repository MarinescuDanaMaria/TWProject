const express = require('express'); 
const router = express.Router(); 
const { signIn, logIn } = require('../controllers/authController');  


router.post('/sign-in', signIn); 
router.post('/login', logIn); 

module.exports = router; 


