import { ACTIONS } from '../../constants';

const initialState = {
  data: null,
};

export default function reducer(state = initialState, action) {
  const { NEW_COMPONENT_FETCH } = ACTIONS;
  const { type, data } = action;

  switch (type) {
    case NEW_COMPONENT_FETCH:
      return {
        ...state,
        data,
      };
    default:
      return state;
  }
}
