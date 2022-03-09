const express = require('express');

const router = express.Router();

const { createStay } = require('../../controllers/stays/stayController');

router.post('/', createStay);

module.exports = router;
