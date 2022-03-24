const express = require('express');
const {
  createBooking,
  getAllBookings,
  getAllBookingsByLoggedInUser,
  getSingleBooking,
  deleteBooking,
  updateBooking,
} = require('../controllers/bookingcontroller');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin'), getAllBookings)
  .post(authenticateUser, createBooking);

router.route('/users').get(authenticateUser, getAllBookingsByLoggedInUser);

router
  .route('/:id')
  .get(authenticateUser, authorizePermissions('admin'), getSingleBooking)
  .patch(authenticateUser, authorizePermissions('admin'), updateBooking)
  .delete(authenticateUser, authorizePermissions('admin'), deleteBooking);

module.exports = router;
