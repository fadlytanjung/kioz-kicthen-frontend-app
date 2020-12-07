import { ACTIONS } from '../../constants';

const initialState = {
  product: [],
  detail: {},
};

export default function reducer(state = initialState, action) {
  const { type, product, detail } = action;

  switch (type) {
    case ACTIONS.FETCH_PRODUCTS:
      return {
        ...state,
        product,
      };
    case ACTIONS.FETCH_PRODUCT:
      return {
        ...state,
        detail,
      };
    default:
      return state;
  }
}
