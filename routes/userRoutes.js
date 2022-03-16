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
  deleteUser,
} = require('../controllers/userController');

const { authenticateUser, authorizeRoles } = require('../middleware/full-auth');

const router = express.Router();

router.route('/').get(authenticateUser, authorizeRoles('admin'), getAllUsers);

router
  .route('/customers')
  .get(authenticateUser, authorizeRoles('admin'), getAllCustomers);

router
  .route('/guests')
  .get(authenticateUser, authorizeRoles('admin'), getAllGuests);

router
  .route('/partners')
  .get(authenticateUser, authorizeRoles('admin'), getAllPartners);

router.route('/showme').get(authenticateUser, showCurrentLoggedInUser);

router.route('/updateuser/:id').patch(authenticateUser, updateUser);

router.route('/updatepartner/:id').patch(authenticateUser, updatePartner);

router
  .route('/updateuserpassword/:id')
  .patch(authenticateUser, updateUserPassword);

router
  .route('/delete/:id')
  .delete(authenticateUser, authorizeRoles('admin'), deleteUser);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
