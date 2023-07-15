import pool from '../configs/connectDB';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserName(email);

            if (isExist) {
                let result = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
                let user = result.rows[0];
                if (user) {
                    if (password === user.password) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK~';
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'WRONG PASSWORD~';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found~';
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your username doesn't exist in our system. Try another username.";
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};

let checkUserName = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query('SELECT email FROM admin WHERE email = $1', [email]);
            let user = result.rows[0];

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    handleUserLogin: handleUserLogin
};
