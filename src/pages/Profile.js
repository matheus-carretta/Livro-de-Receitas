import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Header title="Profile" isSearch={ false } />
      <p>Tela de perfil</p>

      <label
        htmlFor="spanEmail"
        data-testid="profile-email"
      >
        Email:
        <input
          id="spanEmail"
        />
      </label>

      <button
        data-testid="profile-done-btn"
        type="button"
      >
        Done Recipes
      </button>

      <button
        data-testid="profile-favorite-btn"
        type="button"
      >
        Favorite Recipes
      </button>

      <button
        data-testid="profile-logout-btn"
        type="button"
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
