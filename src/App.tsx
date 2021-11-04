import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/css/app.css';
import { store } from './store';

// Components
import Alerts from './components/layout/Alerts';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Homepage from './components/homepage/Homepage';
import { loadUser } from './actions/auth';
import Artists from './components/artists/Artists';
import Albums from './components/albums/Albums';
import AddVinyl from './components/AddVinyl/AddVinyl';

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alerts />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Homepage} />
        <Route exact path="/artists" component={Artists} />
        <Route exact path="/albums" component={Albums} />
        <Route exact path="/add-vinyl" component={AddVinyl} />
      </Router>
    </Provider>
  );
};

export default App;
