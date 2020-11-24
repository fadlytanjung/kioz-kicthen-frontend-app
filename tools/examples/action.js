import fetch from '../../utils/fetch';
import { SERVICES } from '../../configs';
import { ACTIONS } from '../../constants';
import { getToken } from '../../utils/common';

export function fetchData() {
  return dispatch => {
    const options = {
      method: 'get',
      url: `${SERVICES.NEW_COMPONENT}`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    };

    dispatch(loadingAction());

    fetch(options)
      .then(res => {
        dispatch(dataFetchedAction(res));
        dispatch(doneLoadingAction());
      })
      .catch(() => {
        dispatch(dataFetchedAction(null));
        dispatch(doneLoadingAction());
      });
  };
}

function loadingAction() {
  return { type: ACTIONS.LOADING };
}

function dataFetchedAction(data) {
  return {
    type: ACTIONS.NEW_COMPONENT_FETCH,
    data,
  };
}

function doneLoadingAction() {
  return { type: ACTIONS.DONE_LOADING };
}
