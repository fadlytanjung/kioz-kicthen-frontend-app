import { ACTIONS } from '../../constants';

const initialState = {
  prediction: [],
};

export default function reducer(state = initialState, action) {
  const { type, prediction } = action;

  switch (type) {
    case ACTIONS.FETCH_PREDICTIONS:
      return {
        ...state,
        prediction,
      };
    default:
      return state;
  }
}
