import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Input from '../components/Input';
import RecipesContext from '../context/RecipeContext';
import '../css/Login.css';

function Login({ history }) {
  const [password, setPassword] = useState('');
  const [validLogin, setValid] = useState(false);
  const { email, setEmail } = useContext(RecipesContext);

  function validatePassword() {
    const MIN_LENGTH = 6;
    if (password.length >= MIN_LENGTH) {
      setValid(true);
    }
  }

  function validateEmail() {
    const regexEmail = /\S+@\S+\.\S+/;
    const check = regexEmail.test(email);
    return check;
  }

  function submitLogin() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  return (
    <main className="login-page">
      <header className="login-title">
        <h2>Login</h2>
      </header>
      <div className="form-login">
        <div>
          <Input
            type="text"
            name="email"
            id="email-input"
            className="email-input"
            placeholder="Digite seu e-mail"
            value={ email }
            onChange={ ({ target }) => {
              setEmail(target.value);
              validatePassword();
            } }
          />
        </div>
        <div>
          <Input
            type="password"
            name="password"
            className="password-input"
            value={ password }
            placeholder="Digite sua senha"
            id="password-input"
            onChange={ ({ target }) => {
              setPassword(target.value);
              validatePassword();
            } }
          />
        </div>
      </div>
      <div className="container-button">
        <button
          className="submit-login"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validLogin || !validateEmail() }
          onClick={ () => submitLogin() }
        >
          Entrar
        </button>
      </div>
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
