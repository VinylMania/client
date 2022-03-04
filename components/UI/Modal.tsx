import React from 'react'
import {Modal as ModalMantine} from '@mantine/core'

const Modal: React.FC<{
  closeModal: () => void
  isOpen: boolean
}> = ({isOpen, closeModal, children}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen">
          <ModalMantine
            overlayOpacity={0}
            padding={16}
            styles={{
              body: {backgroundColor: 'transparent'},
              header: {backgroundColor: 'transparent', margin: '0px'},
              modal: {
                border: '2px solid white',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              },
              close: {color: 'white'},
              inner: {
                backdropFilter: 'blur(4px)',
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
              },
            }}
            size="40%"
            opened={isOpen}
            onClose={closeModal}
          >
            <div className="bg-black/35 p-8">{children}</div>
          </ModalMantine>
        </div>
      )}
    </>
  )
}

export default Modal
