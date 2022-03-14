const express = require('express');

const router = express.Router();

const {
  createStay,
  getStays,
  getSingleStay,
  updateStay,
  deleteStay,
} = require('../controllers/stayController');

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

router.get('/', getStays);

router.post(
  '/create',
  authenticateUser,
  authorizePermissions('admin', 'partner'),
  createStay
);

router.get('/:id', getSingleStay);

router
  .route('/:id/update')
  .patch(
    authenticateUser,
    authorizePermissions('admin', 'partner'),
    updateStay
  );

router
  .route('/:id/delete')
  .delete(
    authenticateUser,
    authorizePermissions('admin', 'partner'),
    deleteStay
  );

module.exports = router;
