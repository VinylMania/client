import React from 'react';
import { useAppSelector } from '../../hooks';

const Homepage: React.FC = () => {
  const users = useAppSelector((state) => state.root.authReducer);

  const { isAuthenticated } = users;
  return (
    <div>
      <p>Hello this is the homepage</p>
      <h2>
        You are {isAuthenticated ? 'authenticated !' : 'not authenticated !'}
      </h2>
    </div>
  );
};

export default Homepage;
