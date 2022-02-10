import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import fetchApi from '../services/fetchApi';

const URLS = {
  meals: [
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
  ],
  drinks: [
    'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
  ],
};

export default function MainRecipePage({ type, recipesState }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState('');
  const isRecipesState = !recipesState.length <= 0;
  useEffect(() => {
    async function getFilters() {
      const newData = await fetchApi(URLS[type][0]);
      const maxLength = 5;
      setFilters(newData[type].slice(0, maxLength));
    }
    getFilters();
  }, [type]);

  useEffect(() => {
    async function getData(noFilter) {
      const newData = await fetchApi(noFilter
        ? URLS[type][1]
        : `${URLS[type][2]}${filter}`);
      const maxLength = 12;
      setData(newData[type].slice(0, maxLength));
    }
    if (filter === '') getData(true);
    else getData(false);
  }, [filter, type]);

  return (
    <div>
      <div>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ () => {
            setFilter('');
          } }
        >
          All
        </button>
        {filters.map(({ strCategory }) => (
          <button
            data-testid={ `${strCategory}-category-filter` }
            type="button"
            key={ strCategory }
            onClick={ ({ target }) => {
              if (target.innerHTML === filter) setFilter('');
              else setFilter(target.innerHTML);
            } }
          >
            {strCategory}
          </button>
        ))}
      </div>
      {(isRecipesState ? recipesState : data).map(({
        idMeal = null,
        strMeal = null,
        strMealThumb = null,
        idDrink = null,
        strDrink = null,
        strDrinkThumb = null,
      }, index) => (
        <Card
          key={ index }
          id={ idMeal || idDrink }
          name={ strMeal || strDrink }
          imgUrl={ strMealThumb || strDrinkThumb }
          index={ index }
          isMeal={ type === 'meals' }
        />
      ))}
    </div>
  );
}

MainRecipePage.propTypes = {
  type: PropTypes.string.isRequired,
  recipesState: PropTypes.arrayOf.isRequired,
};
