const pool = require('../config/db');

// GET all
const getAllPatients = () => pool.query('SELECT * FROM patients');

// GET one by id
const getPatientById = (id) =>
  pool.query('SELECT * FROM patients WHERE patient_id = $1', [id]);

// CREATE
const createPatient = (data) => pool.query(
  `INSERT INTO patients (first_name, last_name, date_of_birth, contact_info, gender, address)
   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
  [data.first_name, data.last_name, data.date_of_birth, data.contact_info, data.gender, data.address]
);

// UPDATE
const updatePatient = (id, data) => pool.query(
  `UPDATE patients
   SET first_name = $1, last_name = $2, contact_info = $3
   WHERE patient_id = $4 RETURNING *`,
  [data.first_name, data.last_name, data.contact_info, id]
);

// DELETE
const deletePatient = (id) =>
  pool.query('DELETE FROM patients WHERE patient_id = $1 RETURNING *', [id]);

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};