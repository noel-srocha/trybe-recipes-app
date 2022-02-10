import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import MainRecipePage from '../components/MainRecipePage';
import fetchApi from '../services/fetchApi';

export default function Food() {
  const pageTitle = {
    pageName: 'Comidas',
    setIcon: true,
  };
  const { ingredientFilter } = useContext(RecipeContext);
  const [useIngredient, setUseIngredient] = useState(false);

  const history = useHistory();

  const { recipesState, redirect } = useContext(RecipeContext);
  const getMealId = recipesState.map((meal) => meal.idMeal);
  const limits = 12;
  const newRecipe = [];

  useEffect(() => {
    async function fetchIngredients() {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientFilter}`;
      const { meals } = await fetchApi(url);
      if (meals.length < limits) {
        setUseIngredient(meals);
      } else {
        setUseIngredient(meals.slice(0, limits));
      }
    }
    if (ingredientFilter !== '') {
      fetchIngredients();
    }
  }, [ingredientFilter]);

  if (recipesState.length > 0 && !redirect) {
    newRecipe.push(...recipesState.slice(0, limits));
  }

  return (
    <div>
      <Header value={ pageTitle } />
      { redirect ? history.push(`/comidas/${getMealId}`) : (
        <MainRecipePage type="meals" recipesState={ useIngredient || newRecipe } />
      ) }
      <Footer />
    </div>
  );
}
