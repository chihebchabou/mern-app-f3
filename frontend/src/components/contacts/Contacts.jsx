import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/actions/contactActions';
import ContactItem from './ContactItem';

const Contacts = () => {
  const { contacts, loading } = useSelector(state => state.contactReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  if (contacts.length === 0 && !loading) {
    return <h3>Please add a contact</h3>;
  }

  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem key={contact._id} contact={contact} />
      ))}
    </Fragment>
  );
};

export default Contacts;
