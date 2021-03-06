import { FETCH_RECIPE_DETAILS } from '../../services/constants';

const INITIAL_STATE = {};

const recipeDetails = (state = INITIAL_STATE, actions) => {
  const { type, payload } = actions;
  switch (type) {
  case FETCH_RECIPE_DETAILS:
    return payload;
  default:
    return state;
  }
};

export default recipeDetails;
