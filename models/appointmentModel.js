const pool = require('../config/db')

// GET ALL
const getAllAppointment = () => pool.query('SELECT * FROM appointments')

// GET one by id
const getAppointmentById = (id) =>
  pool.query('SELECT * FROM appointments WHERE appointment_id = $1', [id])
const getAppointmentByPatientId = (data) =>
  pool.query('SELECT * FROM appointment WHERE patient_id = $1', [data.patient_id])
const getAppointmentByDoctorId = (data) =>
  pool.query('SELECT * FROM appointment WHERE doctor_id = $1', [data.doctor_id])
const getAppointmentByNurseId = (data) =>
  pool.query('SELECT * FROM appointment WHERE nurse_id = $1', [data.nurse_id])

// CREATE
const createAppointment = (data) =>
  pool.query(
    `INSERT INTO appointments (patient_id, doctor_id, nurse_id, appointment_date, appointment_time, purpose, status)
   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      data.patient_id,
      data.doctor_id,
      data.nurse_id,
      data.appointment_date,
      data.appointment_time,
      data.purpose,
      data.status || 'scheduled',
    ],
  )

const updateAppointment = (id, data) =>
  pool.query(
    `UPDATE appointments
   SET appointment_date = $1, appointment_time = $2, patient_id = $3, doctor_id = $4, nurse_id = $5, purpose = $6, status = $7
   WHERE appointment_id = $8 RETURNING *`,
    [
      data.appointment_date,
      data.appointment_time,
      data.patient_id,
      data.doctor_id,
      data.nurse_id,
      data.purpose,
      data.status,
      id,
    ],
  )
// DELETE
const deleteAppointment = (id) =>
  pool.query('DELETE FROM appointments WHERE appointment_id = $1 RETURNING *', [id])

module.exports = {
  getAllAppointment,
  getAppointmentByDoctorId,
  getAppointmentById,
  getAppointmentByNurseId,
  getAppointmentByPatientId,
  createAppointment,
  updateAppointment,
  deleteAppointment,
}
