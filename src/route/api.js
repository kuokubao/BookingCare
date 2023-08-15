import express from "express";
import APIcontroller from '../controller/APIcontroller'
let router = express.Router();
const initAPIRoute = (app) => {
    router.get("/users", APIcontroller.getAllUsers)//method get =>READ data
    router.get("/doctors", APIcontroller.getAllDoctors)//method get =>READ data
    router.get("/patient/:patient_id", APIcontroller.getPatient)
    router.get("/appointment/:patient_id", APIcontroller.getAppointment)//method get =>READ data
    router.get("/appointment", APIcontroller.getAllAppointment)//method get =>READ data
    router.get("/medical", APIcontroller.getAllMedicalRecord)//method get =>READ data
    router.post("/create-user", APIcontroller.createNewUser)//method post=>create data
    router.post("/create-doctor", APIcontroller.createNewDoctor)
    router.post("/create-appointment", APIcontroller.createAppointment)
    router.put("/update-user", APIcontroller.UpdateUser)//method put=>update data
    router.put("/update-doctor", APIcontroller.UpdateDoctor)
    router.delete("/delete-user/:patient_id", APIcontroller.DeleteUser)//method delete=>delete data
    router.delete("/delete-doctor/:doctor_id", APIcontroller.deleteDoctor)
    router.post("/api/login", APIcontroller.handleLogin)
    router.post("/login1", APIcontroller.handleLoginPatient)
    return app.use('/api/v1/', router);
}
export default initAPIRoute;