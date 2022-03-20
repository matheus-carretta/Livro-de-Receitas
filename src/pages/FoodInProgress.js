import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import shareIcon from '../images/share.png';
import whiteHeartIcon from '../images/whiteHeart.png';
import pinkHeartIcon from '../images/pinkHeart.png';
import { COPIED_MESSAGE_TIME } from '../services/constants';
import { addFavorite, removeFavorite, renderIngredientsInProgress, checkFavorite,
  checkProgress, validateFinishBtn } from '../services/recipeDetailsAndProgressFunctions';
import { getRecipeDetailsThunk } from '../store/actions';
import { Body, HeaderSubTitle, HeaderTitle, ImageContainer, ImgHeader, Instruction,
  Section, TitleContainer, TitleContainerSt, Copied, StartButton,
} from '../styles/RecipeDetails';
import { Icon } from '../styles/Header';

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
          <ImageContainer>
            <ImgHeader src={ strMealThumb } alt="meal tumb" data-testid="recipe-photo" />
          </ImageContainer>

          <TitleContainer>
            <TitleContainerSt>
              <HeaderTitle data-testid="recipe-title">{strMeal}</HeaderTitle>
              <Icon
                data-testid="share-btn"
                onClick={ handleShare }
                src={ shareIcon }
                alt="share button"
                size="28px"
                margin="4px"
              />
              <Icon
                onClick={
                  isFavorite
                    ? () => unsetFavorite()
                    : () => setFavorite()
                }
                src={ isFavorite ? pinkHeartIcon : whiteHeartIcon }
                alt="favorite button"
                data-testid="favorite-btn"
                size="35px"
                margin="4px"
              />
            </TitleContainerSt>
            <HeaderSubTitle data-testid="recipe-category">{strCategory}</HeaderSubTitle>
          </TitleContainer>

          <Body>
            <Section onClick={ handleClick }>
              <h3>Ingredients</h3>
              { renderIngredientsInProgress(foodDetails, 'meals', id) }
            </Section>

            <Section>
              <h3>Instructions</h3>
              <Instruction
                margin="2.5em"
                data-testid="instructions"
              >
                {strInstructions}
              </Instruction>
            </Section>

            {copied && <Copied>Link copied!</Copied>}
          </Body>

          <StartButton
            data-testid="finish-recipe-btn"
            onClick={ () => history.push('/done-recipes') }
            disabled={ recipeFinished }
          >
            Finish Recipe
          </StartButton>
        </main>
      ));
}

export default FoodInProgress;
