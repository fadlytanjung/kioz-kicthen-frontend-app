import { ACTIONS, product, user } from '../../constants';

export function fetchData() {
  return dispatch => {
    dispatch({
      type: ACTIONS.FETCH_PRODUCTS,
      product: [...product]
    });
  };
}

export function fetchUser() {
  return dispatch => {
    dispatch({
      type: ACTIONS.FETCH_USERS,
      user: [...user]
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
