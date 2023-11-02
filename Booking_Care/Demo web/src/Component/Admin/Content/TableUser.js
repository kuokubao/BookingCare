import { useEffect } from "react"
import { useState } from "react"
import { getAllUser } from "../../../services/apiService"
const TableUser = (props) => {
    const { listUser } = props
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Doctor ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">Specialization</th>
                        <th>Action</th>
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
                                    <td scope="row">{item.doctor_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.specialization}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => props.handleClickButtonView(item)}
                                        >View</button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickButtonUpdate(item)}>Update</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleBtnDeleteUser(item)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
export default TableUser