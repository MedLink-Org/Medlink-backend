const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctorController');
const validateDoctor = require('../middleware/validateDoctor')

router.get('/', doctorController.getAllDoctors)
router.get('/:id', doctorController.getDoctorById)
router.post('/', validateDoctor, doctorController.createDoctor)
router.put('/:id', validateDoctor, doctorController.updateDoctor)
router.delete('/:id', doctorController.deleteDoctor)

module.exports = router
