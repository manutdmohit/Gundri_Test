const express = require('express');

const router = express.Router();

const { createPartner } = require('../controllers/accounts/partnerController');

router.route('/').post(createPartner);

module.exports = router;
