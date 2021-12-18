import React from 'react'
import CustomLink from '../CustomLink'

const NavbarOffline: React.FC = () => (
  <>
    <CustomLink className="text-gray-50 hover:underline p-2" to="/register">
      <p>S&apos;inscrire</p>
    </CustomLink>
    <CustomLink className="text-gray-50 hover:underline p-2" to="/login">
      <p>Se connecter</p>
    </CustomLink>
  </>
)

export default NavbarOffline
