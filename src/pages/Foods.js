import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { NUMBER_12, ZERO } from '../services/constants';
import { RecipeCard, FlexWrapContainer, Imagem } from '../styles/ExplorePages';
import { foodsAPI } from '../services/APIs';
import Loading from '../components/Loading';

function Foods() {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const getFoods = async () => {
    const { meals } = await foodsAPI();
    const only12Foods = meals.slice(ZERO, NUMBER_12);
    setFoods(only12Foods);
    setIsLoading(false);
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    isLoading ? <Loading /> : (
      <main>
        <FlexWrapContainer>
          <Header title="Foods" isSearch type="meal" />
          {foods.map(({ strMeal, strMealThumb, idMeal }, index) => (
            <RecipeCard
              key={ index }
              onClick={ () => history.push(`/foods/${idMeal}`) }
              aria-hidden="true"
            >
              <Imagem
                src={ strMealThumb }
                alt={ `${strMeal} imagem ` }
              />
              <p>{ strMeal }</p>
            </RecipeCard>
          ))}
          <Footer position="fixed" />
        </FlexWrapContainer>
      </main>
    )
  );
}

export default Foods;
