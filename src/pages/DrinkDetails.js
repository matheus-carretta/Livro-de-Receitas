import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRecipeDetailsThunk, getRecommendationThunk } from '../store/actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { COPIED_MESSAGE_TIME } from '../services/constants';
import { addFavorite, removeFavorite, renderIngredients, renderRecommendations,
  checkFavorite } from '../services/functions';
import '../styles/RecipeDetails.css';
import Loading from '../components/Loading';

const copy = require('clipboard-copy');

function DrinkDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const drinkDetails = useSelector((state) => state.recipeDetails);
  const meals = useSelector((state) => state.recommendations);

  const dispatch = useDispatch();

  const id = pathname.replace('/drinks/', '');

  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    dispatch(getRecipeDetailsThunk(id, 'drinks'));
    dispatch(getRecommendationThunk('meals'));
  }, [dispatch, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, COPIED_MESSAGE_TIME);
    return () => clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    setIsFavorite(checkFavorite(id));
  }, [id]);

  const handleShare = () => {
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
  };

  const setFavorite = () => {
    addFavorite(drinkDetails, 'Drink');
    console.log('Favoritou');
    setIsFavorite(true);
  };

  const unsetFavorite = () => {
    removeFavorite(id);
    console.log('Desfavoritou');
    setIsFavorite(false);
  };

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = drinkDetails;

  if (drinkDetails.idDrink && loading) setLoading(false);

  return (
    loading ? <Loading />
      : (
        <main>
          <div className="img-container">
            <img src={ strDrinkThumb } alt="drink tumb" data-testid="recipe-photo" />
          </div>

          <div className="page-body">
            <div className="title-container">
              <h2 data-testid="recipe-title">{strDrink}</h2>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ handleShare }
              >
                <img src={ shareIcon } alt="share button" />
              </button>
              <button
                type="button"
                onClick={
                  isFavorite
                    ? () => unsetFavorite()
                    : () => setFavorite()
                }
              >
                <img
                  src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
                  alt="favorite button"
                  data-testid="favorite-btn"
                />
              </button>
            </div>

            <span className="category" data-testid="recipe-category">{strAlcoholic}</span>

            <section>
              <span>Ingredients</span>
              { renderIngredients(drinkDetails) }
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
              <span>Recommended</span>
              { renderRecommendations(meals, 'meal') }
            </section>

            {copied && <p className="copiedPopUp">Link copied!</p>}

            <button
              className="startRecipeBtn"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push('/recipe-in-progress') }
            >
              Start Recipe
            </button>
          </div>
        </main>
      ));
}

export default DrinkDetails;
