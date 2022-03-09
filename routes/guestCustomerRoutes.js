const express = require('express');

const router = express.Router();

const {
  createGuestCustomer,
} = require('../controllers/accounts/guestcustomerController');

router.route('/').post(createGuestCustomer);

module.exports = router;
