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
  Section, TitleContainer, TitleContainerSt, Copied, StartButton, IconContainer,
} from '../styles/RecipeDetails';
import { Icon } from '../styles/Header';
import { getTodayDate } from '../services/functions';

const copy = require('clipboard-copy');

function DrinkInProgress() {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;

  const route = pathname.replace('/drinks/', '');
  const id = route.replace('/in-progress', '');
  const clipBoardRoute = pathname.replace('/in-progress', '');

  const drinkDetails = useSelector((state) => state.recipeDetails);

  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipeFinished, setRecipeFinished] = useState(true);
  useEffect(() => {
    dispatch(getRecipeDetailsThunk(id, 'drinks'));
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
    if (document.querySelector('.ingredientItem')) checkProgress('cocktails', id);
    setRecipeFinished(validateFinishBtn());
  }, [loading, id]);

  const handleShare = () => {
    copy(`http://localhost:3000${clipBoardRoute}`);
    setCopied(true);
  };

  const setFavorite = () => {
    addFavorite(drinkDetails, 'Drink');
    setIsFavorite(true);
  };

  const unsetFavorite = () => {
    removeFavorite(id);
    setIsFavorite(false);
  };
  const handleClick = () => setRecipeFinished(validateFinishBtn());
  const { strDrinkThumb, strDrink, strAlcoholic,
    strInstructions, idDrink, strCategory } = drinkDetails;

  const finishRecipe = async () => {
    const todayDate = getTodayDate();
    const newRecipe = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: todayDate,
    };

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([newRecipe]));
    } else {
      const newDoneRecipes = JSON.stringify([...doneRecipes, newRecipe]);
      localStorage.setItem('doneRecipes', newDoneRecipes);
    }
    history.push('/done-recipes');
  };

  if (drinkDetails.idDrink && loading) setLoading(false);

  return (
    loading ? <Loading />
      : (
        <main>
          <ImageContainer>
            <ImgHeader src={ strDrinkThumb } alt="drink tumb" />
          </ImageContainer>

          <TitleContainer>
            <TitleContainerSt>
              <HeaderTitle data-testid="recipe-title">{strDrink}</HeaderTitle>
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

            </IconContainer>
          </TitleContainer>

          <Body>
            <Section onClick={ handleClick }>
              <h3>Ingredients</h3>
              { renderIngredientsInProgress(drinkDetails, 'drinks', id) }
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
            onClick={ () => finishRecipe() }
            disabled={ recipeFinished }
          >
            Finish Recipe
          </StartButton>
        </main>
      ));
}

export default DrinkInProgress;
