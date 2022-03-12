const express = require('express');

const router = express.Router();

const {
  getAllCustomers,
  getAllGuestCustomers,
  getAllPartners,
  getSingleCustomer,
  getSingleGuestCustomer,
  getSinglePartner,
  deleteCustomer,
  deleteGuestCustomer,
  deletePartner,
  updateCustomer,
  updateCustomerPassword,
} = require('../../controllers/users/userController');

const {
  authenticateUser,
  authorizePermissions,
} = require('../../middleware/authentication');

router.route('/customers').get(authenticateUser, getAllCustomers);
router.route('/guests').get(authenticateUser, getAllGuestCustomers);
router.route('/partners').get(authenticateUser, getAllPartners);

router
  .route('/customers/updatecustomerpassword')
  .patch(authenticateUser, updateCustomerPassword);

router
  .route('/customers/:id')
  .get(authenticateUser, getSingleCustomer)
  .delete(authenticateUser, deleteCustomer)
  .patch(authenticateUser, updateCustomer);

router
  .route('/guests/:id')
  .get(authenticateUser, getSingleGuestCustomer)
  .delete(authenticateUser, deleteGuestCustomer);

router
  .route('/partners/:id')
  .get(authenticateUser, getSinglePartner)
  .delete(authenticateUser, deletePartner);

module.exports = router;
