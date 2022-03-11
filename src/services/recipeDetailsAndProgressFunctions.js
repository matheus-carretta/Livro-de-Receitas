import React from 'react';
import { ZERO, MAX_RECOMENDATIONS, MIN_INGREDIENTS, MAX_INGREDIENTS } from './constants';

export const URL = (strYoutube = '') => strYoutube.replace('watch?v=', 'v/');

export const checkFavorite = (id) => {
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

export const validateFinishBtn = () => {
  const allCheckboxes = document.querySelectorAll('input');
  const allUncheckeds = Array.from(allCheckboxes).filter((checkbox) => !checkbox.checked);

  return allUncheckeds.length !== 0;
};

export const checkProgress = (type, id) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (inProgressRecipes !== null
      && Object.keys(inProgressRecipes).includes(type)
      && Object.keys(inProgressRecipes[type]).includes(id)) {
    const itemsDone = inProgressRecipes[type][id];
    if (itemsDone.length > 0) {
      itemsDone.map((item) => {
        const ingredientId = item.replace('checkbox', 'ingredient');
        const ingredient = document.querySelector(`#${ingredientId}`);
        const checkbox = document.querySelector(`#${item}`);

        checkbox.checked = true;
        return ingredient.classList.add('item-done');
      });
    }
  }
};

function updateProgressToStorage(type, id) {
  const checkeds = document.querySelectorAll('input:checked');
  const checkedsId = Array.from(checkeds).map((ingredient) => ingredient.id);
  const previousInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let inProgressRecipes = {
    [type]: { [id]: checkedsId },
  };

  if (previousInProgressRecipes !== null) {
    inProgressRecipes = {
      ...previousInProgressRecipes,
      [type]: {
        ...previousInProgressRecipes[type],
        [id]: checkedsId,
      },
    };
  }

  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}

function handleCheckBox(id, type, routeId) {
  const idNumber = id.slice(id.length - 1);
  const check = document.querySelector(`#${id}`).checked;
  const ingredient = document.querySelector(`#ingredient-${idNumber}`);

  if (check) {
    ingredient.classList.add('item-done');
    return updateProgressToStorage(type, routeId);
  }
  ingredient.classList.remove('item-done');
  return updateProgressToStorage(type, routeId);
}

export const renderIngredientsInProgress = (recipeDetails, type, routeId) => {
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
          className="ingredientItemInProgress"
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ `checkbox-${index}` }
            onClick={ () => handleCheckBox(`checkbox-${index}`, type, routeId) }
          />
          <span
            className="ingredientItem"
            id={ `ingredient-${index}` }
          >
            {ingredient}
          </span>
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
