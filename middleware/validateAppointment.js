const validateAppointment = (res, req, next)=>{
  const {patient_id, doctor_id, appointment_date, appointment_time, status} = req.body;
  const missingFields = [];
  if(!patient_id) missingFields.push('patient_id');
  if (!doctor_id) missingFields.push('doctor_id');
  if(!appointment_date) missingFields.push('appointment_id');
  if (!appointment_time) missingFields.push('appointment_time');

  if (missingFields.length > 0){
    return res.status(400).json({
      error: `Missing required files(s): ${missingFields.join('')}`
    });
  }

  const validStatuses = ['scheduled', 'completed', 'cancelled', 'no-show'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    });
  }

  next();
}

module.exports = validateAppointment;
