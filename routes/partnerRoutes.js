const express = require('express');

const router = express.Router();

const { createPartner } = require('../controllers/accounts/createPartner');

router.route('/').post(createPartner);

module.exports = router;
