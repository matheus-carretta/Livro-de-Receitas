import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomFoodOrDrinks } from '../services/foodsCategoriesAPI';
import { FlexColumnContainer, ExploreBtn, ButtonLink } from '../styles/ExplorePages';

function ExploreFoods() {
  const history = useHistory();

  const getRandomId = async (args) => {
    const data = await fetchRandomFoodOrDrinks(args);
    const id = data.meals[0].idMeal;
    history.push(`/foods/${id}`);
  };

  return (
    <>
      <Header title="Explore Foods" isSearch={ false } />
      <FlexColumnContainer>
        <ButtonLink to="/explore/foods/ingredients">
          <ExploreBtn
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </ExploreBtn>
        </ButtonLink>
        <ButtonLink to="/explore/foods/nationalities">
          <ExploreBtn
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </ExploreBtn>
        </ButtonLink>
        <ExploreBtn
          type="button"
          data-testid="explore-surprise"
          onClick={ () => getRandomId('meal') }
        >
          Surprise me!
        </ExploreBtn>
        <Footer />
      </FlexColumnContainer>
    </>);
}

export default ExploreFoods;
