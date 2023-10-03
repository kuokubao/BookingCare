import { BrowserRouter, Routes, Route } from "react-router-dom";
import Patient from './Component/Patient/Patient';
import Admin from './Component/Admin/Admin';
import HomPage from './Component/Home/HomePage';
import ManageUser from './Component/Admin/Content/ManageUser';
import ManageMedical from './Component/Admin/Content/ManageMedical';
import ViewAppointment from './Component/Admin/Content/ViewAppointment'
import ManageAppointment from "./Component/Patient/Content/ManageAppointment";
import DashBoard from './Component/Admin/Content/DashBoard';
import Login from './Component/Auth/Login';
import LoginPatient from './Component/Auth/LoginPatient';
import DashBoardPatient from "./Component/Patient/Content/DashBoashPatients";
import App from './App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./Component/Auth/Register";
import ManagePatient from "./Component/Patient/Content/ManagePatient";
import ManageAppointmentAdmin from "./Component/Admin/Content/ViewAppointment";
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} >
                    <Route index element={<HomPage />} />
                </Route>
                <Route path='/patients' element={<Patient />} >
                    <Route index element={<DashBoardPatient />} />
                    <Route path='manage-patient' element={<ManagePatient />} />
                    <Route path='manage-appointments' element={<ManageAppointment />} />
                </Route>
                <Route path='/admins' element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-appointment' element={<ManageAppointmentAdmin />} />
                    <Route path='manage-medical' element={<ManageMedical />} />
                </Route>
                <Route path='/login' element={<Login />} ></Route>
                <Route path='/login-patient' element={<LoginPatient />} ></Route>
                <Route path='/register' element={<Register />} ></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default Layout;