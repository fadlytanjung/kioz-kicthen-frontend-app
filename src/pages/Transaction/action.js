import { ACTIONS, transaction } from '../../constants';

export function fetchData(id) {
  return dispatch => {
    if (id) {
      dispatch({
        type: ACTIONS.FETCH_REPORT,
        detail: { ...transaction.filter(el => el.transactionId === id)[0] }
      });
    } else {
      dispatch({
        type: ACTIONS.FETCH_REPORT,
        detail: {},
      });
      dispatch({
        type: ACTIONS.FETCH_REPORTS,
        report: [...transaction]
      });
    }
  };
}
