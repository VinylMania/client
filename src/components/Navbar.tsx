/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout } from '../actions/auth';

export const Navbar: React.FC = () => {
  const authReducer = useAppSelector((state) => state.root.authReducer);
  const isAuth = authReducer.isAuthenticated;
  const userId = authReducer.user?._id;

  const dispatch = useAppDispatch();

  const authNavbar = (
    <nav className="bg-cyan-700 flex flex-row-reverse flex-nowrap">
      <Link className="text-gray-50 hover:underline p-2" to="/register">
        <p>Register</p>
      </Link>
      <Link className="text-gray-50 hover:underline p-2" to="/login">
        <p>Login</p>
      </Link>
      <Link className="text-gray-50 hover:underline p-2" to="/library">
        <p>Bibliothèque</p>
      </Link>
    </nav>
  );
  const guestNavbar = (
    <nav className="bg-cyan-700 flex flex-row-reverse flex-nowrap">
      <a
        className="text-gray-50 hover:underline p-2"
        href="!#"
        onClick={() => dispatch(logout())}
      >
        <p>Logout</p>
      </a>
      <Link className="text-gray-50 hover:underline p-2" to="/home">
        <p>Homepage</p>
      </Link>
      <Link className="text-gray-50 hover:underline p-2" to={`users/${userId}`}>
        <p>Mon profil</p>
      </Link>
      <Link className="text-gray-50 hover:underline p-2" to="/add-vinyl">
        <p>Add Vinyl</p>
      </Link>
      <Link className="text-gray-50 hover:underline p-2" to="/library">
        <p>Library</p>
      </Link>
    </nav>
  );

  return <>{isAuth ? guestNavbar : authNavbar}</>;
};

export default Navbar;
