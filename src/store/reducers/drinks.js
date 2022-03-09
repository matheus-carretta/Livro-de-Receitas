import { FETCH_DRINKS } from '../../services/constants';

const INITIAL_STATE = [];

const drinks = (state = INITIAL_STATE, actions) => {
  const { type, payload } = actions;
  switch (type) {
  case FETCH_DRINKS:
    return payload;
  default:
    return state;
  }
};

export default drinks;
