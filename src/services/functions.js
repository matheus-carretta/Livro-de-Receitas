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

export const getTodayDate = () => {
  const date = new Date();
  const formatedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  return formatedDate;
};
