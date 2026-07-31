const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');
const validateAppointment = require('../middleware/validateAppointment.js')

router.get('/', appointmentController.getAllAppointment);
router.get('/:id', appointmentController.getAppointmentById);
router.get('/patient/:patientId', appointmentController.getAppointmentsByPatientId);
router.get('/doctor/:doctorId', appointmentController.getAppointmentsByDoctorId);
router.get('/nurse/:nurseId', appointmentController.getAppointmentsByNurseId);
router.post('/', validateAppointment, appointmentController.createAppointment);
router.put('/:id', validateAppointment, appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;