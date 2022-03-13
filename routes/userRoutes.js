const express = require('express');

const {
  getAllUsers,
  getAllCustomers,
  getAllGuests,
  getAllPartners,
  getSingleUser,
  showCurrentLoggedInUser,
  updateUser,
  updateUserPassword,
  updatePartner,
} = require('../controllers/userController');

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const router = express.Router();

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin'), getAllUsers);

router
  .route('/customers')
  .get(authenticateUser, authorizePermissions('admin'), getAllCustomers);

router
  .route('/guests')
  .get(authenticateUser, authorizePermissions('admin'), getAllGuests);

router
  .route('/partners')
  .get(authenticateUser, authorizePermissions('admin'), getAllPartners);

router.route('/showme').get(authenticateUser, showCurrentLoggedInUser);

router.route('/updateuserpassword').patch(authenticateUser, updateUserPassword);

router.route('/updateuser/:id').patch(authenticateUser, updateUser);

router.route('/updatepartner/:id').patch(authenticateUser, updatePartner);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
