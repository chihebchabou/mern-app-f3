import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../../redux/actions/authActions';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <ContactForm />
        </div>
        <div className="col">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default Home;
