import Link from 'next/link'
import NavbarAuthenticated from '../../components/Navbar/NavbarAuthenticated'
import NavbarOffline from '../../components/Navbar/NavbarOffline'
import AuthContext from '../../context/auth-context'

const Navbar: React.FC = () => {
  return (
    <>
      <header className="relative isolate z-10 h-full w-full bg-buttonText text-black drop-shadow-xl md:fixed md:h-16">
        <nav className="m-auto flex h-full max-w-4xl flex-col items-baseline gap-x-8 md:flex-row md:items-center">
          <Link href="/">
            <a className="navlink text-3xl font-bold before:bg-current md:mr-auto">
              Accueil
            </a>
          </Link>
          <Link href="/library">
            <a className="navlink before:bg-current">Bibliothèque</a>
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
