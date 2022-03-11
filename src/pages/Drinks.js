import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" isSearch type="cocktail" />
      <p>Página de bebidas</p>
      <Footer />
    </div>
  );
}

export default Drinks;
