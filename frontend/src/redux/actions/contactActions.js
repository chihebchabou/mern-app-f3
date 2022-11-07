import axios from 'axios';
import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  CONTACT_ERROR,
  DELETE_CONTACT,
  GET_CONTACTS,
  SET_CURRENT,
  UPDATE_CONTACT,
} from './types';

// Get contacts
export const getContacts = () => async dispatch => {
  const config = {};
  if (localStorage.token) {
    config.headers = { authorization: `Bearer ${localStorage.token}` };
  }

  try {
    const res = await axios.get('/api/contacts', config);
    dispatch({ type: GET_CONTACTS, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data });
  }
};

// Add Contact
export const addContact = contact => async dispatch => {
  const config = {};
  if (localStorage.token) {
    config.headers = {
      authorization: `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json',
    };
  }

  try {
    const res = await axios.post('/api/contacts', contact, config);
    console.log(res.data);
    dispatch({ type: ADD_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data });
  }
};

// Set Current Contact
export const setCurrent = contact => ({ type: SET_CURRENT, payload: contact });

// Clear Current
export const clearCurrent = () => ({ type: CLEAR_CURRENT });

// Update Contact
export const updateContact = contact => async dispatch => {
  const config = {};
  if (localStorage.token) {
    config.headers = {
      authorization: `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json',
    };
  }

  try {
    const res = await axios.put(
      `/api/contacts/${contact._id}`,
      contact,
      config
    );
    console.log(res.data);
    dispatch({ type: UPDATE_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data });
  }
};

// Delete Contact
export const deleteContact = id => async dispatch => {
  const config = {};
  if (localStorage.token) {
    config.headers = {
      authorization: `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json',
    };
  }

  try {
    const res = await axios.delete(`/api/contacts/${id}`, config);
    console.log(res.data);
    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.data });
  }
};
