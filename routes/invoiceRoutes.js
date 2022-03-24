const express = require('express');
const createInvoice = require('../controllers/invoiceController');
const { authenticateUser } = require('../middleware/authentication');

const router = express.Router();

router.route('/:id').post(authenticateUser, createInvoice);
module.exports = router;
