import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const getUserEmail = localStorage.getItem('user');
  const getUserEmailObj = JSON.parse(getUserEmail);

  console.log(getUserEmailObj.email);

  return (
    <div>
      <Header title="Profile" isSearch={ false } />
      <p>Tela de perfil</p>

      <span data-testid="profile-email">
        { getUserEmailObj.email }
      </span>

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
