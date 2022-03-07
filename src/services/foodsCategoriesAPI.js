const foodsCategoriesAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const foods = await response.json();
  return foods;
};

export default foodsCategoriesAPI;
