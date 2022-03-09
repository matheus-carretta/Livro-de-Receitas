import { FETCH_FOOD_DETAILS } from '../../services/constants';

const INITIAL_STATE = {};

const foodDetails = (state = INITIAL_STATE, actions) => {
  const { type, payload } = actions;
  switch (type) {
  case FETCH_FOOD_DETAILS:
    return payload;
  default:
    return state;
  }
};

export default foodDetails;
