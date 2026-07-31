const pool = require('../config/db');

const getAllBilling = () => pool.query('SELECT * FROM billing');

const getBillingById = (id) =>
  pool.query('SELECT * FROM billing WHERE billing_id = $1', [id]);

const getBillingByPatientId = (patientId) =>
  pool.query('SELECT * FROM billing WHERE patient_id = $1', [patientId]);

const createBilling = (data) => pool.query(
  `INSERT INTO billing (patient_id, bill_type, mode_of_payment, date_of_issuance, date_of_payment)
   VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  [data.patient_id, data.bill_type, data.mode_of_payment, data.date_of_issuance, data.date_of_payment]
);

const updateBilling = (id, data) => pool.query(
  `UPDATE billing
   SET bill_type = $1, mode_of_payment = $2, date_of_issuance = $3, date_of_payment = $4
   WHERE billing_id = $5 RETURNING *`,
  [data.bill_type, data.mode_of_payment, data.date_of_issuance, data.date_of_payment, id]
);

const deleteBilling = (id) =>
  pool.query('DELETE FROM billing WHERE billing_id = $1 RETURNING *', [id]);

module.exports = {
  getAllBilling,
  getBillingById,
  getBillingByPatientId,
  createBilling,
  updateBilling,
  deleteBilling,
};