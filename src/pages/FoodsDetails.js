import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFoodDetailsThunk, getDrinksThunk } from '../store/actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { MIN_INGREDIENTS, MAX_INGREDIENTS,
  MAX_RECOMENDATIONS, ZERO, ID_LENGTH } from '../services/constants';
import { URL } from '../services/functions';
import '../styles/FoodDetails.css';
import Loading from '../components/Loading';

function FoodsDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const foodDetails = useSelector((state) => state.foodDetails);
  const drinks = useSelector((state) => state.drinks);

  const dispatch = useDispatch();

  const id = pathname.substring(pathname.length - ID_LENGTH, pathname.length);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getFoodDetailsThunk(id));
    dispatch(getDrinksThunk());
  }, [dispatch, id]);

  const renderIngredients = () => {
    const allIngredients = [];

    for (let i = MIN_INGREDIENTS; i < MAX_INGREDIENTS; i += 1) {
      const ingredientIndex = `strIngredient${i}`;
      const measureIndex = `strMeasure${i}`;
      const ingredientValue = foodDetails[ingredientIndex];
      const measureValue = foodDetails[measureIndex];
      const item = `${ingredientValue} - ${measureValue}`;

      if (ingredientValue) allIngredients.push(item);
    }

    return (
      <ul className="text-container">
        { allIngredients.map((ingredient, index) => (
          <li
            key={ index }
            className="ingredientItem"
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>
        ))}
      </ul>
    );
  };

  const renderRecommendations = () => {
    const recommendedDrinks = [];

    for (let i = ZERO; i < MAX_RECOMENDATIONS; i += 1) {
      if (drinks.length > 0) recommendedDrinks.push(drinks[i]);
    }

    return (
      <div className="drinks-carousel">
        {recommendedDrinks.map(({ strDrinkThumb, strCategory, strDrink }, index) => (
          <div
            key={ index }
            className="drinksCard"
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ strDrinkThumb } alt={ `${index}-drink` } />
            <span className="drinkCategory">{strCategory}</span>
            <span
              className="drinkName"
              data-testid={ `${index}-recomendation-title` }
            >
              {strDrink}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const { strMealThumb, strMeal, strCategory, strInstructions,
    strYoutube,
  } = foodDetails;

  if (foodDetails.idMeal && loading) setLoading(false);

  return (
    loading ? <Loading />
      : (
        <main>
          <div className="img-container">
            <img src={ strMealThumb } alt="meal tumb" data-testid="recipe-photo" />
          </div>

          <div className="page-body">
            <div className="title-container">
              <h2 data-testid="recipe-title">{strMeal}</h2>
              <button type="button" data-testid="share-btn">
                <img src={ shareIcon } alt="share button" />
              </button>
              <button type="button" data-testid="favorite-btn">
                <img src={ whiteHeartIcon } alt="favorite button" />
              </button>
            </div>

            <span className="category" data-testid="recipe-category">{strCategory}</span>

            <section>
              <span>Ingredients</span>
              { renderIngredients() }
            </section>

            <section>
              <span>Instructions</span>
              <p
                className="text-container"
                data-testid="instructions"
              >
                {strInstructions}
              </p>
            </section>

            <section>
              <span>Video</span>
              <embed
                className="text-container"
                data-testid="video"
                width="308"
                height="198"
                src={ URL(strYoutube) }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                gyroscope; picture-in-picture"
                allowFullScreen
              />
            </section>

            <section>
              <span>Recommended</span>
              { renderRecommendations() }
            </section>

            <button
              className="startRecipeBtn"
              type="button"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
          </div>
        </main>
      ));
}

export default FoodsDetails;
