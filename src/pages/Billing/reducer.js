import { ACTIONS } from '../../constants';

const initialState = {
  product: [],
};

export default function reducer(state = initialState, action) {
  const { type, product } = action;

  switch (type) {
    case ACTIONS.FETCH_PRODUCTS:
      return {
        ...state,
        product,
      };
    default:
      return state;
  }
}
