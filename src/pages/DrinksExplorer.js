import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DrinksExplorer() {
  const pageTitle = {
    pageName: 'Explorar Bebidas',
    setIcon: false,
  };

  const [surpriseDrink, setSurpriseDrink] = useState(0);

  useEffect(() => {
    const getRandomMeal = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((res) => res.json());
      return setSurpriseDrink(response.drinks[0].idDrink);
    };
    getRandomMeal();
  }, []);
  const randomId = surpriseDrink;

  function surpriseMe() {
    if (randomId > 0) {
      return (
        <Link to={ `/bebidas/${randomId}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            name="Me Surpreenda!"
          >
            Me Surpreenda!
          </button>
        </Link>
      );
    }
    return <span> Carregando...</span>;
  }

  return (
    <div>
      <Header value={ pageTitle } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          name="Por Ingredientes"
        >
          Por Ingredientes
        </button>
      </Link>
      { surpriseMe() }
      <Footer />
    </div>
  );
}
