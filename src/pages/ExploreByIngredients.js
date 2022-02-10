// import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeContext from '../context/RecipeContext';

export default function ExploreByIngredients() {
  const [foodIngredient, setFoodIngredient] = useState([]);
  const [drinkIngredient, setDrinkIngredient] = useState([]);
  const { pathname } = useLocation();
  const { setIngredientFilter } = useContext(RecipeContext);

  const pageTitle = {
    pageName: 'Explorar Ingredientes',
    setIcon: false,
  };

  useEffect(() => {
    async function fetchData() {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const { meals } = await request.json();
      setFoodIngredient(meals);
    }
    fetchData();
  }, [setFoodIngredient]);

  useEffect(() => {
    async function fetchDrink() {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const { drinks } = await request.json();
      setDrinkIngredient(drinks);
    }
    fetchDrink();
  }, [setDrinkIngredient]);

  const srcImg = (name) => `https://www.themealdb.com/images/ingredients/${name}-Small.png`;

  if (foodIngredient.length === 0) {
    return <div>Loading</div>;
  }

  const TWELVE = 12;

  const renderDrinks = () => {
    if (pathname.includes('/bebidas/')) {
      return (
        <div>
          { drinkIngredient
            .slice(0, TWELVE)
            .map(({ strIngredient1 }, index) => (
              <Link
                key={ index }
                to="/bebidas"
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => setIngredientFilter(strIngredient1) }
              >
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  data-testid={ `${index}-card-img` }
                  alt={ strIngredient1 }
                />
                <div>
                  <h4
                    data-testid={ `${index}-card-name` }
                  >
                    { strIngredient1 }
                  </h4>
                </div>
              </Link>
            )) }
        </div>
      );
    }
  };

  return (
    <div>
      <Header value={ pageTitle } />
      FOODS
      <div>
        { renderDrinks() || foodIngredient
          .slice(0, TWELVE)
          .map(({ strIngredient, idIngredient }, index) => (
            <Link
              key={ idIngredient }
              to="/comidas"
              onClick={ () => setIngredientFilter(strIngredient) }
              data-testid={ `${index}-ingredient-card` }
            >
              <img
                src={ srcImg(strIngredient) }
                data-testid={ `${index}-card-img` }
                alt={ strIngredient }
              />
              <div>
                <h4
                  data-testid={ `${index}-card-name` }
                >
                  { strIngredient }
                </h4>
              </div>
            </Link>
          )) }
      </div>
      <Footer />
    </div>
  );
}
