import { ACTIONS, prediction } from '../../constants';

export function fetchData(id) {
  return dispatch => {
    if (id) {
      dispatch({
        type: ACTIONS.FETCH_REPORT,
        detail: { ...prediction.filter(el => el.predictionId === id)[0] }
      });
    } else {
      dispatch({
        type: ACTIONS.FETCH_REPORT,
        detail: {},
      });
      dispatch({
        type: ACTIONS.FETCH_PREDICTIONS,
        prediction: [...prediction]
      });
    }
  };
}
