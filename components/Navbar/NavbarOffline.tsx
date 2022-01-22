import React from 'react'
import Link from 'next/link'

const NavbarOffline: React.FC = () => (
  <>
    <Link href="/auth/register">
      <a className="navlink">S&apos;inscrire</a>
    </Link>
    <Link href="/auth/login">
      <a className="navlink">Se connecter</a>
    </Link>
  </>
)

export default NavbarOffline
