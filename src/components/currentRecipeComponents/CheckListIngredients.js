import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { objectOf, string } from 'prop-types';
import createIngredientsAndMesure from '../../helper/redoRecipe';
import { verificatioinProgressRecipe } from '../../services/verifications';
import RecipesContext from '../../context/RecipeContext';
import { savingProgress } from '../../helper/setLocalStorage';

function CheckListIngredients({ recipe, type }) {
  const { setEnable, setIsChecked } = useContext(RecipesContext);
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [checkedList, setCheckedList] = useState({});

  useEffect(() => {
    setIsChecked(verificatioinProgressRecipe(id));
    setIngredients(createIngredientsAndMesure(recipe, 'ingredients'));
    setMeasures(createIngredientsAndMesure(recipe, 'measure'));
  }, [recipe, id, setIsChecked]);

  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progress) {
      const prevProgress = progress[type][id];
      prevProgress.forEach((item) => (
        setCheckedList((prevSaved) => (
          { ...prevSaved,
            [item]: true,
          }
        ))));
    }
  }, [id, type]);

  useEffect(() => {
    const checks = Object.keys(checkedList);
    const lengtkChecks = checks.length;
    const li = document.querySelectorAll('#ingredients');

    if (lengtkChecks > 0 && lengtkChecks === li.length) {
      setEnable((prevState) => !prevState);
    }
  }, [checkedList, setEnable]);

  useEffect(() => {
    function saveProgress() {
      const checks = Object.keys(checkedList);
      if (checks.length) {
        let prevProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
        if (!prevProgress) {
          const localDefault = {};
          localStorage.setItem('inProgressRecipes', JSON.stringify(localDefault));
          prevProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
        }
        localStorage.setItem('inProgressRecipes',
          JSON.stringify(savingProgress(checks, type, id, prevProgress)));
      }
    }
    saveProgress();
  }, [checkedList, id, type]);

  const styleText = { textDecoration: 'line-through' };
  const styleNone = { textDecoration: 'none' };

  return (
    <ul>
      { ingredients.map((item, key) => (
        <li
          key={ key }
          id="ingredients"
          data-testid={ `${key}-ingredient-step` }
          style={ checkedList[item] ? styleText : styleNone }
        >
          <input
            type="checkbox"
            value={ item }
            checked={ checkedList[item] }
            onChange={ ({ target:
              { value, checked } }) => setCheckedList(
              { ...checkedList, [value]: checked },
            ) }
          />
          {`${item} - ${measures[key]}`}
        </li>
      )) }
    </ul>
  );
}

CheckListIngredients.propTypes = {
  recipe: objectOf(string).isRequired,
  type: string.isRequired,
};

export default CheckListIngredients;
