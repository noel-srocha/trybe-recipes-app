import { useState } from 'react';

const useRedoRecipe = (recipe) => {
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);

  let count = 1;
  const arrIngredient = [];
  const arrMeasure = [];

  while (recipe[`strIngredient${count}`]) {
    arrIngredient.push(recipe[`strIngredient${count}`]);
    arrMeasure.push(recipe[`strMeasure${count}`]);
    count += 1;
  }

  setIngredient(arrIngredient);
  setMeasure(arrMeasure);

  return [ingredient, measure];
};

export default useRedoRecipe;
