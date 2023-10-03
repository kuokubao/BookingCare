import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import axios from 'axios';
import { toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash';
const ModalViewUser = (props) => {
    const { show, setShow, dataView } = props;
    const handleClose = () => {
        setShow(false)
        setEmail('');
        setName('');
        setSpecialization('UNG THU');
        setPhone('');
        setPassword('');
        setPreviewImage(``);
    }
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [specialization, setSpecialization] = useState("");
    useEffect(() => {
        // console.log(dataView)
        if (!_.isEmpty(dataView)) {
            setEmail(dataView.email);
            setName(dataView.name);
            setSpecialization(dataView.specialization);
            setPhone(dataView.phone);
            // if (dataView.image) {
            //     setPreviewImage(`data:image/jpeg;base64,${dataView.image}`)
            // }
        }
    }, [props.dataView])
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
                    <Modal.Title>View a Doctor</Modal.Title>
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
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default ModalViewUser;