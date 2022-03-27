import React, { useState, useEffect } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import { removeFavorite } from '../services/functions';
import { CenterContainer, ButtonContainer, FilterButton,
  Main } from '../styles/DoneRecipes';

function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipeFilter, setFilter] = useState('all');

  useEffect(() => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavorites === null) {
      return [];
    }
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
    <Main>
      <Header title="Favorite Recipes" isSearch={ false } />
      <CenterContainer>
        <ButtonContainer>

          <FilterButton
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setFilter('all') }
          >
            All
          </FilterButton>

          <FilterButton
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setFilter('food') }
          >
            Food
          </FilterButton>

          <FilterButton
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setFilter('drink') }
          >
            Drinks
          </FilterButton>
        </ButtonContainer>

        {favoriteRecipes.map((data, index) => (
          <FavoriteCard
            key={ index }
            index={ index }
            recipe={ data }
            removeFavorite={ () => removeRecipeFavorite(data.id) }
          />
        )) }
      </CenterContainer>
    </Main>
  );
}

export default Favorites;
