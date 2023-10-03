import { useEffect } from "react"
import { useState } from "react"
import { getAllUser } from "../../../services/apiService"
const TableAppointment = (props) => {
    const { listUser } = props
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">appointment_id</th>
                        <th scope="col">patient_id</th>
                        <th scope="col">doctor_id</th>
                        <th scope="col">appointment_date</th>
                        <th scope="col">appointment_time</th>
                        <th scope="col">status</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length == 0 &&
                        <td colSpan={'4'}>not found data</td>
                    }
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`table user ${index}`}>
                                    <td scope="row">{item.appointment_id}</td>
                                    <td>{item.patient_id}</td>
                                    <td>{item.doctor_id}</td>
                                    <td>{item.appointment_date}</td>
                                    <td>{item.appointment_time}</td>
                                    <td>{item.status}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
export default TableAppointment