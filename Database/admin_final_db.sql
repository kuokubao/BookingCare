
/*##################ADMIN#############################*/

-- Tạo function để thêm thông tin mới cho bác sĩ
CREATE OR REPLACE FUNCTION insert_doctor_info(
    name VARCHAR(30),
    specialization VARCHAR(50),
    phone VARCHAR(10),
    email VARCHAR(50),
    password VARCHAR(30)
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO doctor (name, specialization, phone, email, password)
    VALUES (name, specialization, phone, email, password);
END;
$$ LANGUAGE plpgsql;

-- Tạo function để xóa hồ sơ bệnh án
CREATE OR REPLACE FUNCTION delete_medical_record(
    medical_record_id INT
)
RETURNS VOID AS $$
BEGIN
    DELETE FROM medical_record
    WHERE medical_record_id = medical_record_id;
END;
$$ LANGUAGE plpgsql;


-- Cập nhật dữ liệu cho  từng bảng ---
--Dùng luôn update set where
-- Function để cập nhật thông tin bệnh nhân theo patient_id và thuộc tính cần cập nhật
CREATE OR REPLACE FUNCTION update_patient_info_by_id(
    p_patient_id INT,
    p_name VARCHAR(30) DEFAULT NULL,
    p_age INTEGER DEFAULT NULL,
    p_gender CHAR(1) DEFAULT NULL,
    p_address VARCHAR(100) DEFAULT NULL,
    p_phone VARCHAR(10) DEFAULT NULL,
    p_email VARCHAR(100) DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE patient
    SET
        name = COALESCE(p_name, name),
        age = COALESCE(p_age, age),
        gender = COALESCE(p_gender, gender),
        address = COALESCE(p_address, address),
        phone = COALESCE(p_phone, phone),
        email = COALESCE(p_email, email)
    WHERE patient_id = p_patient_id;
END;
$$ LANGUAGE plpgsql;

-- Function để cập nhật thông tin bác sĩ theo doctor_id và thuộc tính cần cập nhật
CREATE OR REPLACE FUNCTION update_doctor_info_by_id(
    p_doctor_id INT,
    p_name VARCHAR(30) DEFAULT NULL,
    p_specialization VARCHAR(50) DEFAULT NULL,
    p_phone VARCHAR(10) DEFAULT NULL,
    p_email VARCHAR(50) DEFAULT NULL,
    p_password VARCHAR(30) DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE doctor
    SET
        name = COALESCE(p_name, name),
        specialization = COALESCE(p_specialization, specialization),
        phone = COALESCE(p_phone, phone),
        email = COALESCE(p_email, email),
        password = COALESCE(p_password, password)
    WHERE doctor_id = p_doctor_id;
END;
$$ LANGUAGE plpgsql;

-- Function để cập nhật thông tin hồ sơ bệnh án theo medical_record_id và thuộc tính cần cập nhật
CREATE OR REPLACE FUNCTION update_medical_record_by_id(
    p_medical_record_id INT,
    p_patient_id INT DEFAULT NULL,
    p_doctor_id INT DEFAULT NULL,
    p_disease_id INT DEFAULT NULL,
    p_service_id INT DEFAULT NULL,
    p_diagnosis VARCHAR(50) DEFAULT NULL,
    p_prescription VARCHAR(50) DEFAULT NULL,
    p_notes TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE medical_record
    SET
        patient_id = COALESCE(p_patient_id, patient_id),
        doctor_id = COALESCE(p_doctor_id, doctor_id),
        disease_id = COALESCE(p_disease_id, disease_id),
        service_id = COALESCE(p_service_id, service_id),
        diagnosis = COALESCE(p_diagnosis, diagnosis),
        prescription = COALESCE(p_prescription, prescription),
        notes = COALESCE(p_notes, notes)
    WHERE medical_record_id = p_medical_record_id;
END;
$$ LANGUAGE plpgsql;

-- Cập nhật thông tin bệnh nhân với patient_id = 1 chỉ cập nhật trường name và address
SELECT update_patient_info_by_id(1, 'Pham Van Cuong', NULL, NULL, '789 Xa Dan, Ha Noi', NULL, NULL);

-- Cập nhật thông tin bác sĩ với doctor_id = 1 chỉ cập nhật trường specialization và password
SELECT update_doctor_info_by_id(1, NULL, 'Noi khoa', NULL, NULL, 'newpassword');

-- Cập nhật thông tin hồ sơ bệnh án với medical_record_id = 1 chỉ cập nhật trường diagnosis và prescription
SELECT update_medical_record_by_id(1, NULL, NULL, NULL, NULL, 'Chuan doan', 'Ke don', NULL);
