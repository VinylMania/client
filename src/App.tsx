import React, {useEffect} from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {store} from '../store'

// Components
import Alerts from '../components/Alerts/Alerts'
import Navbar from '../components/Navbar/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Homepage from './components/homepage/Homepage'
import {loadUser} from '../actions/auth'
import AddVinyl from './components/AddVinyl/AddVinyl'
import Libraries from './components/Library/Libraries'
import UserProfile from './components/profile/UserProfile'
import Footer from '../components/Footer/Footer'
import PrivateRoute from '../components/Navbar/PrivateRoute'
import OfflineRoute from '../components/Navbar/routing/OfflineRoute'

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alerts />
        <Routes>
          <Route element={<OfflineRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<Homepage />} />

          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/users/:userId/:albumId" element={<UserProfile />} />
          <Route path="/library" element={<Libraries />} />
          <Route element={<PrivateRoute />}>
            <Route path="/add-vinyl" element={<AddVinyl />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </Provider>
  )
}

export default App
