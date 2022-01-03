/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const ModalBackground: React.FC<{closeModal: () => void}> = ({
  children,
  closeModal,
}) => (
  <div onClick={() => closeModal()} className="modal">
    <div onClick={e => e.stopPropagation()} className="modal-content">
      {children}
    </div>
  </div>
)
const Modal: React.FC<{closeModal: () => void; isOpen: boolean}> = ({
  isOpen,
  closeModal,
  children,
}) => {
  const modalRef = document.getElementById('modal')
  return (
    <>
      {isOpen &&
        modalRef &&
        ReactDOM.createPortal(
          <ModalBackground closeModal={closeModal}>
            {children}{' '}
          </ModalBackground>,
          modalRef,
        )}
    </>
  )
}
export default Modal
