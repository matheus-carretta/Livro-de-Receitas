import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Input, FormContainer, Button } from '../styles/Login';

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
    <Container className="container">
      <form onSubmit={ onSubmit } className="container">
        <FormContainer>
          <Input
            data-testid="email-input"
            type="text"
            id="email-input"
            name="email-input"
            placeholder="Email"
            className="inputLogin"
            value={ email }
            onChange={ handleChange }
            autoComplete="off"
          />

          <Input
            data-testid="password-input"
            type="password"
            id="password-input"
            name="password-input"
            placeholder="Senha"
            className="inputLogin"
            value={ password }
            onChange={ passwordChange }
          />

          <Button
            data-testid="login-submit-btn"
            type="submit"
            className="btnLogin"
            onSubmit={ onSubmit }
            disabled={ btnLogin }
          >
            Login
          </Button>
        </FormContainer>
      </form>
    </Container>
  );
}

export default Login;
