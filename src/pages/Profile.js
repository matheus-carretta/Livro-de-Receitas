import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const getUserEmail = localStorage.getItem('user');
  const getUserEmailObj = JSON.parse(getUserEmail);

  const history = useHistory();

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
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>

      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>

      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}

export default Profile;
