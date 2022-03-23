const express = require('express');
const createInvoice = require('../controllers/invoiceController');
const { authenticateUser } = require('../middleware/full-auth');

const router = express.Router();

router.route('/:id').post(authenticateUser, createInvoice);
module.exports = router;
