import pool from '../configs/connectDB'

let getAllUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM patient order by patient_id');
    const rows = result.rows;
    return res.status(200).json({
        message: "Get all users",
        data: rows
    });
};
let getPatient = async (req, res) => {
    let patient_id = req.params.patient_id;
    if (!patient_id) {
        return res.status(400).json({
            message: "Missing fields",
        })
    }
    const result = await pool.query(`select * from patient where patient_id=$1`, [patient_id]);
    const rows = result.rows;
    return res.status(200).json({
        message: "get patient",
        errCode: 0,
        data: rows
    });
}
let getAppointment = async (req, res) => {
    let patient_id = req.params.patient_id;
    if (!patient_id) {
        return res.status(400).json({
            message: "Missing fields",
        })
    }
    const result = await pool.query(`select * from appointment where patient_id=$1`, [patient_id]);
    const rows = result.rows;
    return res.status(200).json({
        message: "get patient",
        errCode: 0,
        data: rows
    });
}
// let getProfilePatient = async (req, res) => {
//     const result = await pool.query('SELECT * FROM patient where patient_id=$1',[patient_id]);
//     const rows = result.rows;
//     return res.status(200).json({
//         message: "Get all users",
//         data: rows
//     });
// };
let getAllDoctors = async (req, res) => {
    const result = await pool.query(`
    SELECT doctor.doctor_id, doctor.password, doctor.name, doctor.phone, doctor.email,
           specialization.name AS specialization
    FROM doctor
    LEFT JOIN specialization ON doctor.specialization_id = specialization.specialization_id
    ORDER BY doctor.doctor_id
`);
    const rows = result.rows;
    return res.status(200).json({
        message: "Get all doctors",
        data: rows,
        errCode: 0
    });
};
let getAllAppointment = async (req, res) => {
    const result = await pool.query('SELECT * FROM appointment ORDER BY appointment_id');
    const rows = result.rows;
    return res.status(200).json({
        message: "Get all doctors",
        data: rows,
        errCode: 0
    });
};
let getAllMedicalRecord = async (req, res) => {
    const result = await pool.query('SELECT * FROM medical_record ORDER BY medical_record_id');
    const rows = result.rows;
    return res.status(200).json({
        message: "Get all Medical",
        data: rows,
        errCode: 0
    });
};

let createNewUser = async (req, res) => {
    let { email, password, name, gender, age, address, phone } = req.body;
    if (!email || !password || !name || !gender || !age || !address || !phone) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`INSERT INTO patient(email,password,name, gender, age,address,phone ) VALUES ($1, $2, $3, $4,$5,$6,$7)`,
        [email, password, name, gender, age, address, phone]);
    return res.status(201).json({
        message: "Create new user success",
        errCode: 0
    });
};
let createAppointment = async (req, res) => {
    let { patient_id, doctor_id, appointment_date, appointment_time, status, service_name } = req.body;
    if (!patient_id || !doctor_id || !appointment_date || !appointment_time || !status || !service_name) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`INSERT INTO appointment(patient_id, doctor_id, appointment_date, appointment_time, status, service_name ) VALUES ($1, $2, $3, $4,$5,$6)`,
        [patient_id, doctor_id, appointment_date, appointment_time, status, service_name]);
    return res.status(201).json({
        message: "Create new user success",
        errCode: 0
    });
};
let createNewDoctor = async (req, res) => {
    let { email, password, name, specialization_id, phone } = req.body;
    console.log(req.body);
    if (!email || !password || !name || !specialization_id || !phone) {
        return res.status(400).json({
            message: "Missing fields!",
            errCode: 1
        });
    }
    await pool.query(
        `INSERT INTO doctor (email,password,name, specialization_id, phone) VALUES ($1, $2, $3,$4,$5)`,
        [email, password, name, specialization_id, phone]
    );
    return res.status(201).json({
        errCode: 0,
        message: "Create new doctor success",
    });
};

let UpdateUser = async (req, res) => {
    let { password, name, gender, age, address, phone, patient_id } = req.body;
    if (!password || !name || !gender || !age | !address || !phone) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`update patient set password=$2,name=$3,gender=$4,age=$5,address=$6,phone=$7 where patient_id=$1`,
        [patient_id, password, name, gender, age, address, phone])
    return res.status(200).json({
        message: "Update new user success",
        errCode: 0,
    });
}
let UpdateDoctor = async (req, res) => {
    let { name, phone, doctor_id } = req.body;
    if (!name || !phone) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`update doctor set name=$2,phone=$3 where doctor_id=$1`,
        [doctor_id, name, phone])
    return res.status(200).json({
        message: "Update doctor success",
        errCode: 0,
    });
}
let DeleteUser = async (req, res) => {
    let userId = req.params.patient_id;
    if (!userId) {
        return res.status(400).json({
            message: "Missing fields",
        })
    }
    await pool.query(`delete from patient where patient_id=$1`, [userId]);
    return res.status(200).json({
        message: "Delete user success",
    });
}
let deleteDoctor = async (req, res) => {
    let doctor_id = req.params.doctor_id;
    if (!doctor_id) {
        return res.status(400).json({
            message: "Missing fields",
        })
    }
    await pool.query(`delete from doctor where doctor_id=$1`, [doctor_id]);
    return res.status(200).json({
        message: "Delete user success",
        errCode: 0,
    });
}
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body.email);
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    //console.log(username)
    //check username exist
    // compare password
    //return userInfor
    //access_token:JWT  
    return res.status(200).json({
        userData
    })
}

let handleLoginPatient = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body.email);
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userService.handlePatientLogin(email, password);
    //console.log(username)
    //check username exist
    // compare password
    //return userInfor
    //access_token:JWT  
    return res.status(200).json({
        userData
    })
}
module.exports = {
    getAllUsers,
    createNewUser, getAppointment,
    UpdateUser, handleLoginPatient, getPatient,
    DeleteUser, handleLogin, createNewDoctor, getAllDoctors, UpdateDoctor, deleteDoctor, getAllAppointment, getAllMedicalRecord, createAppointment
};
