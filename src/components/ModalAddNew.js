import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { createUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const { show, handleClose, handleUpdateTable } = props;

  const handleSave = async () => {
    let res = await createUser(name, job);

    // console.log(">>> Check res:", res);
    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("New User Created!");
      handleUpdateTable({
        first_name: name,
        last_name: "test",
        email: "testing@gmail.com",
        id: res.id,
      });
    } else {
      toast.error("Something Wrong!");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New User's Information Form!</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSave()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
