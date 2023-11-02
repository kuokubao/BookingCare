import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useEffect } from "react";

const TablePatientPaginate = (props) => {
    const { listUser, pageCount } = props;
    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

    let maxUser = null;
    if (listUser && listUser.length > 0) {
        maxUser = listUser.reduce((prevUser, currentUser) => {
            return prevUser.id > currentUser.id ? prevUser : currentUser;
        });
    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {maxUser ? (
                        <tr>
                            <td scope="row">{maxUser.id}</td>
                            <td>{maxUser.username}</td>
                            <td>{maxUser.email}</td>
                            <td>{maxUser.role}</td>
                            <td>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => props.handleClickButtonView(maxUser)}
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-warning mx-3"
                                    onClick={() => props.handleClickButtonUpdate(maxUser)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => props.handleBtnDeleteUser(maxUser)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="4">not found data</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="user-pagination">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    );
};

export default TablePatientPaginate;
