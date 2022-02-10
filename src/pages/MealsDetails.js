import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Header from '../components/detailPageComponents/Header';
import Recommendations from '../components/detailPageComponents/Recommendations';
import * as required from '../services/index';
import { verificatioinProgressRecipe,
  verificationDoneRecipe } from '../helper/recipeStatus';
import IngredientsAndMeasures from
  '../components/detailPageComponents/IngredientsAndMeasures';

function MealsDetails() {
  const { id } = useParams();
  const { push } = useHistory();

  const [recipe, setRecipe] = useState({});
  const [recommendation, setRecommendation] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(true);
  const [progressRecipe, setProgressRecipe] = useState(false);

  const { fetchDrinksRecommendation,
    fetchMealDetails } = required;

  useEffect(() => {
    async function waitingForReturn() {
      setRecipe(await fetchMealDetails(id));
      setRecommendation(await fetchDrinksRecommendation());
      setDoneRecipe(verificationDoneRecipe(id));
      setProgressRecipe(verificatioinProgressRecipe(id));
    }
    waitingForReturn();
  }, [id, fetchMealDetails, fetchDrinksRecommendation]);

  const handleRedirect = () => {
    push(`/comidas/${id}/in-progress`);
  };

  const footerStyle = { position: 'fixed',
    bottom: '0px' };

  if (recipe.length === 0) {
    return <h1> Carregando... </h1>;
  }
  return (
    <section>
      <Header
        thumb={ recipe.strMealThumb }
        title={ recipe.strMeal }
        category={ recipe.strCategory }
        recipe={ recipe }
        type="comida"
        id={ id }
      />
      <IngredientsAndMeasures
        recipe={ recipe }
      />
      <div>
        <h1>Instructions</h1>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <div>
        <ReactPlayer
          url={ recipe.strYoutube }
          controls
          data-testid="video"
        />
      </div>
      <div>
        <Recommendations
          recommendation={ recommendation }
        />
      </div>
      <div>
        {!doneRecipe && (
          <button
            style={ footerStyle }
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleRedirect }
          >
            { progressRecipe ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        )}
      </div>
    </section>
  );
}

export default MealsDetails;
