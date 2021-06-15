import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from './RestaurantDetail';
import Reviews from './Reviews';
import { loadRestaurant } from './actions';

import { get } from './utils';

export default function RestaurantContainer({ restaurantId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  const restaurant = useSelector(get('restaurant'));
  const { reviews } = restaurant || { reviews: [] };

  if (!restaurant) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
      <Reviews items={reviews} />
    </>
  );
}
