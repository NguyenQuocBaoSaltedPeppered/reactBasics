import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
const TableUsers = (props) => {
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    let res = await fetchAllUser();
    if (res && res.data) {
      setListUser(res.data);
    }
    // console.log("CHECK RES:", res);
  };
  // console.log(listUser);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
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
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};
export default TableUsers;
