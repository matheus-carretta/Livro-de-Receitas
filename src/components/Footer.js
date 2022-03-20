import React from 'react';
import { Link } from 'react-router-dom';
// import drinkIcon from '../images/drinkIcon.svg';
// import exploreIcon from '../images/exploreIcon.svg';
// import mealIcon from '../images/mealIcon.svg';
import { FooterContainer, Icon } from '../styles/Footer';

import drinkIcon from '../images/wine-glass.png';
import exploreIcon from '../images/cardapio.png';
import mealIcon from '../images/salada.png';

function Footer() {
  return (
    <FooterContainer data-testid="footer">
      <Link to="/drinks">
        <Icon src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explore">
        <Icon src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/foods">
        <Icon src={ mealIcon } alt="mealIcon" data-testid="food-bottom-btn" />
      </Link>
    </FooterContainer>
  );
}

export default Footer;
