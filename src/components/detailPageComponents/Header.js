import React from 'react';
import { string, objectOf } from 'prop-types';
import ShareAndFavorite from './ShareAndFavorite';

function Header({ thumb, title, category, recipe, type, id }) {
  return (
    <header className="header-detail">
      <img
        className="header-img"
        src={ thumb }
        alt={ title }
        data-testid="recipe-photo"
        width="100%"
      />
      <h1 data-testid="recipe-title">{ title }</h1>
      <h2 data-testid="recipe-category">{ category }</h2>
      <ShareAndFavorite recipe={ recipe } type={ type } id={ id } />
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
  thumb: string.isRequired,
  category: string.isRequired,
  recipe: objectOf(string).isRequired,
  type: string.isRequired,
  id: string.isRequired,
};

export default Header;
