import pool from '../configs/connectDB'

let getAllUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM patient');
    const rows = result.rows;
    return res.status(200).json({
        message: "Get all users",
        data: rows
    });
};
let getAllDoctors = async (req, res) => {
    const result = await pool.query('SELECT * FROM doctor ORDER BY doctor_id');
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
    let { name, gender, age, address, phone } = req.body;
    if (!name || !gender || !age || !address || !phone) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`INSERT INTO patient( name, gender, age,address,phone ) VALUES ($1, $2, $3, $4,$5)`,
        [name, gender, age, address, phone]);
    return res.status(201).json({
        message: "Create new user success",
    });
};
let createNewDoctor = async (req, res) => {
    let { email, password, name, specialization, phone } = req.body;
    console.log(req.body);
    if (!email || !password || !name || !specialization || !phone) {
        return res.status(400).json({
            message: "Missing fields!",
            errCode: 1
        });
    }
    await pool.query(
        `INSERT INTO doctor (email,password,name, specialization, phone) VALUES ($1, $2, $3,$4,$5)`,
        [email, password, name, specialization, phone]
    );
    return res.status(201).json({
        errCode: 0,
        message: "Create new doctor success",
    });
};

let UpdateUser = async (req, res) => {
    let { name, gender, age, address, phone } = req.body;
    if (!name || !gender || !age | !address || !phone || !patient_id) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`update patient set name=$2,gender=$3,address=$4,phone=$5,age=$6 where patient_id=$1`,
        [patient_id, name, gender, age, address, phone])
    return res.status(200).json({
        message: "Create new user success",
    });
}
let UpdateDoctor = async (req, res) => {
    let { name, specialization, phone, doctor_id } = req.body;
    if (!name | !specialization || !phone) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`update doctor set name=$2,specialization=$3,phone=$4 where doctor_id=$1`,
        [doctor_id, name, specialization, phone])
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
module.exports = {
    getAllUsers,
    createNewUser,
    UpdateUser,
    DeleteUser, handleLogin, createNewDoctor, getAllDoctors, UpdateDoctor, deleteDoctor, getAllAppointment, getAllMedicalRecord
};
