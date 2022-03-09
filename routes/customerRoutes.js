const express = require('express');

const router = express.Router();

const { createCustomer } = require('../controllers/accounts/createCustomer');

router.route('/').post(createCustomer);

module.exports = router;
