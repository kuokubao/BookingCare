CREATE TABLE patient (
  patient_id serial PRIMARY KEY,
  email varchar(100) UNIQUE,
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
  email varchar(50) UNIQUE,
  password varchar(30) NOT NULL
);

CREATE TABLE doctor (
  doctor_id serial PRIMARY KEY,
  password VARCHAR(30),
  name VARCHAR(30),
  specialization_id INT,
  phone VARCHAR(10),
  email VARCHAR(50) UNIQUE
);
-- Xóa cột specialization từ bảng doctor
ALTER TABLE doctor
DROP COLUMN specialization;

-- Thêm cột specialization_id vào bảng doctor
ALTER TABLE doctor
ADD COLUMN specialization_id INT;

-- Thêm ràng buộc khóa ngoại tới bảng specialization
ALTER TABLE doctor
ADD CONSTRAINT fk_doctor_specialization
    FOREIGN KEY (specialization_id)
    REFERENCES specialization(specialization_id);


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
  appointment_date DATE,
  appointment_time TIME,
  status INT,
  FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id),
);
ALTER TABLE appointment
ADD COLUMN service_name VARCHAR(255);

UPDATE appointment
SET service_name = CASE appointment_id
    WHEN 1 THEN 'Kham mui hong'
    WHEN 2 THEN 'Cham soc thai phu'
    WHEN 3 THEN 'Dieu tri rang ham mat'
    WHEN 4 THEN 'Phau thuat ngoai khoa'
    WHEN 5 THEN 'Kham noi tiet'
    WHEN 6 THEN 'Phau thuat mat'
    WHEN 7 THEN 'Kham benh da lieu'
    WHEN 8 THEN 'Kham rang ham mat'
    WHEN 9 THEN 'Chup X-quang'
    WHEN 10 THEN 'Kham mat'
    ELSE service_name
END;


CREATE TABLE medical_record (
  medical_record_id serial PRIMARY KEY,
  patient_id INT,
  doctor_id INT,
  disease_id INT,
  diagnosis VARCHAR(50),
  prescription VARCHAR(50),
  notes VARCHAR(255),
  FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
  FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id),
  FOREIGN KEY (disease_id) REFERENCES disease(disease_id) ON DELETE SET NULL

);
CREATE TABLE service (
  service_id serial PRIMARY KEY,
  name VARCHAR(50) UNIQUE,
  specialization_id INT,
  description VARCHAR(100),
  fee INT,
  FOREIGN KEY (specialization_id) REFERENCES specialization(specialization_id)
);
CREATE TABLE specialization (
  specialization_id serial PRIMARY KEY,
  name VARCHAR(50) UNIQUE
);
-- Thêm dữ liệu vào bảng "Bác sĩ"
INSERT INTO doctor (name, specialization, phone, email, password)
VALUES 
  ('Nguyen Thi Lan', 'Noi khoa', '0918234760', 'nguyenthilan@doctor.com', 'password1'),
  ('Tran Van Hoang', 'Ngoai khoa', '0724583916', 'tranvanhoang@doctor.com', 'password2'),
  ('Hoang Bao Anh', 'San phu khoa', '0938501274', 'hoangbaoanh@doctor.com', 'password3'),
  ('Vu Minh Tuan', 'Rang ham mat', '0289173654', 'vuminhtuan@doctor.com', 'password4'),
  ('Dang Thi Huong', 'Mat', '0902837465', 'dangthihuong@doctor.com', 'password5'),
  ('Bui Trung Duc', 'Tai mui hong', '0718392546', 'buitrungduc@doctor.com', 'password6'),
  ('Ngo Thi Hoa', 'Da lieu', '0321487695', 'ngothihoa@doctor.com', 'password7'),
  ('Duong Quang Dong', 'Noi tiet', '0987152643', 'duongquangdong@doctor.com', 'password8'),
  ('Le Thi Nhung', 'Noi khoa', '0631928745', 'lethinhung@doctor.com', 'password9'),
  ('Pham Thanh Tung', 'Ngoai khoa', '0547823691', 'phamthanhtung@doctor.com', 'password10');

-- Thêm dữ liệu vào bảng "Bệnh nhân"
INSERT INTO patient (name, age, gender, address, phone, email, password)
VALUES 
  ('Pham Van Cuong', 37, 'M', '789 Xa Dan, Ha Noi', '0739284561', 'phamvancuong@patient.com', 'password11'),
  ('Le Thi Dung', 43, 'F', '321 Cau Giay, Ha Noi', '0648273915', 'lethidung@patient.com', 'password12'),
  ('Hoang Van Hoan', 47, 'M', '159 Pham Hung, Ha Noi', '0583927461', 'hoangvanhoan@patient.com', 'password13'),
  ('Vu Thi Huyen', 51, 'F', '753 Giang Vo, Ha Noi', '0928473615', 'vuthihuyen@patient.com', 'password14'),
  ('Bui Van Khoa', 57, 'M', '357 Ton Duc Thang, Ha Noi', '0382917465', 'buivankhoa@patient.com', 'password15'),
  ('Do Thi Lan', 61, 'F', '951 Le Duan, Ha Noi', '0287391654', 'dothilan@patient.com', 'password16'),
  ('Dang Van Minh', 67, 'M', '246 Nguyen Trai, Ha Noi', '0183927654', 'dangvanminh@patient.com', 'password17'),
  ('Nguyen Thi Nga', 71, 'F', '842 Ba Trieu, Ha Noi', '0982713645', 'nguyenthinga@patient.com', 'password18'),
  ('Nguyen Van An', 23, 'M', '123 Doi Can, Ha Noi', '0912837465', 'nguyenvanan@patient.com', 'password19'),
  ('Tran Thi Bich', 31, 'F', '456 Truong Chinh, Ha Noi', '0827391645', 'tranthibich@patient.com', 'password20');

-- Thêm dữ liệu vào bảng "Quản trị viên"
INSERT INTO admin (name, email, password)
VALUES 
  ('Dinh Thi Trang', 'dinhthitrang@admin.com', 'admin21password'),
  ('Tran Minh Quan', 'tranminhquan@admin.com', 'admin22password'),
  ('Nguyen Thi Ha', 'nguyenthiha@admin.com', 'admin23password'),
  ('Vu Duc Phong', 'vuducphong@admin.com', 'admin24password'),
  ('Bui Thi Anh', 'buithianh@admin.com', 'admin25password'),
  ('Pham Trung Hieu', 'phamtrunghieu@admin.com', 'admin26password'),
  ('Le Van Son', 'levanson@admin.com', 'admin27password'),
  ('Nguyen Thi Thanh', 'nguyenthithanh@admin.com', 'admin28password');

-- Thêm dữ liệu vào bảng "Lịch hẹn"
INSERT INTO appointment (patient_id, doctor_id, appointment_date, appointment_time)
VALUES 
  (4, 6, '2023-07-07', '09:00'),
  (2, 3, '2023-07-08', '10:30'),
  (1, 4, '2023-07-09', '14:00'),
  (7, 2, '2023-07-10', '11:30'),
  (5, 8, '2023-07-11', '16:30'),
  (8, 5, '2023-07-12', '13:00'),
  (3, 7, '2023-07-13', '15:30'),
  (6, 4, '2023-07-14', '12:00'),
  (9, 1, '2023-07-08', '12:00'),
  (10, 5, '2023-07-11', '08:00');

-- Thêm dữ liệu vào bảng "Bệnh"
INSERT INTO disease (name, dos, donts)
VALUES
  ('Tieu duong', 'Che do an kieng, Tap the duc thuong xuyen, Duy tri can nang ly tuong', 'Tranh an thuc an giau duong, Thuc pham co ham luong chat beo cao'),
  ('Gay xuong', 'Nghi ngoi, Giu cho xuong bi gay trong tu the thang', 'Tranh van dong manh, Tranh dung tay hoac chan bi gay'),
  ('U nang buong trung', 'Kiem tra thuong xuyen voi bac si', 'Tranh cac hoat dong co the gay anh huong xau den suc khoe sinh san'),
  ('Ung thu da day', 'An uong lanh manh, Han che an thuc an cay nong', 'Tranh hut thuoc, an thuc pham chua hoa chat'),
  ('Viem loi', 'Danh rang va su dung chi nha khoa hang ngay', 'Tranh cac thuc pham co the gay kich thich loi'),
  ('Can thi', 'Su dung kinh ap trong hoac kinh mat', 'Tranh doc sach hoac lam viec o noi toi, hay khi mat da met'),
  ('Viem xoang', 'Dung thuoc dieu tri viem xoang, Tranh cac moi truong gay di ung', 'Tranh hut thuoc, hit phai khong khi lanh'),
  ('Viem hong', 'Uong nhieu nuoc, Su dung thuoc khang sinh', 'Tranh hut thuoc, hit phai khong khi lanh'),
  ('Viem da co dia', 'Su dung kem dieu tri, Tranh cac chat gay kich ung', 'Tranh tiep xuc voi hoa chat, Tranh tiep xuc voi vat lieu co the gay di ung');

-- Thêm dữ liệu vào bảng "Hồ sơ bệnh án"
INSERT INTO medical_record (patient_id, doctor_id, disease_id, diagnosis, prescription, notes)
VALUES
  (4, 6, 8, 'Chuan doan viem hong cho Do Thi Lan', 'Ke don Pain relievers, Antibiotic73', 'khuyen nghi nghi ngoi va uong nhieu nuoc'),
  (2, 3, 1, 'Chuan doan u nang buon trung cho Le Thi Dung', 'Ke don Ibuprofen giam dau', 'Benh nhan theo doi tinh hinh qua thoi gian'),
  (1, 4, 4, 'Chuan doan viem loi cho Pham Van Cuong', 'Ke don khang sinh', 'Benh nhan can cai thien ve sinh rang mieng'),
  (7, 2, 2, 'Chuan doan Gay xuong cho Dang Van Minh', 'Ke don bo sung canxi va vien chong loang xuong', 'Benh nhan can han che van dong nang'),
  (5, 8, 1, 'Chuan doan Tieu duong cho Bui Van Khoa', 'Ke don insulin hang ngay', 'Benh nhan can kiem tra duong huyet thuong xuyen'),
  (8, 5, 1, 'Chuan doan Can thi cho Nguyen Thi Nga', 'Ke don kinh ap trong', 'Benh nhan can kiem tra thi luc thuong xuyen'),
  (3, 7, 4, 'Chuan doan Viem da co dia cho Hoang Van Hoan', 'Ke don Kem corticosteroid', 'Benh nhan can han che tiep xuc voi chat kich thich va dung kem theo huong dan cua bac si'),
  (6, 4, 1, 'Chuan doan viem loi cho Do Thi Lan', 'Ke don Ke don khang sinh', 'Benh nhan can cai thien ve sinh rang mieng'),
  (9, 1, 1, 'Chuan doan Tieu duong cho Nguyen Van An', 'Ke don insulin hang ngay', 'Benh nhan can kiem tra duong huyet thuong xuyen'),
  (10, 5, 1, 'Chuan doan Can thi cho Tran Thi Bich', 'Ke don kinh ap trong', 'Benh nhan can kiem tra thi luc thuong xuyen');
<<<<<<< HEAD
  -- Them du lieu vao bang "Dich vu"
INSERT INTO service (name, doctor_specialization, description, fee)
VALUES ('Kham tong quat', 'Noi khoa', 'Kham suc khoe tong quat cho benh nhan', 300000),
('Chup X-quang', 'Noi khoa', 'Chup hinh X-quang de chan doan benh', 500000),
('Sieu am', 'Noi khoa', 'Su dung song sieu am de tao hinh anh cac co quan ben trong', 600000),
('Dieu tri ngoai khoa', 'Ngoai khoa', 'Cac dich vu lien quan den phau thuat ngoai khoa', 10000000),
('Kham noi khoa', 'Noi khoa', 'Kham cac benh lien quan den cac co quan ben trong co the', 400000),
('Dieu tri rang ham mat', 'Rang ham mat', 'Cac dich vu lien quan den dieu tri rang ham mat', 2000000),
('Kham mat', 'Mat', 'Kham va dieu tri cac benh ve mat', 500000),
('Kham tai mui hong', 'Tai mui hong', 'Kham va dieu tri cac benh ve tai mui hong', 500000),
('Kham suc khoe', 'Noi khoa', 'Kham suc khoe dinh ky', 250000),
('Phau thuat tim', 'Noi khoa', 'Phau thuat tim mach', 20000000),
('Nhan dao', 'Noi khoa', 'Ghep noi tang', 50000000),
('Kham benh noi khoa', 'Noi khoa', 'Kham cac benh noi khoa thuong gap', 350000),
('Phau thuat ngoai khoa', 'Ngoai khoa', 'Phau thuat ngoai khoa chung', 15000000),
('Kham mui hong', 'Tai mui hong', 'Kham va dieu tri cac benh ve mui hong', 500000),
('Cham soc thai phu', 'San phu khoa', 'Cham soc suc khoe cho thai phu', 500000),
('Phau thuat phu khoa', 'San phu khoa', 'Phau thuat phu khoa', 10000000),
('Kham benh san phu khoa', 'San phu khoa', 'Kham va dieu tri cac benh san phu khoa', 400000),
('Kham rang ham mat', 'Rang ham mat', 'Kham va dieu tri cac benh ve rang ham mat', 500000),
('Phau thuat rang ham mat', 'Rang ham mat', 'Phau thuat rang ham mat', 3000000),
('Phau thuat mat', 'Mat', 'Phau thuat mat', 4000000),
 ('Cham soc da', 'Da lieu', 'Cham soc va dieu tri cac benh da', 350000),
('Kham benh da lieu', 'Da lieu', 'Kham va dieu tri cac benh da lieu', 400000),
('Phau thuat da lieu', 'Da lieu', 'Phau thuat da lieu', 5000000),
('Kham noi tiet', 'Noi tiet', 'Kham va dieu tri cac benh noi tiet', 450000),
('Dieu tri tuyen giap', 'Noi tiet', 'Dieu tri cac benh lien quan den tuyen giap', 550000);
=======
>>>>>>> 1c0716e974c2ec8440dba7de7278da127bae1d4d
