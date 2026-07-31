const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');

router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.get('/patient/:patientId', appointmentController.getAppointmentsByPatientId);
router.get('/doctor/:doctorId', appointmentController.getAppointmentsByDoctorId);
router.get('/nurse/:nurseId', appointmentController.getAppointmentsByNurseId);
router.post('/', validateAppointment, appointmentController.createAppointment);
router.put('/:id', validateAppointment, appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;