import { ACTIONS } from '../constants';

const initialState = {
  isLogin: false,
  data: {},
  messageError: '',
};

export default function reducer(state = initialState, action) {
  const { type, data, messageError, isLogin } = action;

  switch (type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        data,
        isLogin,
        messageError,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
}