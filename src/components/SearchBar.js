import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import { TWOELVEN, GLOBAL_ALERT } from '../services/constants';
import SearchCard from './SearchCard';
import '../styles/Search.css';

export default function SearchBar({ type }) {
  const [searchInput, setSearchInput] = useState('');
  const [searching, setSearching] = useState('');
  const [resultsApi, setResultsApi] = useState([]);
  const history = useHistory();

  const setData = (data) => {
    const mealsArray = data;
    if (data === null || mealsArray.length === 0 || mealsArray === null) {
      global.alert(GLOBAL_ALERT);
    }
    const twelveDrinkIngredients = mealsArray.splice(0, TWOELVEN);
    console.log(twelveDrinkIngredients[0]);
    if (type === 'meal' && twelveDrinkIngredients.length === 1) {
      history.push(`/foods/${twelveDrinkIngredients[0].idMeal}`);
      console.log('entrei');
    } else if (type === 'cocktail' && twelveDrinkIngredients.length === 1) {
      history.push(`/drinks/${twelveDrinkIngredients[0].idDrink}`);
      console.log('entrem em baixo');
    }
    setResultsApi(twelveDrinkIngredients);
  };

  const handleAlert = (obj) => {
    switch (type) {
    case 'meal':
      if (obj.meals === null || obj.meals === undefined) {
        global.alert(GLOBAL_ALERT);
      }
      break;
    case 'cocktail':
      if (obj.drinks === null || obj.drinks === undefined) {
        global.alert(GLOBAL_ALERT);
      }
      break;
    default:
      break;
    }
  };

  const handleSearch = async () => {
    try {
      let { data, result } = [];
      switch (searching) {
      case 'ingredient':
        data = await fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?i=${searchInput}`);
        result = await data.json();
        if (type === 'cocktail') {
          setData(result.drinks);
        }
        setData(result.meals);
        break;
      case 'name':
        data = await fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?s=${searchInput}`);
        result = await data.json();
        if (type === 'cocktail') {
          setData(result.drinks);
        }
        setData(result.meals);
        break;
      case 'first-letter':
        if (searchInput.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        }
        data = await fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?f=${searchInput}`);
        result = await data.json();
        if (type === 'cocktail') {
          setData(result.drinks);
        }
        setData(result.meals);
        break;
      default:
        break;
      }
      handleAlert(result);
    } catch (e) {
      // global.alert(GLOBAL_ALERT);
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <div className="div-text">
          <input
            type="text"
            className="input-text"
            placeholder="Search Recipe"
            data-testid="search-input"
            value={ searchInput }
            onChange={ ({ target }) => setSearchInput(target.value) }
          />
        </div>
        <div className="container-radio">
          <label className="radio-label" htmlFor="ingredient">
            <input
              type="radio"
              className="radio"
              id="ingredient"
              name="searching"
              value="ingredient"
              data-testid="ingredient-search-radio"
              onClick={ ({ target }) => setSearching(target.value) }
            />
            Ingredient
          </label>
          <label className="radio-label" htmlFor="name">
            <input
              type="radio"
              className="radio"
              id="name"
              name="searching"
              value="name"
              data-testid="name-search-radio"
              onClick={ ({ target }) => setSearching(target.value) }
            />
            Name
          </label>
          <label className="radio-label" htmlFor="first-letter">
            <input
              type="radio"
              className="radio"
              id="first-letter"
              name="searching"
              value="first-letter"
              data-testid="first-letter-search-radio"
              onClick={ ({ target }) => setSearching(target.value) }
            />
            First Letter
          </label>
        </div>
        <div className="button-div">
          <button
            type="button"
            className="searchBtn"
            data-testid="exec-search-btn"
            onClick={ handleSearch }
          >
            Search
          </button>
        </div>
        <div className="container-card">
          {resultsApi.map((data, index) => (
            <SearchCard
              key={ index }
              index={ index }
              obj={ data }
              type={ type }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};
