import axios from 'axios';
import {
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from './types';

export const loadUser = formData => async dispatch => {
  const config = {};
  if (localStorage.token) {
    config.headers = { authorization: `Bearer ${localStorage.token}` };
  }

  try {
    const res = await axios.get('/api/users/me', config);
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register = formData => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const res = await axios.post('/api/users', formData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data });
  }
};

export const login = formData => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const res = await axios.post('/api/users/login', formData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data });
  }
};

export const logout = () => {
  return { type: LOGOUT };
};

export const clearError = () => {
  return { type: CLEAR_ERRORS };
};
