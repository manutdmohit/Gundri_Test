const express = require('express');

const router = express.Router();

const {
  createAdmin,
  loginAdmin,
  logoutAdmin,
} = require('../controllers/accounts/adminController');

router.post('/register', createAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);

module.exports = router;
