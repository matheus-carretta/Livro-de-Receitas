import React from 'react';
import { Link } from 'react-router-dom';
import Wine from '../images/wine-glass.png';
import Soup from '../images/soup.png';
import Cardapio from '../images/cardapio.png';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
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
          src={ Soup }
          width="40px"
          height="40px"
          alt="mealIcon"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
