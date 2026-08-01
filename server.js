const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express = require('express');
const cors = require('cors');
const authenticate = require('./middleware/authenticate');
require('dotenv').config();

const app = express();
app.use(express.json());
// Middleware
app.use(cors()); // allows requests from your separate frontend repo/origin
app.use(express.json()); // parses JSON request bodies into req.body

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/patients', authenticate, require('./routes/patientRoutes'));
app.use('/api/appointments', authenticate, require('./routes/appointmentRoutes'));
app.use('/api/doctors', authenticate, require('./routes/doctorRoutes'));
app.use('/api/nurses', authenticate, require('./routes/nurseRoutes'));
app.use('/api/staff', authenticate, require('./routes/staffRoutes'));
app.use('/api/medical-records', authenticate, require('./routes/medicalRecordRoutes'));
app.use('/api/billing', authenticate, require('./routes/billingRoutes'));

// Basic root route (just to confirm the server is alive)
app.get('/', (req, res) => {
  res.send('Medlink Backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
