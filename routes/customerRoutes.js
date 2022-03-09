const express = require('express');

const router = express.Router();

const {
  createCustomer,
} = require('../controllers/accounts/customerController');

router.route('/').post(createCustomer);

module.exports = router;
