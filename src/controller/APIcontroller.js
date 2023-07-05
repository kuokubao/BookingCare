import pool from '../configs/connectDB'

let getAllUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM patient');
    const rows = result.rows;
    return res.status(200).json({
        message: "Get all users",
        data: rows
    });
};

let createNewUser = async (req, res) => {
    let { name, gender, address, phone } = req.body;
    if (!name || !gender || address || !phone) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`INSERT INTO patient( name, gender, address,phone ) VALUES ($1, $2, $3, $4)`,
        [name, gender, address, phone]);
    return res.status(201).json({
        message: "Create new user success",
    });
};
let UpdateUser = async (req, res) => {
    let { name, gender, address, phone } = req.body;
    if (!name || !gender || address || !phone || !patient_id) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`update patient set name=$2,gender=$3,address=$4,phone=$5 where patient_id=$1`,
        [patient_id, name, gender, address, phone])
    return res.status(200).json({
        message: "Create new user success",
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
module.exports = {
    getAllUsers,
    createNewUser,
    UpdateUser,
    DeleteUser
};
