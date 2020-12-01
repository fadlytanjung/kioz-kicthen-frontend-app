import { ACTIONS, product } from '../../constants';

export function getDetail(slug) {
  return dispatch => {
    dispatch({
      type: ACTIONS.FETCH_PRODUCT,
      detail: { ...product.filter(el=>el.slug===slug)[0] }
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
