import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

import Footer from '../components/Footer';

export default function Explorer({ history }) {
  const pageTitle = {
    pageName: 'Explorar',
    setIcon: false,
  };
  return (
    <div>
      <Header value={ pageTitle } />
      Explorar
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </button>

      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}

Explorer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
