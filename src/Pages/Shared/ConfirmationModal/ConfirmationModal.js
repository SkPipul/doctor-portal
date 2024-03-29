import React from "react";

const ConfirmationModal = ({title, message, closeModal, modalData, successAction, successButtonName}) => {
  return (
    <div>
      <input type="checkbox" id="Confirm-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {title}
          </h3>
          <p className="py-4">
            {message}
          </p>
          <div className="modal-action">
            <label onClick={() => successAction(modalData)} htmlFor="Confirm-modal" className="btn btn-error">
              {successButtonName}
            </label>
            <button onClick={closeModal} className="btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
