import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/layout/Alerts';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/authActions';
import PrivateRoutes from './components/routing/PrivateRoutes';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
    }
  }, []);
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Alerts />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
