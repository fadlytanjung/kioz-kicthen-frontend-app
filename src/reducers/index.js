import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import cart from './cart';
import detail from '../pages/Detail/reducer';
import loading from './loading';
import product from '../pages/Home/reducer';
import user from './user';

const rootReducer = combineReducers({
  auth,
  cart,
  detail,
  loading,                                                                                                               
  form: formReducer,
  product,
  routing: routerReducer,
  user,
});

export default rootReducer;
