import {useAppSelector} from '../../hooks'
import {UserModel} from '../../models/userModel'
import Link from 'next/link'
import NavbarAuthenticated from '../../components/Navbar/NavbarAuthenticated'
import NavbarOffline from '../../components/Navbar/NavbarOffline'

const Navbar: React.FC = () => {
  const authReducer: {
    isAuthenticated: boolean
    loading: boolean
    user: UserModel
  } = useAppSelector(state => state.root.authReducer)
  const isAuth = authReducer.isAuthenticated

  return (
    <header className="bg-second">
      <nav className="flex justify-center items-center">
        <Link href="/">
          <a className="text-2xl font-bold text-white p-2 hover:underline">
            Accueil
          </a>
        </Link>
        <ul className="items-end flex flex-row justify-end flex-nowrap">
          <Link href="/library">
            <a className="text-gray-50 hover:underline p-2">Bibliothèque</a>
          </Link>
          {isAuth && <NavbarAuthenticated authReducer={authReducer} />}
          {!isAuth && <NavbarOffline />}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar