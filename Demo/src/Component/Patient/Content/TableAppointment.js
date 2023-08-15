import { useEffect } from "react";
import { useState } from "react";
import { getAllUser } from "../../../services/apiService";
import Patient from "../Patient";

const TableAppointmentPatient = (props) => {
    const { listAppointment } = props;

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">app.id</th>
                        <th scope="col">doctor_id</th>
                        <th scope="col">appointment_date</th>
                        <th scope="col">appointment_time</th>
                        <th scope="col">status</th>
                        <th scope="col">service_name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listAppointment && listAppointment.length > 0 &&
                        listAppointment.map((item, index) => {
                            return (
                                <tr key={`table user ${index}`}>
                                    <td>{item.appointment_id}</td>
                                    <td>{item.doctor_id}</td>
                                    <td>{item.appointment_date}</td>
                                    <td>{item.appointment_time}</td>
                                    <td>{item.status}</td>
                                    <td>{item.service_name}</td>
                                    <td>

                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickButtonUpdate(item)}>Update</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    );
};

export default TableAppointmentPatient;
