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

      <label htmlFor="passsword-input">
        Senha:
        <input
          data-testid="passsword-input"
          type="passsword"
          id="passsword-input"
          name="passsword-input"
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
