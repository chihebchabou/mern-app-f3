import { combineReducers } from 'redux';

import authReducer from './authReducer';
import alertReducer from './alertReducer';
import contactReducer from './contactReducer';

export default combineReducers({
  authReducer,
  contactReducer,
  alertReducer,
});
