import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/share.png';
import { COPIED_MESSAGE_TIME } from '../services/constants';
import '../styles/DoneRecipes.css';
import { CenterContainer, ButtonContainer, FilterButton, Main, CardInfos,
  RecipeCard, RecipeImgContainer, CardTopInfos } from '../styles/DoneRecipes';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copied, setCopied] = useState(false);
  const [filterRecipe, setFilterRecipe] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, COPIED_MESSAGE_TIME);
    return () => clearTimeout(timer);
  }, [copied]);

  const getDoneRecipesLocalStorage = () => {
    const arrayDoneRecipes = localStorage.getItem('doneRecipes');
    if (arrayDoneRecipes === null) {
      return [];
    }
    setDoneRecipes(JSON.parse(arrayDoneRecipes));
    setFilterRecipe(JSON.parse(arrayDoneRecipes));
  };

  useEffect(() => {
    getDoneRecipesLocalStorage();
  }, []);

  const handleShare = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
  };

  const filterBy = (foodType) => {
    const filteredRecipes = doneRecipes.filter((recipe) => recipe.type === foodType);
    setFilterRecipe(filteredRecipes);
  };

  return (
    <Main>
      <Header title="Done Recipes" isSearch={ false } />
      <CenterContainer>
        <ButtonContainer>
          <FilterButton
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ getDoneRecipesLocalStorage }
          >
            All
          </FilterButton>
          <FilterButton
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => filterBy('food') }
          >
            Food
          </FilterButton>
          <FilterButton
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterBy('drink') }
          >
            Drinks
          </FilterButton>
        </ButtonContainer>

        {filterRecipe.map((
          { name, image, category, doneDate,
            nationality, alcoholicOrNot, type, id }, index,
        ) => (
          <RecipeCard key={ index }>
            <RecipeImgContainer>
              <img
                src={ image }
                alt={ `${name} imagem` }
                data-testid={ `${index}-horizontal-image` }
                onClick={ () => history.push(`/${type}s/${id}`) }
                aria-hidden="true"
              />
            </RecipeImgContainer>
            <CardInfos>
              <CardTopInfos>
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { nationality ? `${nationality} - ${category}` : `${alcoholicOrNot}` }
                </h3>

                <button
                  type="button"
                  onClick={ () => handleShare(type, id) }
                >
                  <img
                    src={ shareIcon }
                    alt="share button"
                    data-testid={ `${index}-horizontal-share-btn` }
                    width="22"
                  />
                </button>
              </CardTopInfos>

              <h2
                className="food-drink-name"
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => history.push(`/${type}s/${id}`) }
                aria-hidden="true"
              >
                { name }
              </h2>

              <h3
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `Done in: ${doneDate}` }
              </h3>
            </CardInfos>
          </RecipeCard>
        ))}
        <div />

        {copied && <p className="copiedPopUp">Link copied!</p>}
      </CenterContainer>
    </Main>
  );
}

export default DoneRecipes;
