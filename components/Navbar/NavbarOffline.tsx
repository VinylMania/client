import React, {useState} from 'react'
import Modal from '../UI/Modal'
import LoginForm from '../Auth/LoginForm'
import RegisterForm from '../Auth/RegisterForm'
import {flushSync} from 'react-dom'

const NavbarOffline: React.FC = () => {
  const [isLoginOpen, toggleLogin] = useState(false)
  const [isRegisterOpen, toggleRegister] = useState(false)
  return (
    <>
      <button
        onClick={() => {
          flushSync(() => {
            toggleLogin(false)
          })
          toggleRegister(true)
        }}
        className="navlink"
      >
        S&apos;inscrire
      </button>

      <button
        onClick={() => {
          flushSync(() => {
            toggleRegister(false)
          })
          toggleLogin(true)
        }}
        className="navlink"
      >
        Se connecter
      </button>
      <Modal isOpen={isRegisterOpen} closeModal={() => toggleRegister(false)}>
        <RegisterForm />
      </Modal>
      <Modal isOpen={isLoginOpen} closeModal={() => toggleLogin(false)}>
        <LoginForm />
      </Modal>
    </>
  )
}

export default NavbarOffline
