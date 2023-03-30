import { useState } from "react";

const Modal = ({ open, setOpen, children }) => {
  const [showModal, setShowModal] = useState(open);

  const overlayClass = `fixed inset-0 z-50 ${
    showModal ? "block" : "hidden"
  }`;

  const modalClass = `fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
    showModal ? "block" : "hidden"
  } bg-gray-800 rounded-md shadow-lg`;

  return (
    <div className={overlayClass}>
      {/* <div
        className="fixed inset-0 bg-gray-900 opacity-75"
        onClick={handleClose}
      ></div> */}
      <div className={modalClass}>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
