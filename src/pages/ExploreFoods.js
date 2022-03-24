import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { fetchRandomFoodOrDrinks } from '../services/foodsCategoriesAPI';
import { FlexColumnContainer, ExploreBtn, ButtonLink } from '../styles/ExplorePages';

function ExploreFoods() {
  const history = useHistory();
  const [isLoading, SetIsLoading] = useState(false);

  const getRandomId = async (args) => {
    SetIsLoading(true);
    const data = await fetchRandomFoodOrDrinks(args);
    const id = data.meals[0].idMeal;
    SetIsLoading(false);
    history.push(`/foods/${id}`);
  };

  return (
    isLoading ? <Loading />
      : (
        <FlexColumnContainer>
          <Header title="Explore Foods" isSearch={ false } />
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
            onClick={ () => getRandomId('themealdb') }
          >
            Surprise me!
          </ExploreBtn>
          <Footer />
        </FlexColumnContainer>)
  );
}

export default ExploreFoods;
