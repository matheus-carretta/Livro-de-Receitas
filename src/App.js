import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import DrinkDetails from './pages/DrinkDetails';
import FoodDetails from './pages/FoodDetails';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoods from './pages/ExploreFoods';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import Favorites from './pages/Favorites';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './styles/App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/foods/:id" component={ FoodDetails } />
      <Route path="/drinks/:id" component={ DrinkDetails } />
      <Route path="/recipe-in-progress" component={ RecipeInProgress } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route path="/explore/drinks/ingredients" component={ ExploreDrinksIngredients } />
      <Route path="/explore/foods/ingredients" component={ ExploreFoodsIngredients } />
      <Route
        path="/explore/foods/nationalities"
        component={ ExploreFoodsNationalities }
      />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ Favorites } />
      <Route path="/foods/:id" component={ FoodsDetails } />
      <Route path="/drinks/:id" component={ FoodsDetails } />
    </Switch>
  );
}
