import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from './RestaurantDetail';
import ReviewForm from './ReviewForm';
import ReviewItems from './ReviewItems';

import {
  loadRestaurant,
  changeReviewFields,
  sendReview,
} from './actions';

import { get } from './utils';

export default function RestaurantContainer({ restaurantId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  const restaurant = useSelector(get('restaurant'));
  const accessToken = useSelector(get('accessToken'));

  if (!restaurant) {
    return (
      <p>Loading...</p>
    );
  }

  function handleChange({ name, value }) {
    dispatch(changeReviewFields({ name, value }));
  }

  function handleSubmit() {
    dispatch(sendReview(restaurantId));
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
      {
        accessToken ? (
          <ReviewForm
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        ) : null
      }
      <ReviewItems reviewItems={restaurant.reviews} />
    </>
  );
}