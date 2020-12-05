import { ACTIONS } from '../../../../constants';

export default function _checkout(){
  return dispatch => {
    dispatch({
      type: ACTIONS.CHECKOUT,
      data: [],
    });
  };
}
