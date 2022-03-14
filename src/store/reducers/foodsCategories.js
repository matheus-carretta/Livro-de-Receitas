import { FETCH_FOODS } from '../../services/constants';

const INITIAL_STATE = [];

const foodsCategories = (state = INITIAL_STATE, actions) => {
  const { type, payload } = actions;
  switch (type) {
  case FETCH_FOODS:
    return [
      ...state,
      ...payload,
    ];
  default:
    return state;
  }
};

export default foodsCategories;
