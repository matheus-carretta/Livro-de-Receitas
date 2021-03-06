import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

import Footer from '../components/Footer';
import { fetchFoodsByNationality,
  fetchNationalities } from '../services/foodsCategoriesAPI';
import { NUMBER_12 } from '../services/constants';
import { RecipeCard,
  Imagem, FlexWrapContainer, Dropdown } from '../styles/ExplorePages';

function ExploreFoodsNationalities() {
  const [nationality, setNationality] = useState('All');
  const [foodArray, setFoodArray] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(true);
    const arrayFoods = await fetchFoodsByNationality(selectNationality);
    const only12Foods = arrayFoods.slice(0, NUMBER_12);
    setFoodArray(only12Foods);
    setIsLoading(false);
  };

  useEffect(() => {
    setFoodsByNationality(nationality);
  }, [nationality]);

  const redirectToFoodDetails = (id) => {
    history.push(`/foods/${id}`);
  };

  return (
    isLoading ? <Loading /> : (
      <div className="main">
        <Header title="Explore Nationalities" isSearch />
        <Dropdown
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
        </Dropdown>
        <FlexWrapContainer>
          {foodArray.map(({ idMeal, strMeal, strMealThumb }, index) => (
            <RecipeCard
              key={ index }
              data-testid={ `${index}-recipe-card` }
              onClick={ () => redirectToFoodDetails(idMeal) }
              aria-hidden="true"
            >
              <Imagem
                src={ `${strMealThumb}` }
                alt={ `${strMeal} imagem ` }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
            </RecipeCard>
          ))}
        </FlexWrapContainer>
        <Footer />
      </div>
    )
  );
}

export default ExploreFoodsNationalities;
