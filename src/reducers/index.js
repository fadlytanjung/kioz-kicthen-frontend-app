import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import cart from './cart';
import product from '../pages/Home/reducer';

const rootReducer = combineReducers({
  cart,
  form: formReducer,
  product,
  routing: routerReducer,
});

export default rootReducer;
