import { ACTIONS, product } from '../../constants';

export function fetchData() {
  return dispatch => {
    dispatch({
      type: ACTIONS.FETCH_PRODUCT,
      product: [...product]
    });
  };
}

export function addToCart(data) {
  return dispatch => {
    dispatch({
      type: ACTIONS.ADD_CART,
      cart: [...data]
    });
  };
}
