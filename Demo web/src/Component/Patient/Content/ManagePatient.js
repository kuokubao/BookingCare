import { FcPlus } from 'react-icons/fc'
import { useState } from 'react';
import { useEffect } from "react"
import { getAllUser, getAppointment, getPatient } from "../../../services/apiService"
import { getUserWithPaginate } from "../../../services/apiService";
import TablePatient from './TablePatient';
import TablePatientPaginate from './TablePatientPaginate';
import ModalCreatePatient from './ModalCreateAppointment';
import ModalViewPatient from './ModalViewPatient';
import ModalUpdatePatient from './ModalUpdatePatient';
import ModalDeletePatient from './ModalDeleteUser';
import { updateUserSuccess } from '../../../redux/action/useAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableAppointment from './TableAppointment';
const ManagePatient = (props) => {
    const currentUser = useSelector((state) => state.userReducer.currentUser);
    if (currentUser) {
        console.log('Thông tin người dùng:', currentUser);
    }
    const LIMIT_USER = 3;
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [listUser, setListUser] = useState([])
    const [listAppointment, setListAppointment] = useState([])
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // useEffect(() => {
    //     console.log('run use effect')
    // })
    useEffect(() => {
        fetchListUser();
        // fetchListUserWithPaginate(1)
    }, [])
    useEffect(() => {
        fetchListAppointment();
        // fetchListUserWithPaginate(1)
    }, [])
    const fetchListUser = async () => {
        let res = await getPatient(currentUser.user.patient_id);
        console.log(res.data[0]);
        if (res.errCode === 0) {
            setListUser(res.data[0])
        }
    }
    const fetchListAppointment = async () => {
        let res = await getAppointment(currentUser.user.patient_id);
        console.log(res.data[0]);
        if (res.errCode === 0) {
            setListAppointment(res.data[0])
        }
    }
    // const fetchListUserWithPaginate = async (page) => {
    //     let res = await getUserWithPaginate(page, LIMIT_USER);
    //     console.log(res);
    //     if (res.EC === 0) {
    //         console.log('check res', res.DT)
    //         setListUser(res.DT.users)
    //         setPageCount(res.DT.totalPages)
    //     }
    // }
    const testFunction = async () => {
        let res = await getAllUser();
        if (res.errCode === 0) {
            setListUser(res.data)
        }
    }
    const handleClickButtonUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
        //console.log('update user', user);
    }
    const handleClickButtonView = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
        //console.log('update user', user);
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    const handleBtnDeleteUser = (user) => {
        setShowModalDeleteUser(true);
        console.log('check data delete', user)
        setDataDelete(user);
        //console.log('update user', user);
    }
    //console.log('data update')
    return (
        < div className="manage-user-container" >
            <div className="title">
                Manage Infor Patient
            </div>
            <div>
                {/* <h1>Welcome, {currentUser.user.name}</h1>
                <p>Email: {currentUser.user.email}</p>
                <p>Age: {currentUser.user.age}</p>
                Các thông tin khác của người dùng */}
            </div>
            <div className="user-content">
                <div className="table-users-cointainer">
                    <TablePatient
                        listUser={listUser}
                        handleClickButtonUpdate={handleClickButtonUpdate}
                        handleClickButtonView={handleClickButtonView}
                        handleBtnDeleteUser={handleBtnDeleteUser}
                    />
                </div>
            </div>
            <ModalCreatePatient
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                testFunction={testFunction}
                fetchListUser={fetchListUser}
                // fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalViewPatient
                show={showModalViewUser}
                setShow={setShowModalViewUser}
                fetchListUser={fetchListUser}
                dataView={dataView}
            />
            <ModalUpdatePatient
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                fetchListUser={fetchListUser}
                resetUpdateData={resetUpdateData}
                //fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalDeletePatient
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDelete={dataDelete}
                fetchListUser={fetchListUser}
                // fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <div className='text-center'>
                <span className='back' onClick={() => { navigate('/') }}>
                    &#60;&#60;Log out
                </span>
            </div>
        </div >

    )
}
export default ManagePatient