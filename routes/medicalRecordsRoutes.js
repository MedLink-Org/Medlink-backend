const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/medicalRecordController.js');

router.get('/', medicalRecordController.getAllMedicalRecords);
router.get('/:id', medicalRecordController.getMedicalRecordById);
router.get('/patient/:patientId', medicalRecordController.getMedicalRecordByPatientId);
router.post('/', validateMedicalRecord, medicalRecordController.createMedicalRecord);
router.put('/:id', validateMedicalRecord, medicalRecordController.updateMedicalRecord);
router.delete('/:id', medicalRecordController.deleteMedicalRecord);

module.exports = router;