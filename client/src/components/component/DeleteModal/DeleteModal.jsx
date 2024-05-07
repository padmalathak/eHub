import "./DeleteModal.scss";
import { Modal, Button } from "react-bootstrap";
import closeIcon from "../../../assets/icons/close-24px.svg";

function DeleteModal(props) {
  const { onHide, message, handleDelete } = props;
  return (
    <div className="modal__background">
      <div className="modal__container">
        <div className="modal__close">
          <img src={closeIcon} onClick={onHide} alt="close" />
        </div>
        <div className="modal__body">
          <Modal.Body>
            <h4 className="modal__title">{`Delete ${message[0]} ?`}</h4>
            <p className="modal__message">
              {`Please confirm that you’d like to delete ${message[1]}.
           You won’t be able to undo this action.`}
            </p>
          </Modal.Body>
        </div>
        <div className="button__footer">
          <Button
            variant="default"
            onClick={onHide}
            className="btn button__modal "
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;