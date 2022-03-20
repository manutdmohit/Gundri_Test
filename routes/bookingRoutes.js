const express = require('express');
const {
  createBooking,
  getAllBookings,
  getAllBookingsByLoggedInUser,
  getSingleBooking,
  deleteBooking,
  updateBooking,
} = require('../controllers/bookingcontroller');
const { authenticateUser, authorizeRoles } = require('../middleware/full-auth');

const router = express.Router();

router
  .route('/')
  .get(authenticateUser, authorizeRoles('admin'), getAllBookings)
  .post(authenticateUser, createBooking);

router.route('/users').get(authenticateUser, getAllBookingsByLoggedInUser);

router
  .route('/:id')
  .get(authenticateUser, authorizeRoles('admin'), getSingleBooking)
  .patch(authenticateUser, authorizeRoles('admin'), updateBooking)
  .delete(authenticateUser, authorizeRoles('admin'), deleteBooking);

module.exports = router;
