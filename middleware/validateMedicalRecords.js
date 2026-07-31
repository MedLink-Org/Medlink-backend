const validateMedicalRecord = (req, res, next) => {
  const { patient_id, nurse_id } = req.body;
  const missingFields = [];
  if (!patient_id) missingFields.push('patient_id');
  if (!nurse_id) missingFields.push('nurse_id');

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required field(s): ${missingFields.join(', ')}` });
  }
  next();
};

module.exports = validateMedicalRecord;