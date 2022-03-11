import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchIngredients } from '../services/foodsCategoriesAPI';
import Footer from '../components/Footer';
import { NUMBER_12, ZERO } from '../services/constants';
import '../styles/ExploreFoodsIngredients.css';

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  const getIngredients = async () => {
    const { drinks } = await fetchIngredients('thecocktaildb');
    const only12Ingredients = drinks.slice(ZERO, NUMBER_12);
    setIngredients(only12Ingredients);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <main>
      <div className="card-container">
        {ingredients.map(
          ({ strIngredient1 }, index) => (
            <div
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              className="card"
              onClick={ () => history.push('/drinks') }
              role="button"
              tabIndex={ 0 }
              aria-hidden="true"
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt={ `${strIngredient1} imagem ` }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
            </div>
          ),
        )}
      </div>
      <Footer />
    </main>
  );
}

export default ExploreDrinksIngredients;
