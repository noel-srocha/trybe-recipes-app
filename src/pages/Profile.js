import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile({ history }) {
  const pageTitle = {
    pageName: 'Perfil',
    setIcon: false,
  };

  const emailObj = JSON.parse(localStorage.getItem('user'));

  const outPage = () => {
    localStorage.clear();
    history.push('/');
  };

  const test = () => {
    if (emailObj === null) {
      return <h4 data-testid="profile-email">Email</h4>;
    } return <h4 data-testid="profile-email">{ emailObj.email }</h4>;
  };

  return (
    <div>
      <Header value={ pageTitle } />
      <div>
        { test() }
      </div>
      Perfil
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
      </div>

      <div>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => outPage() }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
