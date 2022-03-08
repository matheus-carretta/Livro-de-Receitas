import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email-input">
        Email:
        <input
          data-testid="email-input"
          type="text"
          id="email-input"
          name="email-input"
        />
      </label>

      <label htmlFor="password-input">
        Senha:
        <input
          data-testid="password-input"
          type="password"
          id="password-input"
          name="password-input"
        />
      </label>

      <button
        data-testid="login-submit-btn"
        type="submit"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
