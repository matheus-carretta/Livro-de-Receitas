import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NUMBER_12, ZERO } from '../services/constants';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RecipeCard, FlexWrapContainer, Imagem } from '../styles/ExplorePages';
import { drinksAPI } from '../services/APIs';
import Loading from '../components/Loading';

function Drinks() {
  const [cocktail, setCocktail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const getDrinks = async () => {
    const { drinks } = await drinksAPI();
    const only12Drinks = drinks.slice(ZERO, NUMBER_12);
    setCocktail(only12Drinks);
    setIsLoading(false);
  };

  useEffect(() => {
    getDrinks();
  }, []);

  return (
    isLoading ? <Loading /> : (
      <main>
        <FlexWrapContainer>
          <Header title="Drinks" isSearch type="drink" />
          {cocktail.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
            <RecipeCard
              key={ index }
              onClick={ () => history.push(`/drinks/${idDrink}`) }
              aria-hidden="true"
            >
              <Imagem
                src={ strDrinkThumb }
                alt={ `${strDrink} imagem ` }
              />
              <p>{ strDrink }</p>
            </RecipeCard>
          ))}
          <Footer position="fixed" />
        </FlexWrapContainer>
      </main>
    )
  );
}

export default Drinks;
