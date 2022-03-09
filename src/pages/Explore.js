import React from 'react';
import { Link } from 'react-router-dom';

function Explore() {
  return (
    <div>
      <Link to="/explore/foods">
        <button type="button" data-testid="explore-foods">Explore Foods</button>
      </Link>
      <Link to="/explore/drinks">
        <button type="button" data-testid="explore-drinks">Explore Drinks</button>
      </Link>
    </div>
  );
}

export default Explore;
