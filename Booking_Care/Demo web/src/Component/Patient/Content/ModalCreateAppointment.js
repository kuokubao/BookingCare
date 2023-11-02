import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import axios from 'axios';
import { toast } from 'react-toastify';
import { postCreateNewAppointment } from '../../../services/apiService';
const ModalCreateAppointment = (props) => {
    const { show, setShow, fetchListAppointment, listAppointment } = props
    const handleClose = () => props.setShow(false);
    const handleShow = () => setShow(true);
    const [patient_id, setPatient_id] = useState("");
    const [doctor_id, setDoctor_id] = useState("");
    const [appointment_date, setAppointment_date] = useState("");
    const [appointment_time, setAppointment_time] = useState("");
    const [service_name, setServiceName] = useState("");
    const [status, setStatus] = useState("");
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitCreateUser = async () => {
        // let data = {
        //     email: email,
        //     username: username,
        //     password: password,
        //     role: role,
        //     userImage: image,
        // }
        let data = await postCreateNewAppointment(patient_id, doctor_id, appointment_date, appointment_time, status, service_name);
        console.log('check respond', data)
        console.log('check list', patient_id)
        if (data && data.errCode === 0) {
            toast.success("Insert success");
            handleClose();
            await props.fetchListAppointment()
        }
        else if (data && data.errCode !== 0) {
            toast.error("Insert Failed")
        }
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop='static'
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">patient_id</label>
                            <input
                                type="patient_id"
                                className="form-control"
                                value={patient_id}
                                onChange={(event) => setPatient_id(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">doctor_id</label>
                            <input type="doctor_id"
                                className="form-control"
                                value={doctor_id}
                                onChange={(event) => { setDoctor_id(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">appointment_date</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={appointment_date}
                                onChange={(event) => setAppointment_date(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">appointment_time</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={appointment_time}
                                onChange={(event) => setAppointment_time(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Status</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Service</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={service_name}
                                onChange={(event) => setServiceName(event.target.value)}
                            />
                        </div>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default ModalCreateAppointment