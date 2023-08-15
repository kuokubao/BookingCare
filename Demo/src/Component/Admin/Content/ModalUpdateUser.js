import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import axios from 'axios';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';
import _, { update } from 'lodash';
import { putUpdateUser } from '../../../services/apiService';
const ModalUpdateUser = (props) => {
    const { show, setShow, fetchListUser, dataUpdate } = props
    // const handleClose = () => {
    //     props.setShow(false)
    // }
    const handleClose = () => {
        setShow(false)
        setEmail('');
        setName('');
        setSpecialization('');
        setPhone('');
        setPassword('');
        props.resetUpdateData();
    }
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [phone, setPhone] = useState("");
    useEffect(() => {
        // console.log('run use effect', dataUpdate);
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setName(dataUpdate.name);
            setSpecialization(dataUpdate.specialization);
            setPhone(dataUpdate.phone)

        }
    }, [props.dataUpdate])
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitCreateUser = async () => {
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
        }
        let data = await putUpdateUser(dataUpdate.doctor_id, name, phone);
        //console.log('check respond', data)
        if (data && data.errCode === 0) {
            toast.success("Update doctor success");
            handleClose();
            // await props.fetchListUser()
            // props.setCurrentPage(1)
            await props.fetchListUser(props.currentPage)
        }
        if (data && data.errCode !== 0) {
            toast.error("Missing fields")
        }
    }
    /// console.log('check render:dataupdate', dataUpdate)
    // console.log('check data update', props.dataUpdate);
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
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled={true}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password"
                                className="form-control"
                                value={password}
                                disabled={true}
                                onChange={(event) => { setPassword(event.target.value) }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Doctor Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Specialization</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={specialization}
                                disabled={true}
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
export default ModalUpdateUser