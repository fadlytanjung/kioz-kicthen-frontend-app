import React from 'react';
import { ACTIONS, product, user } from '../../constants';
import { action } from './index';

export function fetchData() {
  return dispatch => {
    
    dispatch({
      type: ACTIONS.FETCH_PRODUCTS,
      product: [...product.map(obj => { 
        delete obj['display_price'];
        delete obj['display_full_price'];
        return {
          ...obj,
          image: <img src={obj.image} />,
          action: action(obj) }
      }),]
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
