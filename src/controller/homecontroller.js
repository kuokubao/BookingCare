import { json } from 'body-parser';
import pool from '../configs/connectDB'
import multer from 'multer';
let getHomepage = (req, res) => {
    let data = [];
    //let data_account = [];
    pool.query('SELECT * FROM patient ORDER BY patient_id', (err, results) => {
        if (err) throw err;
        results.rows.forEach(row => {
            data.push({
                patient_id: row.patient_id,
                email: row.email,
                password: row.password,
                name: row.name,
                age: row.age,
                gender: row.gender,
                address: row.address,
                phone: row.phone,
            });
        });
        //  console.log(data);
        res.render("index.ejs", { dataUser: data });
    });

};
let getHomeDoctor = (req, res) => {
    let doctor = [];
    pool.query('SELECT * FROM doctor ORDER BY doctor_id', (err, results) => {
        if (err) throw err;
        results.rows.forEach(row => {
            // Lấy thông tin chuyên khoa của bác sĩ
            pool.query('SELECT name FROM specialization WHERE specialization_id = $1', [row.specialization_id], (err, specializationResult) => {
                if (err) throw err;
                const specializationName = specializationResult.rows[0].name;
                doctor.push({
                    doctor_id: row.doctor_id,
                    password: row.password,
                    name: row.name,
                    specialization_id: row.specialization_id,
                    specialization: specializationName, // Thêm thông tin chuyên khoa vào đây
                    phone: row.phone,
                    email: row.email,
                });

                // Kiểm tra xem đã duyệt qua tất cả các bác sĩ hay chưa
                if (doctor.length === results.rows.length) {
                    res.render("doctor.ejs", { dataDoctor: doctor });
                }
            });
        });
    });
}

let getAppointment = (req, res) => {
    let appointment = [];
    pool.query('SELECT * FROM appointment ORDER BY  appointment_id', (err, results) => {
        if (err) throw err;
        results.rows.forEach(row => {
            appointment.push({
                appointment_id: row.appointment_id,
                patient_id: row.patient_id,
                appointment_date: row.appointment_date,
                specialization: row.specialization,
                appointment_time: row.appointment_time,
                status: row.status,
            });
        });
        res.render("appointment.ejs", { dataAppointment: appointment });
    });
}
let getMeidicalRecord = (req, res) => {
    let medical = [];
    pool.query('SELECT * FROM medical_record ORDER BY  medical_record_id', (err, results) => {
        if (err) throw err;
        results.rows.forEach(row => {
            medical.push({
                medical_record_id: row.medical_record_id,
                patient_id: row.patient_id,
                doctor_id: row.doctor_id,
                disease_id: row.disease_id,
                diagnosis: row.diagnosis,
                prescription: row.prescription,
                notes: row.notes
            });
        });
        res.render("medical.ejs", { dataMedical: medical });
    });
}
let getDetailPatient = async (req, res) => {
    let userId = req.params.patient_id;
    let user = await pool.query(`SELECT * FROM patient WHERE patient_id =$1`, [userId]);
    // console.log('check request params', user.rowsơ0);
    return res.send(JSON.stringify(user.rows[0]));
}
let getDetailAppointment = async (req, res) => {
    let userId = req.params.patient_id;
    let user = await pool.query(`SELECT * FROM appointment WHERE patient_id =$1`, [userId]);
    // console.log('check request params', user.rowsơ0);
    return res.send(JSON.stringify(user.rows[0]));
}
//Thêm user
let createNewUser = async (req, res) => {
    console.log(`check req`, req.body)
    let { email, password, name, gender, age, address, phone } = req.body;
    await pool.query(`insert into patient(email,password,name,gender,age,address,phone) values($1,$2,$3,$4,$5,$6,$7)`, [email, password, name, gender, age, address, phone])
    return res.redirect('/')
}
let createAppointment = async (req, res) => {
    console.log(`check req`, req.body)
    let { patient_id, doctor_id, appointment_date, appointment_time, status, service_name } = req.body;
    await pool.query(`insert into appointment(patient_id,doctor_id,appointment_date,appointment_time,status,service_name) values($1,$2,$3,$4,$5,$6)`, [patient_id, doctor_id, appointment_date, appointment_time, status, service_name])
    return res.redirect('/')
}
let createNewDoctor = async (req, res) => {
    console.log(`check req`, req.body)
    let { email, password, name, specialization_id, phone } = req.body;
    await pool.query(`insert into doctor( email,password,name,specialization_id,phone) values($1,$2,$3,$4,$5)`, [email, password, name, specialization_id, phone])
    return res.redirect('/')
}
//Xóa user
let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.query(`delete from patient where patient_id=$1`, [userId]);
    return res.redirect('/')//quay ve trang chu 
}
let deleteDoctor = async (req, res) => {
    let doctor_id = req.body.doctor_id;
    console.log(doctor_id)
    await pool.query(`delete from doctor where doctor_id=$1`, [doctor_id]);
    return res.redirect('/doctor')//quay ve trang chu 
}
let editUser = async (req, res) => {
    let id = req.params.patient_id //lay id nguoi dung
    let user = (await pool.query(`select *from patient where patient_id=$1`, [id])).rows[0];
    return res.render('updateUser.ejs', { dataUser: user }) //x<-y
}
let editDoctor = async (req, res) => {
    let id = req.params.doctor_id //lay id nguoi dung
    let doctor = (await pool.query(`select *from doctor where doctor_id=$1`, [id])).rows[0];
    return res.render('update.ejs', { dataDoctor: doctor }) //x<-y
}
let postUpdateUser = async (req, res) => {
    let { password, name, age, gender, address, phone, patient_id } = req.body;
    await pool.query(`update patient set password=$2,name=$3,gender=$4,address=$5,phone=$6,age=$7 where patient_id=$1`,
        [patient_id, password, name, gender, address, phone, age])
    return res.redirect('/')
}
let postUpdateDoctor = async (req, res) => {
    let { name, phone, doctor_id } = req.body;
    console.log(req.body);
    await pool.query(
        `UPDATE doctor SET name=$2, phone=$3 WHERE doctor_id=$1`,
        [doctor_id, name, phone]
    );
    return res.redirect('/doctor');
};


let getUploadFilePage = async (req, res) => {
    res.render('uploadfile.ejs');
}
const upload = multer().single('profile_pic');
const upload_multiple = multer().array('multiple_images');
let handleUploadFile = async (req, res) => {
    console.log(req.file);
    // upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError) {
    //     return res.send(err);
    // }
    // else if (err) {
    //     return res.send(err);
    // }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}
let handleUploadMultipleFiles = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    console.log('check files', files)
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    //file là 1 array được quét
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
};
module.exports = {
    getHomepage, getDetailPatient, createNewUser, deleteUser, editUser, postUpdateUser,
    getUploadFilePage, handleUploadFile, handleUploadMultipleFiles, createNewDoctor, getHomeDoctor, editDoctor,
    postUpdateDoctor, deleteDoctor, getAppointment, getMeidicalRecord, getDetailAppointment, createAppointment
}