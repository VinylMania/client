import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {MdOutlineClose} from 'react-icons/md'

const ModalBackground: React.FC<{closeModal: () => void}> = ({
  children,
  closeModal,
}) => (
  <div className="fixed isolate z-10 bg-black/50 h-screen w-screen backdrop-blur-md">
    <div
      onClick={() => closeModal()}
      className="flex justify-center w-full h-full items-center py-8"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-black/50 border-2 max-h-[75%] min-h-[200px] overflow-auto border-white rounded-lg select-none w-full max-w-2xl m-auto"
      >
        <div className="flex flex-col w-full">
          <div></div>
          <button
            aria-label="Fermer le modal"
            type="button"
            className="ml-auto p-2"
            onClick={() => closeModal()}
          >
            <MdOutlineClose size={32} />
          </button>
          {children}
        </div>
      </div>
    </div>
  </div>
)
const Modal: React.FC<{
  closeModal: () => void
  isOpen: boolean
}> = ({isOpen, closeModal, children}) => {
  useEffect(() => {
    setModalRef(document.getElementById('modal'))
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])
  const [modalRef, setModalRef] = useState<HTMLElement | null>(null)
  return (
    <>
      {isOpen &&
        modalRef &&
        ReactDOM.createPortal(
          <ModalBackground closeModal={closeModal}>{children}</ModalBackground>,
          modalRef,
        )}
    </>
  )
}

export default Modal
