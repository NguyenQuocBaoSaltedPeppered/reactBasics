import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import { Button } from "react-bootstrap";
const TableUsers = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isShowBtnAddNew, setIsShowBtnAddNew] = useState(false);
  const [isShowBtnEdit, setIsShowBtnEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const getAllUser = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      // console.log(res);
      setListUser(res.data);
      setTotalUser(res.total);
      setTotalPage(res.total_pages);
    }
    // console.log("CHECK RES:", res);
  };
  // console.log(listUser);

  const handlePageClick = (event) => {
    //check what is event?
    // console.log(event, typeof event.selected);
    getAllUser(event.selected + 1);
  };
  const handleCloseAdd = () => {
    setIsShowBtnAddNew(false);
  };
  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleCloseEdit = () => {
    setIsShowBtnEdit(false);
  };
  const handleEditClick = (user) => {
    // console.log(user);
    setEditData(user);
    setIsShowBtnEdit(true);
  };
  const handleUpdateModalEdit = (user) => {
    // console.log(user);
    let cloneListUser = [...listUser];
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index] = user;
    // console.log(listUser, cloneListUser);
    setListUser(cloneListUser);
  };

  useEffect(() => {
    getAllUser(1);
  }, []);

  return (
    <>
      <div className="my-3 addNew">
        {/* my co nghia la margin theo truc y (top - bottom)*/}
        <span>
          <b>List Users:</b>
        </span>
        <button
          className="btn btn-success "
          onClick={() => setIsShowBtnAddNew(true)}
        >
          Add new Users
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`users-${item.id}`}>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Button
                      className="btn btn-warning"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>{" "}
                    <Button className="btn btn-danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(event) => handlePageClick(event)}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

      <ModalAddNew
        show={isShowBtnAddNew}
        handleCloseAdd={handleCloseAdd}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowBtnEdit}
        handleCloseEdit={handleCloseEdit}
        editData={editData}
        handleUpdateModalEdit={handleUpdateModalEdit}
      />
    </>
  );
};
export default TableUsers;
