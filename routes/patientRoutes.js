const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patientController.js')

router.get('/', patientController.getAllPatients)
router.get('/:id', patientController.getPatientById)
router.post('/', validatePatient, patientController.createPatient)
router.put('/:id', validatePatient, patientController.updatePatient)
router.delete('/:id', patientController.deletePatient)

module.exports = router
