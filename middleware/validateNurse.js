const validateNurse = (req, res, next) => {
  const { first_name, last_name, date_of_birth } = req.body;
  const missingFields = [];
  if (!first_name) missingFields.push('first_name');
  if (!last_name) missingFields.push('last_name');
  if (!date_of_birth) missingFields.push('date_of_birth');

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing required field(s): ${missingFields.join(', ')}` });
  }
  next();
};

module.exports = validateNurse;