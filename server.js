const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // allows requests from your separate frontend repo/origin
app.use(express.json()); // parses JSON request bodies into req.body

// Routes
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/nurses', require('./routes/nurseRoutes'));
app.use('/api/staff', require('./routes/staffRoutes'));
app.use('/api/medical-records', require('./routes/medicalRecordRoutes'));
app.use('/api/billing', require('./routes/billingRoutes'));

// Basic root route (just to confirm the server is alive)
app.get('/', (req, res) => {
  res.send('Medlink Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));