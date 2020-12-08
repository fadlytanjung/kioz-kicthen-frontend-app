import { ACTIONS, order } from '../../constants';
import { action } from './index';

export function fetchData(id) {
  return dispatch => {
    if (id) {
      dispatch({
        type: ACTIONS.FETCH_ORDER,
        detail: { ...order.filter(el => el.orderId === id)[0] }
      });
    } else {
      dispatch({
        type: ACTIONS.FETCH_ORDER,
        detail: {},
      });
      dispatch({
        type: ACTIONS.FETCH_ORDERS,
        order: [...order.map(obj => {
          return {
            ...obj,
            open: false,
            action: action(obj)
          };
        })]
      });
    }
  };
}

export function updateData(data) {
  return dispatch => {
    dispatch({
      type: ACTIONS.FETCH_ORDERS,
      order: [...data]
    });
  };
}
