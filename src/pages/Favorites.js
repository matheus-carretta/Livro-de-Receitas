import React, { useState, useEffect } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import { removeFavorite } from '../services/functions';

function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipeFilter, setFilter] = useState('all');

  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredRecipes = getFavorites.filter((recipe) => {
      if (recipeFilter === 'food' && recipe.type === 'food') return recipe;
      if (recipeFilter === 'drink' && recipe.type === 'drink') return recipe;
      if (recipeFilter === 'all') return recipe;
      return null;
    });
    setFavoriteRecipes(filteredRecipes);
  }, [recipeFilter]);

  const removeRecipeFavorite = (id) => {
    const newFavoriteArray = favoriteRecipes.filter((item) => item.id !== id);
    removeFavorite(id);
    setFavoriteRecipes(newFavoriteArray);
  };

  return (
    <>
      <Header title="Favorite Recipes" isSearch={ false } />
      <div>
        <form>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilter('all') }
          >
            All
          </button>

          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setFilter('food') }
          >
            Food
          </button>

          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilter('drink') }
          >
            Drinks
          </button>
        </form>
        {favoriteRecipes.map((data, index) => (
          <FavoriteCard
            key={ index }
            index={ index }
            recipe={ data }
            removeFavorite={ () => removeRecipeFavorite(data.id) }
          />
        )) }
      </div>
    </>
  );
}

export default Favorites;
