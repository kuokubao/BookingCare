import { useEffect } from "react";
import { useState } from "react";
import { getAllUser } from "../../../services/apiService";
import Patient from "../Patient";

const TablePatient = (props) => {
    const { listUser } = props;

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser ? (
                        <tr>
                            <td scope="row">{listUser.email}</td>
                            <td>{listUser.name}</td>
                            <td>{listUser.age}</td>
                            <td>{listUser.gender}</td>
                            <td>{listUser.address}</td>
                            <td>{listUser.phone}</td>
                            <td>
                                <button
                                    className="btn btn-warning mx-3"
                                    onClick={() => props.handleClickButtonUpdate(listUser)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="5">not found data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default TablePatient;
