import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { fetchIngredients } from '../services/foodsCategoriesAPI';
import Footer from '../components/Footer';
import { NUMBER_12, ZERO } from '../services/constants';
import '../styles/ExploreFoodsIngredients.css';
import { FlexWrapContainer, IngredientsCard } from '../styles/ExplorePages';
import Loading from '../components/Loading';

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const getIngredients = async () => {
    const { drinks } = await fetchIngredients('cocktail');
    const only12Ingredients = drinks.slice(ZERO, NUMBER_12);
    setIngredients(only12Ingredients);
    setIsLoading(false);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    isLoading ? <Loading /> : (
      <main>
        <Header title="Explore Ingredients" isSearch={ false } />
        <FlexWrapContainer>
          {ingredients.map(
            ({ strIngredient1 }, index) => (
              <IngredientsCard
                key={ index }
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => history.push('/drinks') }
                aria-hidden="true"
              >
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt={ `${strIngredient1} imagem ` }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
              </IngredientsCard>
            ),
          )}
        </FlexWrapContainer>
        <Footer />
      </main>
    )
  );
}

export default ExploreDrinksIngredients;
