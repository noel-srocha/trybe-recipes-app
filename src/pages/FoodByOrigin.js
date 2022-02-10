import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchApi from '../services/fetchApi';
import Card from '../components/Card';

const URLS = [
  'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
  'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
];

export default function FoodsByOrigin() {
  const pageTitle = {
    pageName: 'Explorar Origem',
    setIcon: true,
  };

  const [areaOptions, setAreaOptions] = useState([]);
  const [chosenArea, setChosenArea] = useState('');
  const [areaMeals, setAreaMeals] = useState([]);

  useEffect(() => {
    async function getAreaOptions() {
      const { meals } = await fetchApi(URLS[0]);
      setAreaOptions(meals);
    }
    getAreaOptions();
  }, []);

  useEffect(() => {
    async function getMeals(noFilter) {
      const { meals } = await fetchApi(noFilter
        ? URLS[1]
        : `${URLS[2]}${chosenArea}`);
      const maxLength = 12;
      setAreaMeals(meals.slice(0, maxLength));
    }
    getMeals(chosenArea === '');
  }, [chosenArea]);

  return (
    <div>
      <Header value={ pageTitle } />
      <select
        data-testid="explore-by-area-dropdown"
        name="area-dropdown"
        onChange={ ({ target }) => {
          setChosenArea(target.value === 'All' ? '' : target.value);
        } }
      >
        <option
          value="All"
          data-testid="All-option"
        >
          All
        </option>
        {areaOptions.map(({ strArea }) => (
          <option
            value={ strArea }
            key={ strArea }
            data-testid={ `${strArea}-option` }
          >
            {strArea}
          </option>
        ))}
      </select>
      {areaMeals.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <Card
          key={ index }
          id={ idMeal }
          name={ strMeal }
          imgUrl={ strMealThumb }
          index={ index }
          isMeal
        />
      ))}
      <Footer />
    </div>
  );
}
