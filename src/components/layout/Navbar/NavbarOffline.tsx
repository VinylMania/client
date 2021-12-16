import React from 'react'
import {Link} from 'react-router-dom'

const NavbarOffline: React.FC = () => (
  <>
    <Link className="text-gray-50 hover:underline p-2" to="/register">
      <p>S&apos;inscrire</p>
    </Link>
    <Link className="text-gray-50 hover:underline p-2" to="/login">
      <p>Se connecter</p>
    </Link>
  </>
)

export default NavbarOffline
