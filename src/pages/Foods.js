import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header title="Foods" isSearch type="meal" />
      <p>Página principal</p>
      <Footer position="fixed" />
    </div>
  );
}

export default Foods;
