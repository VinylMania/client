import React from 'react'
import Link from 'next/link'

const NavbarOffline: React.FC = () => (
  <>
    <Link href="/auth/register">
      <a className="text-gray-50 hover:underline p-2">S&apos;inscrire</a>
    </Link>
    <Link href="/auth/login">
      <a className="text-gray-50 hover:underline p-2">Se connecter</a>
    </Link>
  </>
)

export default NavbarOffline
