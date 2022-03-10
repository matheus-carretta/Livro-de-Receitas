import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchIngredients } from '../services/foodsCategoriesAPI';
import Footer from '../components/Footer';
import { NUMBER_12 } from '../services/constants';
import '../styles/ExploreFoodsIngredients.css';

function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();

  const getIngredients = async () => {
    const { meals } = await fetchIngredients('themealdb');
    const only12Ingredients = meals.slice(0, NUMBER_12);
    setIngredients(only12Ingredients);
  };

  useEffect(() => {
    getIngredients();
  }, []);

  const redirectToFoods = () => {
    history.push('/foods');
  };

  return (
    <main>
      <div className="card-container">
        {ingredients.map(
          ({ strIngredient }, index) => (
            <div
              key={ index }
              data-testid={ `${index}-ingredient-card` }
              className="card"
              onClick={ redirectToFoods }
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
