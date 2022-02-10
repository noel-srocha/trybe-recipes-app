import React, { useState } from 'react';
import Header from '../components/Header';
import FilterButton from '../components/FilterButton';
import CompletedAndFavoriteCard from '../components/CompletedAndFavoriteCard';

export default function FavouriteReciples() {
  const pageTitle = {
    pageName: 'Receitas Favoritas',
    setIcon: false,
  };
  const [filter, setFilter] = useState('All');

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  return (
    <div>
      <Header value={ pageTitle } />
      <FilterButton setFilter={ setFilter } />
      {favoriteRecipes
        .filter(({ type }) => {
          if (filter === 'All') return true;
          if (filter === 'Food' && type === 'comida') return true;
          return (filter === 'Drinks' && type === 'bebida');
        })
        .map((recipe, index) => (
          <CompletedAndFavoriteCard
            key={ index }
            index={ index }
            recipe={ recipe }
            isFavoriteRecipe
          />
        ))}
    </div>
  );
}

// commit
