import { Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { createUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const { show, handleCloseEdit, editData } = props;

  const handleEditUser = () => {};

  useEffect(() => {
    //Chi khi nao modal edit duoc mo ra va data thay doi thi moi cap nhat lai
    if (show) {
      setName(editData.first_name);
    }
  }, [editData]);
  return (
    <>
      <Modal show={show} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User Form!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body addNew">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user's name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicJob">
                <Form.Label>Job</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Job"
                  value="Random Job"
                  onChange={(event) => {
                    setJob(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Text className="text-muted">
                We'll never share your information with anyone else.
              </Form.Text>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
