import { ACTIONS } from '../../constants';

const initialState = {
  report: [],
  detail: {},
};

export default function reducer(state = initialState, action) {
  const { type, report, detail } = action;

  switch (type) {
    case ACTIONS.FETCH_REPORTS:
      return {
        ...state,
        report,
      };
    case ACTIONS.FETCH_REPORT:
      return {
        ...state,
        detail,
      };
    default:
      return state;
  }
}
