import Link from 'next/link'
import NavbarAuthenticated from '../../components/Navbar/NavbarAuthenticated'
import NavbarOffline from '../../components/Navbar/NavbarOffline'
import {useContext} from 'react'
import AuthContext from '../../context/auth-context'

const Navbar: React.FC = () => {
  return (
    <>
      <header className="relative md:fixed w-full isolate z-10 bg-buttonText text-heading drop-shadow-xl h-full md:h-16">
        <nav className="max-w-4xl m-auto flex flex-col justify-center items-center md:flex-row gap-4 py-2 md:justify-end">
          <Link href="/">
            <a className="navlink md:mr-auto text-3xl font-bold">Accueil</a>
          </Link>
          <Link href="/library">
            <a className="navlink">Bibliothèque</a>
          </Link>
          <AuthContext.Consumer>
            {ctx => {
              return (
                <>
                  {ctx.isAuthenticated && (
                    <NavbarAuthenticated user={ctx.user} logout={ctx.logout} />
                  )}
                  {!ctx.isAuthenticated && <NavbarOffline />}
                </>
              )
            }}
          </AuthContext.Consumer>
        </nav>
      </header>
      <div className="mb-0 md:mb-16" />
    </>
  )
}

export default Navbar
