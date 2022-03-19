import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRecipeDetailsThunk, getRecommendationThunk } from '../store/actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { COPIED_MESSAGE_TIME } from '../services/constants';
import { addFavorite, removeFavorite, URL, renderIngredients, renderRecommendations,
  checkFavorite, checkInProgress } from '../services/recipeDetailsAndProgressFunctions';
import '../styles/RecipeDetails.css';
import Loading from '../components/Loading';

const copy = require('clipboard-copy');

function FoodDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;

  const foodDetails = useSelector((state) => state.recipeDetails);
  const drinks = useSelector((state) => state.recommendations);

  const dispatch = useDispatch();

  const id = pathname.replace('/foods/', '');

  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    dispatch(getRecipeDetailsThunk(id, 'meals'));
    dispatch(getRecommendationThunk('drinks'));
  }, [dispatch, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, COPIED_MESSAGE_TIME);
    return () => clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    setIsFavorite(checkFavorite(id));
    setInProgress(checkInProgress('meals', id));
  }, [id]);

  const handleShare = () => {
    copy(`http://localhost:3000${pathname}`);
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

  const { strMealThumb, strMeal, strCategory, strInstructions,
    strYoutube,
  } = foodDetails;

  // if (foodDetails.idMeal && loading) setLoading(false);

  const a = false;

  if (a) setLoading(false);

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

            <section>
              <span>Ingredients</span>
              { renderIngredients(foodDetails) }
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
              { renderRecommendations(drinks, 'drink') }
            </section>

            {copied && <p className="copiedPopUp">Link copied!</p>}

            <button
              className="startRecipeBtn"
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/foods/${id}/in-progress`, { from: id }) }
            >
              { inProgress ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          </div>
        </main>
      ));
}

export default FoodDetails;
