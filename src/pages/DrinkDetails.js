import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRecipeDetailsThunk, getRecommendationThunk } from '../store/actions';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { COPIED_MESSAGE_TIME } from '../services/constants';
import { addFavorite, removeFavorite, renderIngredients, renderRecommendations,
  checkFavorite, checkInProgress } from '../services/recipeDetailsAndProgressFunctions';
import '../styles/RecipeDetails.css';
import Loading from '../components/Loading';
import { ImageContainer, ImgHeader, Body, TitleContainer, HeaderTitle, TitleContainerSt,
  HeaderSubTitle, Section, Instruction, StartButton,
} from '../styles/RecipeDetails';
import { Icon } from '../styles/Header';

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
  const [inProgress, setInProgress] = useState(false);

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
    setInProgress(checkInProgress('cocktails', id));
  }, [id]);

  const handleShare = () => {
    copy(`http://localhost:3000${pathname}`);
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

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = drinkDetails;

  if (drinkDetails.idDrink && loading) setLoading(false);

  return (
    loading ? <Loading />
      : (
        <main>
          <ImageContainer>
            <ImgHeader
              src={ strDrinkThumb }
              alt="drink tumb"
              data-testid="recipe-photo"
            />
          </ImageContainer>

          <TitleContainer>
            <TitleContainerSt>
              <HeaderTitle>{strDrink}</HeaderTitle>
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
            </TitleContainerSt>
            <HeaderSubTitle data-testid="recipe-category">{strAlcoholic}</HeaderSubTitle>
          </TitleContainer>

          <Body>
            <Section>
              <h3>Ingredients</h3>
              { renderIngredients(drinkDetails) }
            </Section>

            <Section>
              <h3>Instructions</h3>
              <Instruction data-testid="instructions">
                {strInstructions}
              </Instruction>
            </Section>

            <Section>
              <h3>Recommended</h3>
              { renderRecommendations(meals, 'meal') }
            </Section>

            {copied && <p className="copiedPopUp">Link copied!</p>}
          </Body>

          <StartButton
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`/drinks/${id}/in-progress`, { from: id }) }
          >
            { inProgress ? 'Continue Recipe' : 'Start Recipe' }
          </StartButton>
        </main>
      ));
}

export default DrinkDetails;
