import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../components/detailPageComponents/Header';
import { fetchDrinkDetails } from '../services/index';
import CheckListIngredients from
  '../components/currentRecipeComponents/CheckListIngredients';
import RecipesContext from '../context/RecipeContext';

function CurrentDrink() {
  const { id } = useParams();
  const { push } = useHistory();
  const { enable } = useContext(RecipesContext);
  const [currentDrink, setCurrentDrink] = useState([]);

  useEffect(() => {
    async function waitingForReturn() {
      setCurrentDrink(await fetchDrinkDetails(id));
    }
    waitingForReturn();
  }, [id]);

  const handleClick = () => {
    push('/receitas-feitas');
  };

  if (currentDrink.length === 0) {
    return <h1> Carregando... </h1>;
  }
  return (
    <section>
      <Header
        thumb={ currentDrink.strDrinkThumb }
        title={ currentDrink.strDrink }
        category={ currentDrink.strAlcoholic }
        recipe={ currentDrink }
        type="bebida"
        id={ id }
      />
      <div>
        <h1>Ingredients</h1>
        <CheckListIngredients
          recipe={ currentDrink }
          type="cocktails"
        />
      </div>
      <div>
        <h1>Instructions</h1>
        <p data-testid="instructions">{currentDrink.strInstructions}</p>
      </div>
      <div>
        <button
          type="button"
          disabled={ enable }
          data-testid="finish-recipe-btn"
          onClick={ handleClick }
        >
          Finalizar Receita
        </button>
      </div>
    </section>
  );
}

export default CurrentDrink;
