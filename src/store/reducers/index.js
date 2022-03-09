import { combineReducers } from 'redux';
import foodsCategories from './foodsCategories';
import foodDetails from './foodDetails';
import drinks from './drinks';

const rootReducer = combineReducers({ foodsCategories, foodDetails, drinks });

export default rootReducer;
