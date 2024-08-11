var express = require('express');
var router = express.Router();

const {registerUser, loginUser, logoutUser} = require('../controllers/authController');
const { authLogout } = require('../helpers/auth');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout',logoutUser)
router.get('/authLogout', authLogout)

module.exports = router;