import React from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchCard.css';

function SearchCard({ index, obj, type }) {
  function setType(string) {
    let tipo = '';
    if (string === 'meal') {
      tipo = 'Meal';
    } else {
      tipo = 'Drink';
    }
    return tipo;
  }
  const str = setType(type);
  return (
    <div className="sub-container-card" data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ obj[`str${str}Thumb`] } alt="" />
      <p data-testid={ `${index}-card-name` }>{ obj[`str${str}`] }</p>
    </div>

  );
}

SearchCard.propTypes = {
  obj: PropTypes.PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default SearchCard;
