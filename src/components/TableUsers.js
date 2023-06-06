import { useEffect, useState } from "react";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import { Table, Button } from "react-bootstrap";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import _ from "lodash";
import "./TableUsers.scss";
import { toast } from "react-toastify";
const TableUsers = (props) => {
  const [listUser, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [isShowBtnAddNew, setIsShowBtnAddNew] = useState(false);
  const [isShowBtnEdit, setIsShowBtnEdit] = useState(false);
  const [isShowBtnDelete, setIsShownBtnDelete] = useState(false);

  const [editData, setEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [keyword, setKeyword] = useState("");

  const [dataExport, setDataExport] = useState([]);

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
  const handleClose = () => {
    setIsShowBtnAddNew(false);
    setIsShowBtnEdit(false);
    setIsShownBtnDelete(false);
  };
  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleEditClick = (user) => {
    // console.log(user);
    setEditData(user);
    setIsShowBtnEdit(true);
  };
  const handleDeleteClick = (user) => {
    setDeleteData(user);
    setIsShownBtnDelete(true);
  };
  const handleUpdateModalEdit = (user) => {
    // console.log(user);
    let cloneListUser = [...listUser];
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index] = user;
    // console.log(listUser, cloneListUser);
    setListUser(cloneListUser);
  };
  const handleUpdateModalDelete = (userId) => {
    let cloneListUser = [...listUser];
    cloneListUser = cloneListUser.filter((item) => item.id !== userId);
    setListUser(cloneListUser);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    // console.log(cloneListUser);
    setListUser(cloneListUser);
  };

  const handleSearch = _.debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      // console.log(cloneListUser);
      setListUser(cloneListUser);
    } else {
      getAllUser(1);
    }
  }, 300);

  const exportUsers = (event, done) => {
    let result = [];
    if (listUser && listUser.length > 0) {
      result.push(["ID", "First Name", "Last Name", "Email"]);
      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.first_name;
        arr[2] = item.last_name;
        arr[3] = item.email;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      // console.log(file);
      Papa.parse(file, {
        header: true,
        complete: function (result) {
          let raw = result.data;
          if (raw.length > 0) {
            if (raw[0] && raw[0].length === 4) {
              if (
                raw[0][0] !== "ID" &&
                raw[0][1] !== "First Name" &&
                raw[0][2] !== "Last Name" &&
                raw[0][3] !== "Email"
              ) {
                toast.error("Wrong format");
              }
            } else {
              let result = [];
              raw.map((item, index) => {
                let arr = {};
                arr.id = item[0];
                arr.first_name = item[1];
                arr.last_name = item[2];
                arr.email = item[3];
                result.push(arr);
              });
              console.log(result);
              setListUser(result);
            }
          } else {
            toast.error("Input file is empty");
          }
        },
      });
    }
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
        <div className="group-btns">
          <label className="btn btn-outline-info" htmlFor="importCSV">
            <i className="fa-solid fa-file-import"></i> Import CSV
          </label>
          <input
            id="importCSV"
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            hidden
            onChange={(event) => handleImportCSV(event)}
          ></input>
          <CSVLink
            className="btn btn-outline-success"
            filename="CSV_Download.csv"
            data={dataExport}
            asyncOnClick={true}
            onClick={exportUsers}
          >
            <i className="fa-solid fa-file-export"></i> Export CSV
          </CSVLink>
          {/* Cai duoi se tu dong download csv ve */}
          {/* <CSVDownload data={csvData} target="_blank" />; */}
          <Button variant="success" onClick={() => setIsShowBtnAddNew(true)}>
            <i className="fa-solid fa-user-plus"></i> Add new
          </Button>
        </div>
      </div>
      <div className="my-3 col-4 d-flex justify-between">
        <input
          className="form-control"
          placeholder="Search Email here...."
          value={keyword}
          onChange={(event) => {
            handleSearch(event);
            setKeyword(event.target.value);
          }}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    onClick={() => handleSort("desc", "id")}
                    className="fa-solid fa-arrow-down-long"
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "id")}
                    className="fa-solid fa-arrow-up-long"
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    onClick={() => handleSort("desc", "first_name")}
                    className="fa-solid fa-arrow-down-long"
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "first_name")}
                    className="fa-solid fa-arrow-up-long"
                  ></i>
                </span>
              </div>
            </th>
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
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(item)}
                    >
                      Delete
                    </Button>
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
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowBtnEdit}
        handleClose={handleClose}
        editData={editData}
        handleUpdateModalEdit={handleUpdateModalEdit}
      />
      <ModalConfirm
        show={isShowBtnDelete}
        handleClose={handleClose}
        deleteData={deleteData}
        handleUpdateModalDelete={handleUpdateModalDelete}
      />
    </>
  );
};
export default TableUsers;
