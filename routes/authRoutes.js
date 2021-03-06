const express = require('express');
const router = express.Router();

const {
  register,
  login,
  loginPartner,
  logout,
  registerGuest,
  registerPartner,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/register/guest', registerGuest);
router.post('/register/partner', registerPartner);
router.post('/login', login);
router.post('/login/partner', loginPartner);
router.get('/logout', logout);

module.exports = router;
