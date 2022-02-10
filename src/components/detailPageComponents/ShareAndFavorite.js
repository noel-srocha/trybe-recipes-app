import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { string, objectOf } from 'prop-types';
import { verificationIsFavorite } from '../../helper/recipeStatus';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import { favoriteRecipes } from '../../helper/setLocalStorage';

function ShareAndFavorite({ recipe, type, id }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let bool;
    if (type === 'comida') {
      bool = verificationIsFavorite(recipe.idMeal);
    } else {
      bool = verificationIsFavorite(recipe.idDrink);
    }
    setIsFavorite(bool);
  }, [recipe, type]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(favoriteRecipes(recipe, type)));
  };

  const handleShare = () => {
    const time = 2000;
    if (type === 'comida') {
      navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/bebidas/${id}`);
    }
    setShow(true);
    setTimeout(() => setShow(false), time);
  };

  return (
    <>
      <input
        type="image"
        onClick={ handleShare }
        src={ shareIcon }
        data-testid="share-btn"
        alt="To share"
      />
      <input
        type="image"
        onClick={ handleFavorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite"
        data-testid="favorite-btn"
      />
      <Alert show={ show }>
        Link copiado!
      </Alert>
    </>
  );
}

ShareAndFavorite.propTypes = {
  recipe: objectOf(string).isRequired,
  type: string.isRequired,
  id: string.isRequired,
};

export default ShareAndFavorite;
