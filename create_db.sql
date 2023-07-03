-- Tạo bảng "Tài khoản người dùng"
CREATE TABLE user_account (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);

-- Tạo bảng "Bác sĩ"
CREATE TABLE doctor (
  doctor_id SERIAL PRIMARY KEY,
  user_id INT,
  name VARCHAR(255),
  specialization VARCHAR(255),
  phone VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

-- Tạo bảng "Bệnh nhân"
CREATE TABLE patient (
  patient_id SERIAL PRIMARY KEY,
  user_id INT,
  name VARCHAR(255),
  age INT,
  gender VARCHAR(255),
  address VARCHAR(255),
  phone VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

-- Tạo bảng "Admin"
CREATE TABLE admin (
  admin_id SERIAL PRIMARY KEY,
  user_id INT,
  name VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

-- Tạo bảng "Lịch hẹn"
CREATE TABLE appointment (
  appointment_id SERIAL PRIMARY KEY,
  patient_id INT,
  doctor_id INT,
  appointment_date DATE,
  appointment_time TIME,
  FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id)
);

-- Tạo bảng "Dịch vụ"
CREATE TABLE service (
  service_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  fee INT
);

-- Tạo bảng "Vai trò"
CREATE TABLE role (
  role_id SERIAL PRIMARY KEY,
  role_name VARCHAR(255)
);

-- Tạo bảng "Bệnh án"
CREATE TABLE medical_record (
  medical_record_id SERIAL PRIMARY KEY,
  patient_id INT,
  doctor_id INT,
  disease_id INT,
  diagnosis VARCHAR(255),
  prescription VARCHAR(255),
  notes VARCHAR(255),
  FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id),
  FOREIGN KEY (disease_id) REFERENCES disease(disease_id)
);

-- Tạo bảng "Role_User"
CREATE TABLE role_user (
  user_id INT,
  role_id INT,
  FOREIGN KEY (user_id) REFERENCES user_account(user_id),
  FOREIGN KEY (role_id) REFERENCES role(role_id)
);
-- Thêm quan hệ một-nhiều giữa bảng "Bác sĩ" và bảng "Lịch hẹn"
ALTER TABLE appointment ADD COLUMN doctor_id INT;
ALTER TABLE appointment ADD FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id);

-- Thêm quan hệ một-nhiều giữa bảng "Bệnh nhân" và bảng "Lịch hẹn"
ALTER TABLE appointment ADD COLUMN patient_id INT;
ALTER TABLE appointment ADD FOREIGN KEY (patient_id) REFERENCES patient(patient_id);

-- Thêm quan hệ một-nhiều giữa bảng "Bệnh án" và bảng "Lịch hẹn"
ALTER TABLE medical_record ADD COLUMN appointment_id INT;
ALTER TABLE medical_record ADD FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id);

-- Thêm quan hệ một-nhiều giữa bảng "Bệnh án" và bảng "Bệnh"
ALTER TABLE medical_record ADD COLUMN disease_id INT;
ALTER TABLE medical_record ADD FOREIGN KEY (disease_id) REFERENCES disease(disease_id);

-- Thêm quan hệ một-nhiều giữa bảng "Bệnh án" và bảng "Dịch vụ"
ALTER TABLE medical_record ADD COLUMN service_id INT;
ALTER TABLE medical_record ADD FOREIGN KEY (service_id) REFERENCES service(service_id);

-- Thêm quan hệ một-nhiều giữa bảng "Tài khoản người dùng" và bảng "Role_User"
ALTER TABLE role_user ADD COLUMN user_id INT;
ALTER TABLE role_user ADD FOREIGN KEY (user_id) REFERENCES user_account(user_id);

-- Thêm quan hệ một-nhiều giữa bảng "Vai trò" và bảng "Role_User"
ALTER TABLE role_user ADD COLUMN role_id INT;
ALTER TABLE role_user ADD FOREIGN KEY (role_id) REFERENCES role(role_id);
