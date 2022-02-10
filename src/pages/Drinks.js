import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import MainRecipePage from '../components/MainRecipePage';
import fetchApi from '../services/fetchApi';

export default function Drinks() {
  const pageTitle = {
    pageName: 'Bebidas',
    setIcon: true,
  };
  const { ingredientFilter } = useContext(RecipeContext);
  const [useDrink, setUseDrink] = useState(false);

  const history = useHistory();
  const { recipesState, redirect } = useContext(RecipeContext);
  const getDrinksId = recipesState.map((drink) => drink.idDrink);
  const limits = 12;
  const newRecipe = [];

  useEffect(() => {
    async function fetchDrinksIngredient() {
      const { drinks } = await fetchApi(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientFilter}`);
      if (drinks.length < limits) {
        setUseDrink(drinks);
      } else {
        setUseDrink(drinks.splice(0, limits));
      }
    }
    if (ingredientFilter !== '') {
      fetchDrinksIngredient();
    }
  }, [ingredientFilter]);

  if (recipesState.length > 0 && !redirect) {
    newRecipe.push(...recipesState.slice(0, limits));
  }

  return (
    <div>
      <Header value={ pageTitle } />
      { redirect ? history.push(`/bebidas/${getDrinksId}`) : (
        <MainRecipePage type="drinks" recipesState={ useDrink || newRecipe } />
      ) }
      <Footer />
    </div>
  );
}
