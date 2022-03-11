import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div>
      <Header title="Profile" isSearch={ false } />
      <p>Tela de perfil</p>
      <Footer />
    </div>
  );
}

export default Profile;
