const express = require('express');

const router = express.Router();

const { createRoom } = require('../../controllers/stays/roomcontroller');

router.post('/', createRoom);

module.exports = router;
