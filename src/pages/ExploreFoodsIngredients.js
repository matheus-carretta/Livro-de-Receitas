import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { fetchIngredients } from '../services/foodsCategoriesAPI';
import Footer from '../components/Footer';
import { NUMBER_12, ZERO } from '../services/constants';
import Loading from '../components/Loading';
import { RecipeCard, FlexWrapContainer } from '../styles/ExplorePages';

function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const getIngredients = async () => {
    const { meals } = await fetchIngredients('meal');
    const only12Ingredients = meals.slice(ZERO, NUMBER_12);
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
            ({ strIngredient }, index) => (
              <RecipeCard
                key={ index }
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => history.push('/foods') }
                aria-hidden="true"
              >
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                  alt={ `${strIngredient} imagem ` }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
              </RecipeCard>
            ),
          )}
        </FlexWrapContainer>
        <Footer />
      </main>
    )
  );
}

export default ExploreFoodsIngredients;
