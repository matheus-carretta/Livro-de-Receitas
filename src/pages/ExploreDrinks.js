import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
      <Header title="Explore Drinks" isSearch={ false } />
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
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
