import React, { useState, useEffect } from 'react';
import { objectOf, string } from 'prop-types';
import createIngredientsAndMesure from '../../helper/redoRecipe';

function IngredientsAndMeasures({ recipe }) {
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    setIngredient(createIngredientsAndMesure(recipe, 'ingredients'));
    setMeasure(createIngredientsAndMesure(recipe, 'measure'));
  }, [recipe]);
  return (
    <section className="ing-details">
      <h1>Ingredients</h1>
      <div>
        <ul>
          {ingredient.map((item, key) => (
            <li
              key={ key }
              data-testid={ `${key}-ingredient-name-and-measure` }
            >
              {`${item} - ${measure[key]}`}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
IngredientsAndMeasures.propTypes = {
  recipe: objectOf(string).isRequired,
};

export default IngredientsAndMeasures;
