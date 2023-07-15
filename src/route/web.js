import express from "express";
import homeController from '../controller/homecontroller';
import userController from "../controller/userController";
import multer from "multer";
import path from "path";
let approot = require('app-root-path');
let router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(approot);
        cb(null, approot + '/src/public/image');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });
let upload_Multiple_Files = multer({ storage: storage, fileFilter: imageFilter }).array('multiple image', 3);
const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/doctor', homeController.getHomeDoctor);
    router.get('/appointment', homeController.getAppointment);
    router.get('/medical', homeController.getMeidicalRecord);
    router.get('/detail/user/:patient_id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/create-new-doctor', homeController.createNewDoctor);
    router.post("/delete-user", homeController.deleteUser);
    router.post("/delete-doctor", homeController.deleteDoctor);
    router.get("/edit-user/:patient_id", homeController.editUser);
    router.get("/doctor/edit-doctor/:doctor_id", homeController.editDoctor);
    router.post("/update-user", homeController.postUpdateUser)
    router.post("/doctor/update-doctor", homeController.postUpdateDoctor)
    router.get("/upload", homeController.getUploadFilePage)
    router.post("/api/login", userController.handleLogin)
    router.post("/upload-profile-pic", upload.single('profile_pic'), homeController.handleUploadFile)
    router.post('/upload-multiple-images', (req, res, next) => {
        upload_Multiple_Files(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                // handle multer file limit error here
                res.send('LIMIT_UNEXPECTED_FILE')
            } else if (err) {
                res.send(err)
            }

            else {
                // make sure to call next() if all was well
                next();
            }
        })
    }, homeController.handleUploadMultipleFiles)
    router.get('/about', (req, res) => {
        res.send(`I'm chubebanso`);
    })
    return app.use('/', router);
}
export default initWebRoute;