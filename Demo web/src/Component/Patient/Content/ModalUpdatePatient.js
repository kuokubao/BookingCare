import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import axios from 'axios';
import { toast } from 'react-toastify';
import { postCreateNewUser, putUpdatePatient } from '../../../services/apiService';
import { updateUserSuccess } from '../../../redux/action/useAction';
import { useDispatch } from 'react-redux';
import _, { update } from 'lodash';
import { putUpdateUser } from '../../../services/apiService';
const ModalUpdatePatient = (props) => {
    const { show, setShow, fetchListUser, dataUpdate } = props
    const dispatch = useDispatch();
    // const handleClose = () => {
    //     props.setShow(false)
    // }
    const handleClose = () => {
        setShow(false)
        setEmail('');
        setName('');
        setRole('USER');
        setImage('');
        setPassword('');
        setPreviewImage(``);
        props.resetUpdateData();
    }
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        // console.log('run use effect', dataUpdate);
        if (!_.isEmpty(dataUpdate)) {
            setPassword(dataUpdate.password);
            setName(dataUpdate.name);
            setAge(dataUpdate.age);
            setGender(dataUpdate.gender);
            setAddress(dataUpdate.address);
            setPhone(dataUpdate.phone);

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
        let data = await putUpdatePatient(dataUpdate.patient_id, password, name, gender, age, address, phone);
        console.log('check respond', data)
        if (data && data.errCode === 0) {
            dispatch(updateUserSuccess({
                name: name,
                gender: gender,
                age: age,
                address: address,
                phone: phone,
            }));
            toast.success("Update patient success");
            handleClose();
            await props.fetchListUser()
            // props.setCurrentPage(1)
            //await props.fetchListUser(props.currentPage)
        }
        if (data && data.errCode !== 0) {
            toast.error("Update failed")
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
                            <label className="form-label">Password</label>
                            <input type="text"
                                className="form-control"
                                value={password}
                                //disabled={true}
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
                            <label htmlFor="inputCity" className="form-label">Gender</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={gender}
                                onChange={(event) => setGender(event.target.value)}
                            />

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Age</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={age}
                                onChange={(event) => setAge(event.target.value)}
                            />

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputCity" className="form-label">Phone</label>
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
export default ModalUpdatePatient