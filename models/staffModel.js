const pool = require('../config/db');

const getAllStaff = () => pool.query('SELECT * FROM staff');

const getStaffById = (id) =>
  pool.query('SELECT * FROM staff WHERE staff_id = $1', [id]);

const createStaff = (data) => pool.query(
  `INSERT INTO staff (first_name, last_name, date_of_birth, contact_info, address, date_of_employment)
   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
  [data.first_name, data.last_name, data.date_of_birth, data.contact_info, data.address, data.date_of_employment]
);

const updateStaff = (id, data) => pool.query(
  `UPDATE staff
   SET first_name = $1, last_name = $2, date_of_birth = $3, contact_info = $4, address = $5, date_of_employment = $6
   WHERE staff_id = $7 RETURNING *`,
  [data.first_name, data.last_name, data.date_of_birth, data.contact_info, data.address, data.date_of_employment, id]
);

const deleteStaff = (id) =>
  pool.query('DELETE FROM staff WHERE staff_id = $1 RETURNING *', [id]);

module.exports = {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};