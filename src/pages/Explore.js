import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FlexColumnContainer, ExploreBtn, ButtonLink } from '../styles/ExplorePages';

function Explore() {
  return (
    <>
      <Header title="Explore" isSearch={ false } />
      <FlexColumnContainer>
        <ButtonLink to="/explore/foods">
          <ExploreBtn type="button" data-testid="explore-foods">Explore Foods</ExploreBtn>
        </ButtonLink>
        <ButtonLink to="/explore/drinks">
          <ExploreBtn
            type="button"
            data-testid="explore-drinks"
          >
            Explore Drinks
          </ExploreBtn>
        </ButtonLink>
        <Footer />
      </FlexColumnContainer>
    </>
  );
}

export default Explore;
