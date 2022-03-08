import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchRandomFoodOrDrinks } from '../services/foodsCategoriesAPI';

function ExploreFoods() {
  const history = useHistory();

  const getRandomId = async (args) => {
    const data = await fetchRandomFoodOrDrinks(args);
    const id = data.meals[0].idMeal;
    history.push(`/foods/${id}`);
  };

  return (
    <div>
      <Link to="/explore/foods/ingredients">
        <button type="button" data-testid="explore-by-ingredient">By Ingredient</button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button type="button" data-testid="explore-by-nationality">By Nationality</button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => getRandomId('themealdb') }
      >
        Surprise me!
      </button>
    </div>
  );
}

export default ExploreFoods;
