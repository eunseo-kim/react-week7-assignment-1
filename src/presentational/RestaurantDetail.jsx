import React from 'react';

import MenuItems from 'presentational/MenuItems';
import Reviews from 'presentational/Reviews';

export default function RestaurantDetail({ restaurant, children }) {
  const {
    name, address, menuItems, reviews,
  } = restaurant;

  return (
    <div>
      <h2>{name}</h2>
      <p>
        주소:
        {' '}
        {address}
      </p>
      <h3>메뉴</h3>
      <MenuItems menuItems={menuItems} />

      <h3>리뷰</h3>
      {children}
      <Reviews reviews={reviews} />
    </div>
  );
}