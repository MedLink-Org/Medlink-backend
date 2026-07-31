const pool = require('../config/db');

const getAllMedicalRecords = () => pool.query('SELECT * FROM medical_records');

const getMedicalRecordById = (id) =>
  pool.query('SELECT * FROM medical_records WHERE medical_record_id = $1', [id]);

// UNIQUE NOT NULL on patient_id means one record per patient — useful lookup
const getMedicalRecordByPatientId = (patientId) =>
  pool.query('SELECT * FROM medical_records WHERE patient_id = $1', [patientId]);

const createMedicalRecord = (data) => pool.query(
  `INSERT INTO medical_records (patient_id, nurse_id, blood_type, genotype, current_medication)
   VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  [data.patient_id, data.nurse_id, data.blood_type, data.genotype, data.current_medication]
);

const updateMedicalRecord = (id, data) => pool.query(
  `UPDATE medical_records
   SET nurse_id = $1, blood_type = $2, genotype = $3, current_medication = $4
   WHERE medical_record_id = $5 RETURNING *`,
  [data.nurse_id, data.blood_type, data.genotype, data.current_medication, id]
);

const deleteMedicalRecord = (id) =>
  pool.query('DELETE FROM medical_records WHERE medical_record_id = $1 RETURNING *', [id]);

module.exports = {
  getAllMedicalRecords,
  getMedicalRecordById,
  getMedicalRecordByPatientId,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
};