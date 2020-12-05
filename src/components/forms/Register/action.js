import { ACTIONS } from '../../../constants';

export function addUser(data) {
  return dispatch => {
    dispatch({ type: ACTIONS.LOADING });
    dispatch({
      type: ACTIONS.ADD_USER,
      user: data,
    });
    dispatch({ type: ACTIONS.DONE_LOADING });
  };
}
