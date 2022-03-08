const express = require('express');

const router = express.Router();

const { getHotels, getHotel } = require('../controllers/hotel');

router.get('/hotels', getHotels);
router.get('/hotels/:slug', getHotel);

module.exports = router;
