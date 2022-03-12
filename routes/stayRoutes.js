const express = require('express');

const router = express.Router();

const { createStay, getHotels } = require('../controllers/stayController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

router.post(
  '/create',
  authenticateUser,
  authorizePermissions('admin'),
  createStay
);

router.get('/', getHotels);

module.exports = router;
