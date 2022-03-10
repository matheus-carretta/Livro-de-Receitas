import { foodsCategoriesAPI, foodDetailsAPI, drinksAPI, foodsAPI, drinkDetailsAPI,
} from '../../services/APIs';
import { FETCH_FOODS, FETCH_RECIPE_DETAILS, FETCH_RECOMMENDATIONS,
} from '../../services/constants';

// Actions Creators

export const getFoodsCategories = (payload) => ({
  type: FETCH_FOODS,
  payload,
});

export const getRecipeDetails = (payload) => ({
  type: FETCH_RECIPE_DETAILS,
  payload,
});

export const getRecommendation = (payload) => ({
  type: FETCH_RECOMMENDATIONS,
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

export function getRecipeDetailsThunk(recipeId, type) {
  return async (dispatch) => {
    try {
      const recipeType = type === 'meals' ? foodDetailsAPI : drinkDetailsAPI;
      const response = await recipeType(recipeId);
      dispatch(getRecipeDetails(response[type][0]));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getRecommendationThunk(type) {
  return async (dispatch) => {
    try {
      const recipeType = type === 'meals' ? foodsAPI : drinksAPI;
      const response = await recipeType();
      dispatch(getRecommendation(response[type]));
    } catch (error) {
      console.log(error);
    }
  };
}
