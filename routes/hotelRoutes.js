const express = require('express');

const router = express.Router();

const {
  getHotels,
  getHotel,
  createHotel,
} = require('../controllers/hotelController');

router.route('/').get(getHotels).post(createHotel);
router.get('/:slug', getHotel);

module.exports = router;
