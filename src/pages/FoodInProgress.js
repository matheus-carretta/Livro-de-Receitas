import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { COPIED_MESSAGE_TIME } from '../services/constants';
import { addFavorite, removeFavorite, renderIngredientsInProgress, checkFavorite,
  checkProgress, validateFinishBtn } from '../services/recipeDetailsAndProgressFunctions';
import { getRecipeDetailsThunk } from '../store/actions';

const copy = require('clipboard-copy');

function FoodInProgress() {
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { location: { pathname } } = history;

  const route = pathname.replace('/foods/', '');
  const id = route.replace('/in-progress', '');

  const foodDetails = useSelector((state) => state.recipeDetails);

  const dispatch = useDispatch();

  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipeFinished, setRecipeFinished] = useState(true);

  useEffect(() => {
    dispatch(getRecipeDetailsThunk(id, 'meals'));
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

  useEffect(() => {
    if (document.querySelector('.ingredientItem')) checkProgress('meals', id);
    setRecipeFinished(validateFinishBtn());
  }, [loading, id]);

  const handleShare = () => {
    copy(`http://localhost:3000/foods/${id}`);
    setCopied(true);
  };

  const setFavorite = () => {
    addFavorite(foodDetails, 'Meal');
    setIsFavorite(true);
  };

  const unsetFavorite = () => {
    removeFavorite(id);
    setIsFavorite(false);
  };

  const handleClick = () => setRecipeFinished(validateFinishBtn());

  const { strMealThumb, strMeal, strCategory, strInstructions } = foodDetails;

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

            <span className="category" data-testid="recipe-category">{strCategory}</span>

            <button
              className="section"
              type="button"
              onClick={ handleClick }
            >
              <span>Ingredients</span>
              { renderIngredientsInProgress(foodDetails, 'meals', id) }
            </button>

            <section>
              <span>Instructions</span>
              <p
                className="text-container text-container-in-progress"
                data-testid="instructions"
              >
                {strInstructions}
              </p>
            </section>

            {copied && <p className="copiedPopUp">Link copied!</p>}

            <button
              className="startRecipeBtn"
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ () => history.push('/done-recipes') }
              disabled={ recipeFinished }
            >
              Finish Recipe
            </button>
          </div>
        </main>
      ));
}

export default FoodInProgress;
