const pool = require('../config/db');

const getAllDoctors = () => pool.query('SELECT * FROM doctors');

const getDoctorById = (id) =>
  pool.query('SELECT * FROM doctors WHERE doctor_id = $1', [id]);

const createDoctor = (data) => pool.query(
  `INSERT INTO doctors (first_name, last_name, date_of_birth, contact_info, address, specialization, date_of_employment)
   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  [data.first_name, data.last_name, data.date_of_birth, data.contact_info, data.address, data.specialization, data.date_of_employment]
);

const updateDoctor = (id, data) => pool.query(
  `UPDATE doctors
   SET first_name = $1, last_name = $2, date_of_birth = $3, contact_info = $4, address = $5, specialization = $6, date_of_employment = $7
   WHERE doctor_id = $8 RETURNING *`,
  [data.first_name, data.last_name, data.date_of_birth, data.contact_info, data.address, data.specialization, data.date_of_employment, id]
);

const deleteDoctor = (id) =>
  pool.query('DELETE FROM doctors WHERE doctor_id = $1 RETURNING *', [id]);

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};