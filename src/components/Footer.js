import React from 'react';
import { Link } from 'react-router-dom';
import Wine from '../images/wine-glass.png';
import Salad from '../images/salada.png';
import Cardapio from '../images/cardapio.png';
import { FooterContainer } from '../styles/Footer';

function Footer() {
  return (
    <FooterContainer data-testid="footer">
      <Link to="/drinks">
        <img
          src={ Wine }
          width="40px"
          height="40px"
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explore">
        <img
          src={ Cardapio }
          alt="exploreIcon"
          width="35px"
          height="35px"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/foods">
        <img
          src={ Salad }
          width="40px"
          height="40px"
          alt="mealIcon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </FooterContainer>
  );
}

export default Footer;
