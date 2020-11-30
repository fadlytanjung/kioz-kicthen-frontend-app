import { ACTIONS } from '../constants';

const initialState = {
  cart: [],
};

export default function reducer(state = initialState, action) {
  const { type, cart } = action;

  switch (type) {
    case ACTIONS.ADD_CART:
      return {
        ...state,
        cart,
      };
    default:
      return state;
  }
}
