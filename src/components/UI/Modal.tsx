/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const ModalBackground: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => (
  <div
    onClick={() => closeModal()}
    className="left-0 top-0 z-10 fixed bg-black opacity-30 h-full w-full"
  />
);

const ModalContent: React.FC = ({ children }) => (
  <div className="bg-first rounded-lg fixed z-20 p-36  w-36 h-36">
    {children}
  </div>
);

const Modal: React.FC<{ closeModal: () => void; isOpen: boolean }> = ({
  isOpen,
  closeModal,
  children,
}) => {
  const modalRef = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  return (
    <>
      {isOpen &&
        modalRef &&
        ReactDOM.createPortal(
          <ModalBackground closeModal={closeModal} />,
          modalRef,
        )}

      {isOpen &&
        modalContent &&
        ReactDOM.createPortal(
          <ModalContent>{children}</ModalContent>,
          modalContent,
        )}
    </>
  );
};
export default Modal;
