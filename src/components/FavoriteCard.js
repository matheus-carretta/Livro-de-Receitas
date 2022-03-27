import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/share.png';
import pinkHeartIcon from '../images/pinkHeart.png';
import '../styles/FavoriteCard.css';
import { RecipeCard, RecipeImgContainer, CardInfos,
  CardTopInfos } from '../styles/DoneRecipes';
import { Icon } from '../styles/Header';

const FavoriteCard = ({ index, recipe, removeFavorite }) => {
  const [copied, setLinkCopied] = useState(false);

  const { id, type, name, nationality, image } = recipe;
  const category = recipe.type === 'food' ? recipe.category : recipe.alcoholicOrNot;

  const copyToClipboard = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied(true);
  };

  return (
    <RecipeCard key={ index }>
      <RecipeImgContainer>
        <img
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          className="imageCard"
        />
      </RecipeImgContainer>
      <CardInfos>
        <CardTopInfos>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { `${nationality} - ${category}` }
          </p>

          <button
            type="button"
            onClick={ copyToClipboard }
          >
            <Icon
              size="25px"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="Share icon"
            />
          </button>

          <button
            type="button"
            onClick={ removeFavorite }
          >
            <Icon
              size="30px"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ pinkHeartIcon }
              alt="favorite icon"
            />
          </button>
        </CardTopInfos>

        <h2 data-testid={ `${index}-horizontal-name` }>
          { name }
        </h2>

        {copied && <p className="copiedPopUp">Link copied!</p>}

      </CardInfos>
    </RecipeCard>
  );
};

FavoriteCard.propTypes = {
  index: PropTypes.number,
  removeFavorite: PropTypes.func,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
}.isRequired;

export default FavoriteCard;
