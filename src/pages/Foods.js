import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { getFoodsCategoriesThunk } from '../store/actions';

function Foods() {
  const foods = useSelector((state) => state.foods); // mapStateToProps
  const dispatch = useDispatch(); // mapDispatchToProps

  useEffect(() => {
    dispatch(getFoodsCategoriesThunk());
  }, [dispatch]);

  return (
    <div>
      { foods.map((b, index) => <p key={ index }>{ b.strCategory }</p>) }
      <Footer />
    </div>
  );
}

export default Foods;
