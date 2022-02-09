import Link from 'next/link'
import NavbarAuthenticated from '../../components/Navbar/NavbarAuthenticated'
import NavbarOffline from '../../components/Navbar/NavbarOffline'
import {useContext} from 'react'
import AuthContext from '../../context/auth-context'

const Navbar: React.FC = () => {
  return (
    <>
      <header className="text-heading relative isolate z-10 h-full w-full bg-buttonText drop-shadow-xl md:fixed md:h-16">
        <nav className="m-auto flex max-w-4xl flex-col items-center justify-center gap-4 py-2 md:flex-row md:justify-end">
          <Link href="/">
            <a className="navlink text-3xl font-bold md:mr-auto">Accueil</a>
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
