CREATE SEQUENCE patient_id_seq START 1;
CREATE TABLE patients (
    patient_id TEXT PRIMARY KEY DEFAULT ('P' || LPAD(nextval('patient_id_seq')::TEXT, 3, '0')),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    contact_info TEXT,
    gender TEXT,
    address TEXT
);

-- =========================
-- DOCTOR TABLE
-- =========================
CREATE SEQUENCE doctor_id_seq START 1;
CREATE TABLE doctors (
    doctor_id TEXT PRIMARY KEY DEFAULT ('D' || LPAD(nextval('doctor_id_seq')::TEXT, 3, '0')),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    contact_info TEXT,
    address TEXT,
    specialization TEXT,
    date_of_employment DATE
);

-- =========================
-- NURSE TABLE
-- =========================
CREATE SEQUENCE nurse_id_seq START 1;
CREATE TABLE nurses (
    nurse_id TEXT PRIMARY KEY DEFAULT ('N' || LPAD(nextval('nurse_id_seq')::TEXT, 3, '0')),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    contact_info TEXT,
    address TEXT,
    date_of_employment DATE
);

-- =========================
-- STAFF TABLE
-- =========================
CREATE SEQUENCE staff_id_seq START 1;
CREATE TABLE staff (
    staff_id TEXT PRIMARY KEY DEFAULT ('S' || LPAD(nextval('staff_id_seq')::TEXT, 3, '0')),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    contact_info TEXT,
    address TEXT,
    date_of_employment DATE
);

-- =========================
-- APPOINTMENT TABLE
-- =========================
CREATE SEQUENCE appointment_id_seq START 1;
CREATE TABLE appointments (
    appointment_id TEXT PRIMARY KEY DEFAULT ('A' || LPAD(nextval('appointment_id_seq')::TEXT, 3, '0')),
    patient_id TEXT NOT NULL,
    doctor_id TEXT NOT NULL,
    nurse_id TEXT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (nurse_id) REFERENCES nurses(nurse_id) ON DELETE SET NULL
);

-- =========================
-- MEDICAL RECORD TABLE
-- =========================
CREATE SEQUENCE medical_record_id_seq START 1;
CREATE TABLE medical_records (
    medical_record_id TEXT PRIMARY KEY DEFAULT ('M' || LPAD(nextval('medical_record_id_seq')::TEXT, 3, '0')),
    patient_id TEXT UNIQUE NOT NULL,
    nurse_id TEXT NOT NULL,
    blood_type TEXT,
    genotype TEXT,
    current_medication TEXT,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (nurse_id) REFERENCES nurses(nurse_id) ON DELETE CASCADE
);

-- =========================
-- BILLING TABLE
-- =========================
CREATE SEQUENCE billing_id_seq START 1;
CREATE TABLE billing (
    billing_id TEXT PRIMARY KEY DEFAULT ('B' || LPAD(nextval('billing_id_seq')::TEXT, 3, '0')),
    patient_id TEXT NOT NULL,
    bill_type TEXT,
    mode_of_payment TEXT,
    date_of_issuance DATE,
    date_of_payment DATE,

    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

-- =========================
-- INDEXES (performance boost)
-- =========================
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX idx_medical_records_patient ON medical_records(patient_id);
CREATE INDEX idx_billing_patient ON billing(patient_id);