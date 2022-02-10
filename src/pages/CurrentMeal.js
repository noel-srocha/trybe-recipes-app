import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../components/detailPageComponents/Header';
import { fetchMealDetails } from '../services/index';
import CheckListIngredients from
  '../components/currentRecipeComponents/CheckListIngredients';
import RecipesContext from '../context/RecipeContext';

function CurrentMeal() {
  const { id } = useParams();
  const { push } = useHistory();
  const { enable } = useContext(RecipesContext);
  const [currentMeal, setCurrentMeal] = useState([]);

  useEffect(() => {
    async function waitingForReturn() {
      setCurrentMeal(await fetchMealDetails(id));
    }
    waitingForReturn();
  }, [id]);

  const handleRedirect = () => {
    push('/receitas-feitas');
  };

  if (currentMeal.length === 0) {
    return <h1> Carregando... </h1>;
  }
  return (
    <section>
      <Header
        thumb={ currentMeal.strMealThumb }
        title={ currentMeal.strMeal }
        category={ currentMeal.strCategory }
        recipe={ currentMeal }
        type="comida"
        id={ id }
      />
      <div>
        <h1>Ingredients</h1>
        <ul>
          <CheckListIngredients
            recipe={ currentMeal }
            type="meals"
          />
        </ul>
      </div>
      <div>
        <h1>Instructions</h1>
        <p data-testid="instructions">{currentMeal.strInstructions}</p>
      </div>
      <div>
        <button
          type="button"
          disabled={ enable }
          onClick={ handleRedirect }
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </div>
    </section>
  );
}

export default CurrentMeal;
