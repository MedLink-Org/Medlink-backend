const patientModel = require('./models/patientModel')
patientModel.getAllPatients()
.then(res => console.log(res.rows))
.catch(err => console.error('DB error', err))