import { FETCH_RECOMMENDATIONS } from '../../services/constants';

const INITIAL_STATE = [];

const recommendations = (state = INITIAL_STATE, actions) => {
  const { type, payload } = actions;
  switch (type) {
  case FETCH_RECOMMENDATIONS:
    return payload;
  default:
    return state;
  }
};

export default recommendations;
