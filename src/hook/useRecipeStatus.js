import { useState, useEffect } from 'react';
import * as verifications from '../services/verifications';

function useRecipeStatus({ id }) {
  const [doneRecipe, setDoneRecipe] = useState(true);
  const [progressRecipe, setProgressRecipe] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { verificationDoneRecipe,
    verificationIsFavorite,
    verificatioinProgressRecipe } = verifications;

  useEffect(() => {
    setDoneRecipe(verificationDoneRecipe(id));
    setProgressRecipe(verificatioinProgressRecipe(id));
    setIsFavorite(verificationIsFavorite(id));
  }, [id,
    verificatioinProgressRecipe,
    verificationDoneRecipe,
    verificationIsFavorite]);

  return [doneRecipe, progressRecipe, isFavorite, setIsFavorite];
}

export default useRecipeStatus;
