import { ACTIONS } from '../constants';

const initialState = {
  user: [],
};

export default function reducer(state = initialState, action) {
  const { type, user } = action;

  switch (type) {
    case ACTIONS.FETCH_USERS:
      return {
        ...state,
        user,
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