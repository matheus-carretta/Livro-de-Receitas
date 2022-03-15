import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('teste@teste.com');

  const history = useHistory();

  useEffect(() => {
    const getUserEmail = localStorage.getItem('user');
    if (getUserEmail === null) {
      setUserEmail('teste@teste.com');
    } else {
      const getUserEmailObj = JSON.parse(getUserEmail);
      setUserEmail(getUserEmailObj.email);
    }
  }, []);

  return (
    <div>
      <Header title="Profile" isSearch={ false } />

      <div className="container">
        <span data-testid="profile-email" className="emailProfile">
          { userEmail }
        </span>

        <button
          data-testid="profile-done-btn"
          type="button"
          className="btnsProfile"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          data-testid="profile-favorite-btn"
          type="button"
          className="btnsProfile"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          type="button"
          className="btnsProfile"
          onClick={ () => {
            history.push('/');
            localStorage.clear();
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
