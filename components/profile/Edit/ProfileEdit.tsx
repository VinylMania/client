import React from 'react'
import Modal from '../../UI/Modal'
import UploadAvatar from './UploadAvatar'

const ProfileEdit: React.FC<{
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}> = ({isOpen, openModal, closeModal}) => (
  <div className="pb-4">
    <button className="btn-submit" type="button" onClick={() => openModal()}>
      Modifier l&apos;avatar
    </button>
    <Modal closeModal={closeModal} isOpen={isOpen}>
      <UploadAvatar closeModal={closeModal} />
    </Modal>
  </div>
)

export default ProfileEdit
