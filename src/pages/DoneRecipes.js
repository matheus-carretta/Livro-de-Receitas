import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { COPIED_MESSAGE_TIME } from '../services/constants';
import '../styles/DoneRecipes.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  // mock
  const mockDoneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  // gravar o mock no localStorage
  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));

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
    <main className="main-content">
      <Header title="Done Recipes" isSearch={ false } />
      <div className="button-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ getDoneRecipesLocalStorage }
          className="filter-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterBy('food') }
          className="filter-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterBy('drink') }
          className="filter-btn"
        >
          Drinks
        </button>
      </div>

      <div className="cards-container">
        {filterRecipe.map((
          { name, image, category, doneDate, tags, nationality, alcoholicOrNot, type, id,
          }, index,
        ) => (
          <div className="recipe-card" key={ index }>

            <div className="recipe-img-container">
              <img
                src={ image }
                alt={ `${name} imagem` }
                data-testid={ `${index}-horizontal-image` }
                onClick={ () => history.push(`/${type}s/${id}`) }
                aria-hidden="true"
              />
            </div>

            <div className="card-infos">
              <div className="card-top-options">
                <h3 data-testid={ `${index}-horizontal-top-text` } className="text-info">
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
                    width="20"
                  />
                </button>
              </div>

              <h2
                className="food-drink-name"
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => history.push(`/${type}s/${id}`) }
                aria-hidden="true"
              >
                { name }
              </h2>

              <h3 data-testid={ `${index}-horizontal-done-date` } className="doneInText">
                { `Done in: ${doneDate}` }
              </h3>

              <div className="tags-container">
                {tags.map((tag, indexTag) => (
                  <h2
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ indexTag }
                    className="tag"
                  >
                    {tag}
                  </h2>
                ))}
              </div>

            </div>

          </div>

        ))}

      </div>

      <div />

      {copied && <p className="copiedPopUp">Link copied!</p>}

    </main>
  );
}

export default DoneRecipes;
