const medicalRecordModel = require('../models/medicalRecordModel');

const getAllMedicalRecords = async (req, res) => {
  try {
    const result = await medicalRecordModel.getAllMedicalRecords();
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMedicalRecordById = async (req, res) => {
  try {
    const result = await medicalRecordModel.getMedicalRecordById(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Medical record not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMedicalRecordByPatientId = async (req, res) => {
  try {
    const result = await medicalRecordModel.getMedicalRecordByPatientId(req.params.patientId);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No medical record for this patient' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createMedicalRecord = async (req, res) => {
  try {
    const result = await medicalRecordModel.createMedicalRecord(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMedicalRecord = async (req, res) => {
  try {
    const result = await medicalRecordModel.updateMedicalRecord(req.params.id, req.body);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Medical record not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMedicalRecord = async (req, res) => {
  try {
    const result = await medicalRecordModel.deleteMedicalRecord(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Medical record not found' });
    }
    res.status(200).json({ message: 'Medical record deleted', record: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllMedicalRecords,
  getMedicalRecordById,
  getMedicalRecordByPatientId,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
};