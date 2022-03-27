import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRecipeDetailsThunk, getRecommendationThunk } from '../store/actions';
import shareIcon from '../images/share.png';
import whiteHeartIcon from '../images/whiteHeart.png';
import pinkHeartIcon from '../images/pinkHeart.png';
import { COPIED_MESSAGE_TIME } from '../services/constants';
import { addFavorite, removeFavorite, URL, renderIngredients, renderRecommendations,
  checkFavorite, checkInProgress } from '../services/recipeDetailsAndProgressFunctions';
import Loading from '../components/Loading';
import { ImageContainer, ImgHeader, Body, TitleContainer, HeaderTitle, TitleContainerSt,
  HeaderSubTitle, Section, Instruction, StartButton, Copied, Video,
  IconContainer } from '../styles/RecipeDetails';
import { Icon } from '../styles/Header';

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

  if (foodDetails.idMeal && loading) setLoading(false);

  return (
    loading ? <Loading />
      : (
        <main>
          <ImageContainer>
            <ImgHeader
              src={ strMealThumb }
              alt="meal tumb"
              data-testid="recipe-photo"
            />
          </ImageContainer>

          <TitleContainer>
            <TitleContainerSt>
              <HeaderTitle data-testid="recipe-title">{strMeal}</HeaderTitle>
              <HeaderSubTitle data-testid="recipe-category">{strCategory}</HeaderSubTitle>
            </TitleContainerSt>

            <IconContainer>
              <Icon
                data-testid="share-btn"
                onClick={ handleShare }
                src={ shareIcon }
                alt="share button"
                size="28px"
                margin="4px"
              />
              <Icon
                type="button"
                size="35px"
                onClick={
                  isFavorite
                    ? () => unsetFavorite()
                    : () => setFavorite()
                }
                src={ isFavorite ? pinkHeartIcon : whiteHeartIcon }
                alt="favorite button"
                data-testid="favorite-btn"
                margin="4px"
              />
            </IconContainer>
          </TitleContainer>

          <Body>
            <Section>
              <h3>Ingredients</h3>
              { renderIngredients(foodDetails) }
            </Section>

            <Section>
              <h3>Instructions</h3>
              <Instruction data-testid="instructions">
                {strInstructions}
              </Instruction>
            </Section>

            <Section>
              <h3>Video</h3>
              <Video
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
            </Section>

            <Section>
              <h3>Recommended</h3>
              { renderRecommendations(drinks, 'drink') }
            </Section>

            {copied && <Copied>Link copied!</Copied>}
          </Body>

          <StartButton
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/foods/${id}/in-progress`, { from: id }) }
          >
            { inProgress ? 'Continue Recipe' : 'Start Recipe' }
          </StartButton>
        </main>
      ));
}

export default FoodDetails;
