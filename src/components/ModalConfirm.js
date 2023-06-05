import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../services/UserService";

const ModalConfirm = (props) => {
  const { show, handleClose, deleteData, handleUpdateModalDelete } = props;
  const handleDelete = async () => {
    let res = await deleteUser(deleteData.id);
    if (res) {
      handleUpdateModalDelete(deleteData.id);
      handleClose();
      toast.success("Deleted!");
    } else {
      toast.error("Something Wrong!");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body addNew">
            <h5>
              Are you sure to delete this user? This actions can't be undone!
            </h5>
            Delete user with email: <b>{deleteData.email}</b> ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Yes, I am!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
