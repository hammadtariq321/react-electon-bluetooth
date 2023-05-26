import React, { useState } from "react";
import "./Modal.css";
import CloseCircleSVG from "../../SVGS/CloseCircleSVG";

const SimpleModal = ({
  children,
  isOpen,
  onClose,
  closeIconRequired = true,
  className = "",
}) => {
  const [playButtonModalIsOpen, setPlayButtonModalIsOpen] = useState(false);
  return (
    isOpen && (
      <div
        className="main-modal fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster bg-black"
        style={{ background: "rgba(0,0,0,.7)" }}
      >
        <div className="modal-container bg-black  md:w-[450px] max-w-lg mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
          <div
            className={`modal-content text-left px-6 text-white ${className}`}
          >
            {/* Header */}
            {closeIconRequired && (
              <div className="flex justify-end items-center m-5">
                <CloseCircleSVG onClick={() => onClose()} />
              </div>
            )}
            {/* Body */}
            {children}
          </div>
        </div>
      </div>
    )
  );
};

export default SimpleModal;
