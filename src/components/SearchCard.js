import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/SearchCard.css';

function SearchCard({ index, obj, type }) {
  let link = '';
  function setType(string) {
    let tipo = '';
    if (string === 'meal') {
      link = 'food';
      tipo = 'Meal';
    } else {
      link = 'drink';
      tipo = 'Drink';
    }
    return tipo;
  }
  const str = setType(type);
  const idType = `id${str}`;
  return (
    <Link key={ index } to={ `/${link}s/${obj[`${idType}`]}` }>
      <div className="sub-container-card" data-testid={ `${index}-recipe-card` }>
        <img data-testid={ `${index}-card-img` } src={ obj[`str${str}Thumb`] } alt="" />
        <p data-testid={ `${index}-card-name` }>{ obj[`str${str}`] }</p>
      </div>
    </Link>
  );
}

SearchCard.propTypes = {
  obj: PropTypes.PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default SearchCard;
