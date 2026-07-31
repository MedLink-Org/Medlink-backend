const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController.js');
const validateStaff = require('../middleware/validateStaff.js')

router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.post('/',validateStaff, staffController.createStaff);
router.put('/:id',validateStaff, staffController.updateStaff);
router.delete('/:id', staffController.deleteStaff);

module.exports = router;