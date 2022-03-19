import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { HeaderContainer, Title } from '../styles/Header';

export default function Header({ title, isSearch, type }) {
  const [toogleSearch, setToogleSearch] = useState(false);
  if (type === undefined) {
    type = 'food';
  }
  return (
    <div className="container">
      <HeaderContainer>
        <div className="profileHeader">
          <Link to="/profile">
            <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
          </Link>
        </div>
        <div className="titleHeader">
          <Title data-testid="page-title">{ title }</Title>
        </div>
        <div className="searchHeader">
          { isSearch && (
            // <Button
            //   type="button"
            //   onClick={ () => setToogleSearch(!toogleSearch) }
            // >
            //   <img src={ searchIcon } data-testid="search-top-btn" alt="search-button" />
            // </Button>
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="search-button"
              onClick={ () => setToogleSearch(!toogleSearch) }
              aria-hidden="true"
            />
          ) }
        </div>
      </HeaderContainer>
      {toogleSearch && <SearchBar type={ type } /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isSearch: PropTypes.bool.isRequired,
};
