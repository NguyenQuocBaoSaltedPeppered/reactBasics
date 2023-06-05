import { Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../services/UserService";
const ModalEditUser = (props) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const { show, handleClose, editData, handleUpdateModalEdit } = props;

  const handleEditUser = async () => {
    let res = await updateUser(name, job, editData.id);
    if (res && res.updatedAt) {
      handleUpdateModalEdit({
        id: editData.id,
        email: "Updated@reqres.in",
        first_name: name,
        last_name: "Updated",
      });
      handleClose();
      setName("");
      setJob("");
      toast.success("Editted!");
    } else {
      toast.error("Something Wrong!");
    }
  };

  useEffect(() => {
    //Chi khi nao modal edit duoc mo ra va data thay doi thi moi cap nhat lai
    if (show) {
      setName(editData.first_name);
      setJob("RandomJob");
    }
  }, [show, editData]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
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
                  value={job}
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
          <Button variant="secondary" onClick={handleClose}>
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
