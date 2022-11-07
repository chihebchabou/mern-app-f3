import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const middlware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
