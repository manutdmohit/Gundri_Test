const express = require('express');

const router = express.Router();

const {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');

const { authenticateUser, authorizeRoles } = require('../middleware/full-auth');

router.get('/', getAllRooms);

router.post(
  '/create',
  authenticateUser,
  authorizeRoles('admin', 'partner'),
  createRoom
);

router.route('/:id').get(getSingleRoom);

router
  .route('/update/:id')
  .patch(authenticateUser, authorizeRoles('admin', 'partner'), updateRoom);

router
  .route('/delete/:id')
  .delete(authenticateUser, authorizeRoles('admin'), deleteRoom);

module.exports = router;
