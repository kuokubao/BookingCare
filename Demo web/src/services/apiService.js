import axios from "../utils/axiosCustomize";
const postCreateNewUser = (email, password, name, specialization_id, phone) => {
    // const data = new FormData();
    // data.append('email', email);
    // data.append('password', password);
    // data.append('name', name);
    // data.append('specialization', specialization);
    // data.append('phone', phone);
    return axios.post('api/v1/create-doctor', { email, password, name, specialization_id, phone });
}
const postCreateNewAppointment = (patient_id, doctor_id, appointment_date, appointment_time, status, service_name) => {
    return axios.post('api/v1/create-appointment', { patient_id, doctor_id, appointment_date, appointment_time, status, service_name });
}
const getAllUser = () => {
    return axios.get('api/v1/doctors');
}
const getPatient = (patient_id) => {
    return axios.get(`api/v1/patient/${patient_id}`);
}
const getAppointment = (patient_id) => {
    return axios.get(`api/v1/appointment/${patient_id}`);
}
const getAllAppointment = () => {
    return axios.get('api/v1/appointment');
}
const getAllMediCal = () => {
    return axios.get('api/v1/medical');
}
const putUpdateUser = (doctor_id, name, phone) => {
    // const data = new FormData();
    // data.append('id', id)
    // data.append('username', username);
    // data.append('role', role);
    // data.append('userImage', image);
    return axios.put('api/v1/update-doctor', { doctor_id, name, phone });
}
const putUpdatePatient = (patient_id, password, name, gender, age, address, phone) => {
    return axios.put('api/v1/update-user', { patient_id, password, name, gender, age, address, phone });
}
const deleteUser = (doctor_id) => {
    return axios.delete(`api/v1/delete-doctor/${doctor_id}`, { doctor_id });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`,);
}
const postLogin = (email, password) => {
    return axios.post(`/api/login`, { email, password });
};
const postLoginPatient = (email, password) => {
    return axios.post(`/api/login1`, { email, password });
};
const postRegister = (email, password, name, age, gender, address, phone) => {
    return axios.post(`/api/v1/create-user`, { email, password, name, age, gender, address, phone })
}
export { getAppointment, postCreateNewUser, getAllUser, putUpdateUser, deleteUser, postCreateNewAppointment, getUserWithPaginate, postLogin, postRegister, getAllAppointment, getAllMediCal, postLoginPatient, putUpdatePatient, getPatient }