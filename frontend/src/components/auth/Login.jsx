import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alertActions';
import { login, clearError } from '../../redux/actions/authActions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector(state => state.authReducer);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('Please enter all fields');
    } else {
      const formData = { email, password };
      dispatch(login(formData));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error && error.msg === 'Invalid credentials') {
      dispatch(setAlert(error.msg, 'danger'));
      dispatch(clearError());
    }
  }, [error, isAuthenticated]);

  return (
    <div className="pt-5">
      <h1 className="text-center">
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mb3">
          <label htmlFor="email" className="from-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb3">
          <label htmlFor="password" className="from-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            className="form-control"
            id="password"
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
