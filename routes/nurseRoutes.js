const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurseController.js');

router.get('/', nurseController.getAllNurses);
router.get('/:id', nurseController.getNurseById);
router.post('/', validateNurse, nurseController.createNurse);
router.put('/:id', validateNurse, nurseController.updateNurse);
router.delete('/:id', nurseController.deleteNurse);

module.exports = router;