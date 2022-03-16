import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import SearchBar from './SearchBar';

export default function Header({ title, isSearch, type }) {
  const [toogleSearch, setToogleSearch] = useState(false);
  if (type === undefined) {
    type = 'food';
  }
  return (
    <div className="container">
      <header>
        <div className="profileHeader">
          <Link to="/profile">
            <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
          </Link>
        </div>
        <div className="titleHeader">
          <h1 data-testid="page-title">{ title }</h1>
        </div>
        <div className="searchHeader">
          { isSearch && (
            <button
              type="button"
              onClick={ () => setToogleSearch(!toogleSearch) }
            >
              <img src={ searchIcon } data-testid="search-top-btn" alt="search-button" />
            </button>
          ) }
        </div>
      </header>
      {toogleSearch && <SearchBar type={ type } /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isSearch: PropTypes.bool.isRequired,
};
