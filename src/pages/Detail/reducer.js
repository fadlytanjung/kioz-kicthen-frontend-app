import { ACTIONS } from '../../constants';

const initialState = {
  detail: {},
};

export default function reducer(state = initialState, action) {
  const { type, detail } = action;

  switch (type) {
    case ACTIONS.FETCH_PRODUCT:
      return {
        ...state,
        detail,
      };
    default:
      return state;
  }
}
