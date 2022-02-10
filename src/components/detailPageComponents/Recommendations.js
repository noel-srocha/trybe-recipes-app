import React from 'react';
import { arrayOf, objectOf, string } from 'prop-types';
import '../../css/MealsDetails.css';

function Recommendations({ recommendation }) {
  return (
    <div className="recommended-area">
      <div className="recommended-list">
        {recommendation && recommendation.map((item, index) => (
          <div
            key={ index }
            className="item"
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ item.strMealThumb || item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ item.strMeal || item.strDrink }
            />
            <div>
              <span data-testid={ `${index}-recomendation-title` }>
                { item.strMeal || item.strDrink }
              </span>
              <br />
              <span>
                { item.strCategory || item.strAlcoholic }
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Recommendations.propTypes = {
  recommendation: arrayOf(objectOf(string)).isRequired,
};

export default Recommendations;
