import React from 'react';
import { ZERO, MAX_RECOMENDATIONS, MIN_INGREDIENTS, MAX_INGREDIENTS } from './constants';

export const URL = (strYoutube = '') => strYoutube.replace('watch?v=', 'v/');

export const checkFavorite = (id) => {
  console.log(id);
  const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  if (getFavoriteRecipes !== null) {
    return getFavoriteRecipes.find((favorite) => favorite.id === id);
  }
  return false;
};

export const addFavorite = (recipeDetails, type) => {
  const getFavoriteRecipes = localStorage.getItem('favoriteRecipes');

  const {
    [`id${type}`]: id,
    strArea,
    strCategory,
    strAlcoholic,
    [`str${type}`]: name,
    [`str${type}Thumb`]: image,
  } = recipeDetails;

  const newFavoriteRecipe = {
    id,
    type: type === 'Drink' ? 'drink' : 'food',
    nationality: type === 'Drink' ? '' : strArea,
    category: strCategory,
    alcoholicOrNot: type === 'Meal' ? '' : strAlcoholic,
    name,
    image,
  };

  if (getFavoriteRecipes !== null) {
    const favoriteRecipes = [...JSON.parse(getFavoriteRecipes), newFavoriteRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  } else localStorage.setItem('favoriteRecipes', JSON.stringify([newFavoriteRecipe]));
};

export const removeFavorite = (id) => {
  const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favorites = getFavorites.filter((favorite) => favorite.id !== id);
  console.log(favorites);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
};

export const renderIngredients = (recipeDetails) => {
  const allIngredients = [];

  for (let i = MIN_INGREDIENTS; i < MAX_INGREDIENTS; i += 1) {
    const ingredientIndex = `strIngredient${i}`;
    const measureIndex = `strMeasure${i}`;
    const ingredientValue = recipeDetails[ingredientIndex];
    const measureValue = recipeDetails[measureIndex];
    const item = `${ingredientValue} - ${measureValue}`;

    if (ingredientValue) allIngredients.push(item);
  }

  return (
    <ul className="text-container">
      { allIngredients.map((ingredient, index) => (
        <li
          key={ index }
          className="ingredientItem"
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient}
        </li>
      ))}
    </ul>
  );
};

export const renderRecommendations = (recomendationType, type) => {
  const recommended = [];
  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

  for (let i = ZERO; i < MAX_RECOMENDATIONS; i += 1) {
    if (recomendationType.length > 0) recommended.push(recomendationType[i]);
  }

  return (
    <div className={ `${type}-carousel` }>
      {recommended.map((recomendation, index) => (
        <div
          key={ index }
          className={ `${type}Card` }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ recomendation[`str${typeCapitalized}Thumb`] }
            alt={ `${index}-${type}` }
          />
          <span className={ `${type}Category` }>{recomendation.strCategory}</span>
          <span
            className={ `${type}Name` }
            data-testid={ `${index}-recomendation-title` }
          >
            {recomendation[`str${typeCapitalized}`]}
          </span>
        </div>
      ))}
    </div>
  );
};
