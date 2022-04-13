import Image from 'next/image'
import Link from 'next/link'
import NavbarAuthenticated from '../../components/Navbar/NavbarAuthenticated'
import NavbarOffline from '../../components/Navbar/NavbarOffline'
import AuthContext from '../../context/auth-context'

const Navbar: React.FC = () => {
  return (
    <div className="bg-buttonText">
      <header className="fixed isolate z-10 h-fit w-full bg-buttonText text-black drop-shadow-xl md:fixed ">
        <nav className="m-auto flex h-fit max-w-5xl flex-col items-center gap-x-8 py-2 leading-normal md:flex-row">
          {/* <Link href="/">
            <a className="navlink text-3xl font-bold before:bg-current md:mr-auto">
              Accueil
            </a>
          </Link> */}
          <Link href="/" passHref>
            <button
              aria-describedby="Accueil"
              className="relative h-[80px] w-[80px] md:mr-auto"
            >
              <Image
                src="/logo.png"
                alt="vinylmania logo"
                width={80}
                height={80}
                layout="fill"
                objectFit="cover"
                quality={75}
              />
            </button>
          </Link>
          <Link href="/users">
            <a className="navlink before:bg-current">Utilisateurs</a>
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
      <div className="mb-28 w-full bg-white" />
    </div>
  )
}

export default Navbar
