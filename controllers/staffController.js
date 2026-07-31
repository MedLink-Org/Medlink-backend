const staffModel = require('../models/staffModel');

const getAllStaff = async (req, res) => {
  try {
    const result = await staffModel.getAllStaff();
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStaffById = async (req, res) => {
  try {
    const result = await staffModel.getStaffById(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createStaff = async (req, res) => {
  try {
    const result = await staffModel.createStaff(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const result = await staffModel.updateStaff(req.params.id, req.body);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const result = await staffModel.deleteStaff(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Staff not found' });
    }
    res.status(200).json({ message: 'Staff deleted', staff: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};