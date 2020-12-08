import { ACTIONS } from '../constants';

const initialState = {
  order: [],
  detail: {},
};

export default function reducer(state = initialState, action) {
  const { type, order, detail } = action;

  switch (type) {
    case ACTIONS.FETCH_ORDERS:
      return {
        ...state,
       order,
       detail: {},
      };
    case ACTIONS.FETCH_ORDER:
      return {
        ...state,
        detail,
      };
    default:
      return state;
  }
}