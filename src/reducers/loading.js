import { ACTIONS } from '../constants';

const initialState = {
  loading: false,
};

export default function reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case ACTIONS.LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.DONE_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}