export const foodsCategoriesAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const foods = await response.json();
  return foods;
};

export const fetchRandomFoodOrDrinks = async (foodOrDrink) => {
  const response = await fetch(`https://www.${foodOrDrink}.com/api/json/v1/1/random.php`);
  const data = await response.json();
  return data;
};

export const fetchIngredients = async (foodOrDrink) => {
  const response = await fetch(`https://www.${foodOrDrink}.com/api/json/v1/1/list.php?i=list`);
  const data = await response.json();
  return data;
};

export const fetchFoodsByNationality = async (nationality) => {
  if (nationality === 'All') {
    const response = await
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const foods = await response.json();
    return foods.meals;
  }
  const response = await
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`);
  const data = await response.json();
  return data.meals;
};

export const fetchNationalities = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const data = await response.json();
  return data;
};
