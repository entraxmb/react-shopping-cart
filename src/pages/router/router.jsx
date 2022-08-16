import React from 'react';
import { Routes, Route } from 'react-router';

import Products from '../products/products';
import Cart from '../cart/cart';

const AllRoutes = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
