import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  clearCurrent,
  updateContact,
} from '../../redux/actions/contactActions';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const { current } = useSelector(state => state.contactReducer);

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) dispatch(addContact(contact));
    else dispatch(updateContact(contact));
    clearAll();
  };

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current]);

  const clearAll = () => {
    if (current !== null) {
      dispatch(clearCurrent());
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>{current ? 'Edit' : 'Add'} Contact</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={name}
          onChange={onChange}
          id="name"
          aria-describedby="emailHelp"
          placeholder="Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={email}
          onChange={onChange}
          id="email"
          aria-describedby="emailHelp"
          placeholder="Email"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="text"
          className="form-control"
          name="phone"
          value={phone}
          onChange={onChange}
          id="phone"
          aria-describedby="emailHelp"
          placeholder="Phone"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="radio"
          name="type"
          value="professional"
          className="form-check-input"
          checked={type === 'professional'}
          onChange={onChange}
        />
        Professional
      </div>
      <div className="mb-3 form-check">
        <input
          type="radio"
          name="type"
          value="personal"
          className="form-check-input"
          checked={type === 'personal'}
          onChange={onChange}
        />
        Personal
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          {current ? 'Update' : 'Add'} Contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;