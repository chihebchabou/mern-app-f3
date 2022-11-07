import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, register } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alertActions';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector(state => state.authReducer);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      alert('Please enter all fields');
    } else if (password !== password2) {
      alert('Password do not match');
    } else {
      const formData = { name, email, password };
      dispatch(register(formData));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      dispatch(setAlert(error.msg, 'danger'));
      dispatch(clearError());
    }
  }, [error, isAuthenticated]);

  return (
    <div className="pt-5">
      <h1 className="text-center">
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="mb3">
          <label htmlFor="name" className="from-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="form-control"
            id="name"
          />
        </div>
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
        <div className="mb3">
          <label htmlFor="password" className="from-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            className="form-control"
            id="password2"
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
