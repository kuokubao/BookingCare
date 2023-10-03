import ModalCreateUser from "./ModalCreateUser"
import './Manage.scss';
import { FcPlus } from 'react-icons/fc'
import { useState } from 'react';
import TableAppointment from "./TableAppointment";
import { useEffect } from "react"
import { getAllAppointment, getAllUser } from "../../../services/apiService"
import { getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPageginate";
const ManageAppointmentAdmin = (props) => {
    const LIMIT_USER = 3;
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [listUser, setListUser] = useState([])
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // useEffect(() => {
    //     console.log('run use effect')
    // })
    useEffect(() => {
        fetchListUser();
        //fetchListUserWithPaginate(1)
    }, [])
    const fetchListUser = async () => {
        let res = await getAllAppointment();
        console.log(res);
        if (res.errCode === 0) {
            setListUser(res.data)
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
        let res = await getAllAppointment();
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
                Manage Appointment
            </div>
            <div className="user-content">
                <div className="table-users-cointainer">
                    <TableAppointment
                        listUser={listUser}
                    />
                    {/* <TableUserPaginate
                        listUser={listUser}
                        handleClickButtonUpdate={handleClickButtonUpdate}
                        handleClickButtonView={handleClickButtonView}
                        handleBtnDeleteUser={handleBtnDeleteUser}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}

                    /> */}
                </div>
            </div>
            {/* <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                testFunction={testFunction}
                fetchListUser={fetchListUser}
                //fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            /> */}
        </div >
    )
}
export default ManageAppointmentAdmin