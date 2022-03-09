import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchRandomFoodOrDrinks } from '../services/foodsCategoriesAPI';

function ExploreDrinks() {
  const history = useHistory();

  const getRandomId = async (args) => {
    const data = await fetchRandomFoodOrDrinks(args);
    const id = data.drinks[0].idDrink;
    history.push(`/drinks/${id}`);
  };

  return (
    <div>
      <Link to="/explore/drinks/ingredients">
        <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => getRandomId('thecocktaildb') }
      >
        Surprise me!
      </button>
    </div>
  );
}

export default ExploreDrinks;
