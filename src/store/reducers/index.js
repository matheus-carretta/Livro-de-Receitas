import { combineReducers } from 'redux';
import foodsCategories from './foodsCategories';
import recipeDetails from './recipeDetails';
import recommendations from './recommendations';

const rootReducer = combineReducers({ foodsCategories, recipeDetails, recommendations });

export default rootReducer;
