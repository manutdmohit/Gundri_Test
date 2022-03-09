const express = require('express');

const router = express.Router();

const { createAdmin } = require('../controllers/accounts/createAdmin');

router.post('/', createAdmin);

module.exports = router;
