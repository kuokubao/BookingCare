import { useEffect } from "react"
import { useState } from "react"
import { getAllUser } from "../../../services/apiService"
const TableMedical = (props) => {
    const { listUser } = props
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">medical_id</th>
                        <th scope="col">patient_id</th>
                        <th scope="col">doctor_id</th>
                        <th scope="col">disease_id</th>
                        <th scope="col">diagnosis </th>
                        <th scope="col">prescription </th>
                        <th scope="col">notes </th>
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
                                    <td>{item.medical_record_id}</td>
                                    <td>{item.patient_id}</td>
                                    <td>{item.doctor_id}</td>
                                    <td>{item.disease_id}</td>
                                    <td>{item.diagnosis}</td>
                                    <td>{item.prescription}</td>
                                    <td>{item.notes}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
export default TableMedical