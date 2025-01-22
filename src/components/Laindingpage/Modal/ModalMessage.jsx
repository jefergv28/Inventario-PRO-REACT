import React from "react";

const ModalMessage = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="modal-overlay absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      />
      <div className="modal-content bg-white text-black rounded-lg p-6">
        <button
          className="btn btn prymary absolute top-3 right-3 text-xl"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-xl text-center">{message}</h2>
      </div>
    </div>
  );
};

export default ModalMessage;
