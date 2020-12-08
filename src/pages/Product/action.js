import React from 'react';
import { ACTIONS, product } from '../../constants';
import { action } from './index';

export function fetchData(id) {
  return dispatch => {
    if (id) {
      dispatch({
        type: ACTIONS.FETCH_PRODUCT,
        detail: { ...product.filter(el => el.id === id)[0] }
      });
    } else {
      dispatch({
        type: ACTIONS.FETCH_PRODUCT,
        detail: {},
      });
      dispatch({
        type: ACTIONS.FETCH_PRODUCTS,
        product: [...product.map(obj => {
          delete obj['display_price'];
          delete obj['display_full_price'];
          return {
            ...obj,
            image: <img src={obj.image} />,
            action: action(obj)
          };
        })]
      });
    }
  };
}
