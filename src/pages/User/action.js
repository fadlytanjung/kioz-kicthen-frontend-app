import { ACTIONS, user } from '../../constants';
import { action } from './index';

export function fetchData(id) {
  return dispatch => {
    if (id) {
      dispatch({
        type: ACTIONS.FETCH_USER,
        detail: { ...user.filter(el => el.id === id)[0] }
      });
    } else {
      dispatch({
        type: ACTIONS.FETCH_USER,
        detail: {},
      });
      dispatch({
        type: ACTIONS.FETCH_USERS,
        user: [...user.map(obj => {
          return {
            ...obj,
            action: action(obj)
          };
        })]
      });
    }
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
