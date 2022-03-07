import foodsCategoriesAPI from '../../services/foodsCategoriesAPI';
import { FETCH_FOODS } from '../../services/constants';

// Actions Creators

export const getFoods = (payload) => ({
  type: FETCH_FOODS,
  payload,
});

// Export Functions

export function getFoodsCategoriesThunk() {
  return async (dispatch) => {
    try {
      const response = await foodsCategoriesAPI();
      dispatch(getFoods(response.meals));
    } catch (error) {
      console.log(error);
    }
  };
}
