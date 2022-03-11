import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { fetchIngredients } from '../services/foodsCategoriesAPI';
import Footer from '../components/Footer';
import { NUMBER_12, ZERO } from '../services/constants';
import '../styles/ExploreFoodsIngredients.css';

function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  const getIngredients = async () => {
    const { meals } = await fetchIngredients('themealdb');
    const only12Ingredients = meals.slice(ZERO, NUMBER_12);
    setIngredients(only12Ingredients);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <main>
      <Header title="Explore Ingredients" isSearch={ false } />
      <div className="card-container">
        {ingredients.map(
          ({ strIngredient }, index) => (
            <div
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              className="card"
              onClick={ () => history.push('/foods') }
              role="button"
              tabIndex={ 0 }
              aria-hidden="true"
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt={ `${strIngredient} imagem ` }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
            </div>
          ),
        )}
      </div>
      <Footer />
    </main>
  );
}

export default ExploreFoodsIngredients;
