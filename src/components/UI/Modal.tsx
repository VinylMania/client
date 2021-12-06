/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const ModalBackground: React.FC<{closeModal: () => void}> = ({
  children,
  closeModal,
}) => (
  <div
    onClick={() => closeModal()}
    className="left-0 top-0 z-10 fixed flex bg-black bg-opacity-30 h-full w-full"
  >
    <div
      onClick={e => e.stopPropagation()}
      className="overflow-auto select-none bg-first rounded-lg max-w-5xl max-h-full m-auto p-8"
    >
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
