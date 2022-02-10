import React from 'react';
import PropTypes from 'prop-types';

export default function FilterButton({ setFilter }) {
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ ({ target }) => setFilter(target.innerHTML) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ ({ target }) => setFilter(target.innerHTML) }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ ({ target }) => setFilter(target.innerHTML) }
      >
        Drinks
      </button>
    </div>
  );
}

FilterButton.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
