import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

import Footer from '../components/Footer';
import { fetchFoodsByNationality,
  fetchNationalities } from '../services/foodsCategoriesAPI';
import { NUMBER_12 } from '../services/constants';
import '../styles/ExploreFoodsNationalities.css';

function ExploreFoodsNationalities() {
  const [nationality, setNationality] = useState('All');
  const [foodArray, setFoodArray] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const history = useHistory();

  const getNationalities = async () => {
    const { meals } = await fetchNationalities();
    const startOption = [{
      strArea: 'All',
    }];
    const newArray = startOption.concat(meals);
    setSelectOptions(newArray);
  };

  useEffect(() => {
    getNationalities();
  }, []);

  const setFoodsByNationality = async (selectNationality) => {
    const arrayFoods = await fetchFoodsByNationality(selectNationality);
    const only12Foods = arrayFoods.slice(0, NUMBER_12);
    setFoodArray(only12Foods);
  };

  useEffect(() => {
    setFoodsByNationality(nationality);
  }, [nationality]);

  const redirectToFoodDetails = (id) => {
    history.push(`/foods/${id}`);
  };

  return (
    <div className="main">
      <Header title="Explore Nationalities" isSearch />
      <select
        data-testid="explore-by-nationality-dropdown"
        value={ nationality }
        onChange={ ({ target }) => setNationality(target.value) }
        className="dropdown"
      >
        {selectOptions.map(({ strArea }, index) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ index }
            value={ strArea }
          >
            { strArea }
          </option>
        ))}
      </select>
      <div className="card-container">
        {foodArray.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            className="card"
            onClick={ () => redirectToFoodDetails(idMeal) }
            role="button"
            tabIndex={ 0 }
            aria-hidden="true"
          >
            <img
              src={ `${strMealThumb}` }
              alt={ `${strMeal} imagem ` }
              data-testid={ `${index}-card-img` }
              className="card-image"
            />
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsNationalities;
