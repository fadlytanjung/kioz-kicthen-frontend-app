import { ACTIONS } from '../constants';

const initialState = {
  user: [],
  detail: {}
};

export default function reducer(state = initialState, action) {
  const { type, user, detail } = action;

  switch (type) {
    case ACTIONS.FETCH_USERS:
      return {
        ...state,
        user,
      };
    case ACTIONS.FETCH_USER:
      return {
        ...state,
        detail,
      };
    case ACTIONS.ADD_USER:
      return {
        ...state,
        user: [...state.user,user],
      };
    default:
      return state;
  }
}