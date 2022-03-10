import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const MIN_VALUE_PASSWORD = 6;
  const history = useHistory();

  const [btnLogin, setBtnLogin] = useState(true);

  const handleChange = ({ target: { value } }) => setEmail(value);
  const passwordChange = ({ target: { value } }) => setPassword(value);

  const onSubmit = () => {
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
    <form onSubmit={ onSubmit }>
      <label htmlFor="email-input">
        Email:
        <input
          data-testid="email-input"
          type="text"
          id="email-input"
          name="email-input"
          value={ email }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password-input">
        Senha:
        <input
          data-testid="password-input"
          type="password"
          id="password-input"
          name="password-input"
          value={ password }
          onChange={ passwordChange }
        />
      </label>

      <button
        data-testid="login-submit-btn"
        type="submit"
        onSubmit={ onSubmit }
        disabled={ btnLogin }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
