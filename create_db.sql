CREATE TABLE patient (
  patient_id serial PRIMARY KEY,
  email varchar(100),
  password varchar(30),
  name varchar(30),
  age integer,
  gender char(1),
  address varchar(100),
  phone varchar(10)
);

CREATE TABLE admin (
  admin_id serial PRIMARY KEY,
  name varchar(30),
  email varchar(50) NOT NULL,
  password varchar(30) NOT NULL
);

CREATE TABLE doctor (
  doctor_id serial PRIMARY KEY,
  password VARCHAR(30),
  name VARCHAR(30),
  specialization VARCHAR(50),
  phone VARCHAR(10),
  email VARCHAR(50)
);

CREATE TABLE disease (
  disease_id serial PRIMARY KEY,
  name VARCHAR(50),
  dos VARCHAR(250),
  donts VARCHAR(250)
);
CREATE TABLE appointment (
  appointment_id serial PRIMARY KEY,
  patient_id INT,
  doctor_id INT,
  admin_id INT,
  appointment_date DATE,
  appointment_time TIME,
  status INT,
  FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id)
);
CREATE TABLE medical_record (
  medical_record_id serial PRIMARY KEY,
  admin_id INT,
  patient_id INT,
  doctor_id INT,
  disease_id INT,
  service_id INT,
  diagnosis VARCHAR(50),
  prescription VARCHAR(50),
  notes TEXT,
  FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id),
  FOREIGN KEY (disease_id) REFERENCES disease(disease_id),
);