const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController.js');

router.get('/', billingController.getAllBilling);
router.get('/:id', billingController.getBillingById);
router.get('/patient/:patientId', billingController.getBillingByPatientId);
router.post('/', validateBilling, billingController.createBilling);
router.put('/:id', validateBilling, billingController.updateBilling);
router.delete('/:id', billingController.deleteBilling);

module.exports = router;