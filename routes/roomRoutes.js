const express = require('express');

const router = express.Router();

const { createRoom } = require('../controllers/roomController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

router.post(
  '/create',
  authenticateUser,
  authorizePermissions('admin', 'partner'),
  createRoom
);

module.exports = router;
