/* eslint-disable react/prop-types */
import "./DeleteModal.scss";
import closeIcon from "../../assets/images/icons/close.svg";
import logo from "../../assets/images/logos/logo-PhotoRoom.png";

export default function DeleteModal({
  setShowModal,
  showModal,
  event,
  deleteEvent,
}) {
  if (!showModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__close">
          <img src={logo} alt="logo" className="modal__close-logo" />
          <img
            src={closeIcon}
            alt="X"
            className="modal__close-img"
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className="modal__confirmation">
          <div className="modal__header">
            <h2 id="deleteTitle" className="modal__title">
              Delete {event}?
            </h2>
          </div>
          <div className="modal__body">
            <p id="deleteMessage" className="modal__body-message">
              Please confirm that you would like to delete {event}. This action
              cannot be undone and Squamish might be sad if you do.
            </p>
          </div>
          <div className="modal__footer">
            <button
              id="deleteCancel"
              className=""
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              id="deleteConfirm"
              className=""
              onClick={() => deleteEvent()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
