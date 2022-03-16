import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const MIN_VALUE_PASSWORD = 6;
  const history = useHistory();

  const [btnLogin, setBtnLogin] = useState(true);

  const handleChange = ({ target: { value } }) => setEmail(value);
  const passwordChange = ({ target: { value } }) => setPassword(value);

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  useEffect(() => {
    const re = /\S+@\S+\.\S+/;
    const checkPassword = password.length > MIN_VALUE_PASSWORD;
    setBtnLogin(!(re.test(email) && checkPassword));
  }, [email, password]);

  return (
    <div className="container">
      <h2 className="titleLogin">Login</h2>
      <form onSubmit={ onSubmit } className="container">
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            type="text"
            id="email-input"
            name="email-input"
            placeholder="Email"
            className="inputLogin"
            value={ email }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            type="password"
            id="password-input"
            name="password-input"
            placeholder="Senha"
            className="inputLogin"
            value={ password }
            onChange={ passwordChange }
          />
        </label>

        <button
          data-testid="login-submit-btn"
          type="submit"
          className="btnLogin"
          onSubmit={ onSubmit }
          disabled={ btnLogin }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
