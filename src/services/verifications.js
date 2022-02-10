export function verificationDoneRecipe(id) {
  const doneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipe) {
    const result = doneRecipe.some((item) => item.id === id);
    return result;
  } return false;
}

export function verificatioinProgressRecipe(id) {
  let inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgress) inProgress = [];
  const categories = Object.keys(inProgress);
  const idRecipe = categories.map((item) => Object.keys(inProgress[item]));
  return idRecipe.some((item) => item[0] === id);
}

export function verificationIsFavorite(id) {
  const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipe) {
    const result = favoriteRecipe.some((item) => item.id === id);
    return result;
  } return false;
}
