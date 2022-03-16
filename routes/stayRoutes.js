const express = require('express');

const router = express.Router();

const {
  createStay,
  getStays,
  getSingleStay,
  updateStay,
  deleteStay,
} = require('../controllers/stayController');

const { authenticateUser, authorizeRoles } = require('../middleware/full-auth');

router.get('/', getStays);

router.post(
  '/create',
  authenticateUser,
  authorizeRoles('admin', 'partner'),
  createStay
);

router.get('/:id', getSingleStay);

router
  .route('/:id/update')
  .patch(authenticateUser, authorizeRoles('admin', 'partner'), updateStay);

router
  .route('/:id/delete')
  .delete(authenticateUser, authorizeRoles('admin', 'partner'), deleteStay);

module.exports = router;
