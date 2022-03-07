import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CurrentDrinkRecipe from './pages/CurrentDrinkRecipe';
import CurrentFoodRecipe from './pages/CurrentFoodRecipe';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import DrinksDetails from './pages/DrinksDetails';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoods from './pages/ExploreFoods';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import Favorites from './pages/Favorites';
import Foods from './pages/Foods';
import FoodsDetails from './pages/FoodsDetails';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './styles/App.css';

// Remover estas linhas após criar as rotas

console.log(CurrentDrinkRecipe);
console.log(CurrentFoodRecipe);
console.log(DrinksDetails);
console.log(FoodsDetails);

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/explore" component={ Explore } />
      <Route path="/explore/foods" component={ ExploreFoods } />
      <Route path="/explore/drinks" component={ ExploreDrinks } />
      <Route path="/explore/drinks/ingredients" component={ ExploreDrinksIngredients } />
      <Route path="/explore/foods/ingredients" component={ ExploreFoodsIngredients } />
      <Route
        path="/explore/foods/nationalities"
        component={ ExploreFoodsNationalities }
      />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}
