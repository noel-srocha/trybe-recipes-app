import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ value }) {
  const { pageName, setIcon } = value;
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => () => {
    setShowSearchBar(false);
  }, [setShowSearchBar]);

  function isVerified() {
    if (showSearchBar === false) {
      return setShowSearchBar(true);
    }
    return setShowSearchBar(false);
  }

  function hiddenInput() {
    if (showSearchBar) {
      return (
        <SearchBar />
      );
    }
  }

  function handleButton() {
    if (setIcon) {
      return (
        <>
          <button
            type="button"
            onClick={ isVerified }
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="buscar" />
          </button>
          { hiddenInput() }
        </>
      );
    }
  }

  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/perfil') }
      >
        <img
          data-testid="profile-top-btn"
          alt="User"
          src={ profileIcon }
        />
      </button>
      <h1 data-testid="page-title">{ pageName }</h1>
      { handleButton() }
    </header>
  );
}

Header.propTypes = {
  value: PropTypes.shape({
    pageName: PropTypes.string,
    setIcon: PropTypes.bool,
  }).isRequired,
};

export default Header;
