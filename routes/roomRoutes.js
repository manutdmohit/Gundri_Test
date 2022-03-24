const express = require('express');

const router = express.Router();

const {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

router.get('/', getAllRooms);

router.post(
  '/create',
  authenticateUser,
  authorizePermissions('admin', 'partner'),
  createRoom
);

router.route('/:id').get(getSingleRoom);

router
  .route('/update/:id')
  .patch(
    authenticateUser,
    authorizePermissions('admin', 'partner'),
    updateRoom
  );

router
  .route('/delete/:id')
  .delete(authenticateUser, authorizePermissions('admin'), deleteRoom);

module.exports = router;
