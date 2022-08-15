import React from 'react';
import { Routes, Route } from 'react-router';

import Shop from '../shop/shop';
import Cart from '../cart/cart';

const AllRoutes = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
