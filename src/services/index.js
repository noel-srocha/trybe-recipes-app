export async function fetchMealsIngredient(ingredient) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchMealsName(name) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchMealsLetter(letter) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data.meals;
}

export async function fetchDrinksIngredient(ingredient) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.ingredients;
}

export async function fetchDrinksName(name) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  return data.drinks;
}

export async function fetchDrinksLetter(letter) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data.drinks;
}

export async function fetchMealsRecommendation() {
  const count = 0;
  const max = 6;

  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  const data = meals.slice(count, max);
  return data;
}

export async function fetchDrinksRecommendation() {
  const count = 0;
  const max = 6;

  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  const data = drinks.slice(count, max);
  return data;
}

export async function fetchDrinkDetails(id) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { drinks } = await response.json();
  return drinks[0];
}

export async function fetchMealDetails(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const { meals } = await response.json();
  return meals[0];
}
