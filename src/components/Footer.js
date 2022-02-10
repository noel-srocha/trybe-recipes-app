import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const footerStyle = { position: 'fixed',
    bottom: '0px' };
  return (
    <footer data-testid="footer" style={ footerStyle }>
      <div>
        <Link to="/bebidas">
          <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
        </Link>
      </div>
      <div>
        <Link to="/explorar">
          <img src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
        </Link>
      </div>
      <div>
        <Link to="/comidas">
          <img src={ mealIcon } alt="mealIcon" data-testid="food-bottom-btn" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
