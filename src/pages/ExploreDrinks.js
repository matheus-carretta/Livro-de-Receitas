import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomFoodOrDrinks } from '../services/foodsCategoriesAPI';
import { FlexColumnContainer, ExploreBtn, ButtonLink } from '../styles/ExplorePages';

function ExploreDrinks() {
  const history = useHistory();

  const getRandomId = async (args) => {
    const data = await fetchRandomFoodOrDrinks(args);
    const id = data.drinks[0].idDrink;
    history.push(`/drinks/${id}`);
  };

  return (
    <>
      <Header title="Explore Drinks" isSearch={ false } />
      <FlexColumnContainer>
        <ButtonLink to="/explore/drinks/ingredients">
          <ExploreBtn
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </ExploreBtn>
        </ButtonLink>
        <ExploreBtn
          type="button"
          data-testid="explore-surprise"
          onClick={ () => getRandomId('cocktail') }
        >
          Surprise me!
        </ExploreBtn>
        <Footer />
      </FlexColumnContainer>
    </>
  );
}

export default ExploreDrinks;
