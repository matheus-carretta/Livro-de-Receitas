import { foodsCategoriesAPI, foodDetailsAPI, drinksAPI } from '../../services/APIs';
import { FETCH_FOODS, FETCH_FOOD_DETAILS, FETCH_DRINKS } from '../../services/constants';

// Actions Creators

export const getFoodsCategories = (payload) => ({
  type: FETCH_FOODS,
  payload,
});

export const getFoodDetails = (payload) => ({
  type: FETCH_FOOD_DETAILS,
  payload,
});

export const getDrinks = (payload) => ({
  type: FETCH_DRINKS,
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

export function getFoodDetailsThunk(recipeId) {
  return async (dispatch) => {
    try {
      const response = await foodDetailsAPI(recipeId);
      dispatch(getFoodDetails(response.meals[0]));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDrinksThunk() {
  return async (dispatch) => {
    try {
      const response = await drinksAPI();
      dispatch(getDrinks(response.drinks));
    } catch (error) {
      console.log(error);
    }
  };
}
