import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import axios from 'axios';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';
const ModalCreateUser = (props) => {
    const { show, setShow, fetchListUser } = props
    const handleClose = () => props.setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [specialization_id, setSpecialization] = useState("");
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
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
        }
        if (!password) {
            toast.error('invalid password')
        }
        let data = await postCreateNewUser(email, password, name, specialization_id, phone);
        //console.log('check respond', data)
        if (data && data.errCode === 0) {
            toast.success('Create new doctor success');
            handleClose();
            props.setCurrentPage(1)
            await props.fetchListUserWithPaginate(1)
        }
        if (data && data.errCode !== 0) {
            toast.error("Create failed")
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
                    <Modal.Title>Add new Doctor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Specialization_id</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={specialization_id}
                                onChange={(event) => setSpecialization(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
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
export default ModalCreateUser