const appointmentModel = require('../models/appointmentModel.js')

const getAllAppointment = async (req, res) => {
  try {
    const result = await appointmentModel.getAllAppointment()
    res.status(200).json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.error('err on getAllAppointment', err)
  }
}

const getAppointmentById = async (req, res) => {
  try {
    const result = await appointmentModel.getAppointmentById(req.param.id);
    if(result.rows.length === 0){
      res.status(404).json({error: 'Appointment not found'})
    }
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({error: err.message})
  }
}

const getAppointmentsByPatientId = async (req, res) => {
  try {
    const result = await appointmentModel.getAppointmentsByPatientId(req.params.patientId);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAppointmentsByDoctorId = async (req, res) => {
  try {
    const result = await appointmentModel.getAppointmentsByDoctorId(req.params.doctorId);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAppointmentsByNurseId = async (req, res) => {
  try {
    const result = await appointmentModel.getAppointmentsByDoctorId(req.params.nurseId);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createAppointment = async (req, res) => {
  try {
    const result = await appointmentModel.createAppointment(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const result = await appointmentModel.updateAppointment(req.params.id, req.body);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const result = await appointmentModel.deleteAppointment(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted', appointment: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAppointment,
  getAppointmentById,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  getAppointmentsByNurseId,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
