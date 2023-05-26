import React from 'react';
import './Modal.css';

const Modal = ({ children }) => {
  return (
    <div
      className="main-modal fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster bg-black"
      style={{ background: 'rgba(0,0,0,.7)' }}
    >
      <div className="modal-container bg-black min-w-[250px]  md:min-w-[400px] max-w-lg mx-auto rounded-xl shadow-lg z-50 overflow-y-auto">
        <div
          className="modal-content py-4 text-left px-6 text-white"
          style={{ minHeight: '24rem' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
