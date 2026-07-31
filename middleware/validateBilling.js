const validateBilling = (req, res, next) => {
  const { patient_id } = req.body;
  if (!patient_id) {
    return res.status(400).json({ error: 'Missing required field: patient_id' });
  }
  next();
};

module.exports = validateBilling;