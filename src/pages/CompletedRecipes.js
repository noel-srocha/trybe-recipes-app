import React, { useState } from 'react';
import CompletedAndFavoriteCard from '../components/CompletedAndFavoriteCard';
import FilterButton from '../components/FilterButton';
import Header from '../components/Header';

export default function CompletedRecipes() {
  const pageTitle = {
    pageName: 'Receitas Feitas',
    setIcon: false,
  };
  const [filter, setFilter] = useState('All');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  return (
    <div>
      <Header value={ pageTitle } />
      <FilterButton setFilter={ setFilter } />
      {doneRecipes
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
          />
        ))}
    </div>
  );
}

// init commit
