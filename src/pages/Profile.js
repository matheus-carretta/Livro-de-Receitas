import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';
import { FilterButton } from '../styles/DoneRecipes';
import { ProfileContainer, EmailSpan } from '../styles/Profile';

function Profile() {
  const [userEmail, setUserEmail] = useState('teste@teste.com');

  const history = useHistory();

  useEffect(() => {
    const getUserEmail = JSON.parse(localStorage.getItem('user'));
    if (getUserEmail !== null) {
      setUserEmail(getUserEmail.email);
    }
  }, []);

  return (
    <>
      <Header title="Profile" isSearch={ false } />

      <ProfileContainer>
        <EmailSpan data-testid="profile-email">
          { userEmail }
        </EmailSpan>

        <FilterButton
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </FilterButton>

        <FilterButton
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </FilterButton>

        <FilterButton
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            history.push('/');
            localStorage.clear();
          } }
        >
          Logout
        </FilterButton>
      </ProfileContainer>
      <Footer />
    </>
  );
}

export default Profile;
