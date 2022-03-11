import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteCard = ({ index, recipe, removeFavorite }) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const { id, type, name, nationality, image } = recipe;
  const category = recipe.type === 'food' ? recipe.category : recipe.alcoholicOrNot;

  const copyToClipboard = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied(true);
  };

  return (
    <div>
      <Link key={ index } to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          style={ { width: '100%' } }
        />

        <p data-testid={ `${index}-horizontal-top-text` }>
          { `${nationality} - ${category}` }
        </p>

        <h2 data-testid={ `${index}-horizontal-name` }>
          { name }
        </h2>
      </Link>

      <button
        type="button"
        onClick={ copyToClipboard }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Share icon"
        />
      </button>

      {
        linkCopied && (
          <p>Link copied!</p>
        )
      }

      <button
        type="button"
        onClick={ removeFavorite }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="favorite icon"
        />
      </button>
    </div>
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
