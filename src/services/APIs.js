export const foodsCategoriesAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const foods = await response.json();
  return foods;
};

export const foodDetailsAPI = async (recipeId) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
  const foodDetails = await response.json();
  return foodDetails;
};

export const drinkDetailsAPI = async (recipeId) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
  const drinkDetails = await response.json();
  return drinkDetails;
};

export const drinksAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const drinks = await response.json();
  return drinks;
};

export const foodsAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const drinks = await response.json();
  return drinks;
};
