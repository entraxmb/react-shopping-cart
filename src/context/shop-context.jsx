import React from 'react';

export default React.createContext({
  products: [
    { id: 1, name: 'Bread', type: 'Baked', price: 1.1 },
    { id: 2, name: 'Milk', type: 'Dairy', price: 0.5 },
    { id: 3, name: 'Cheese', type: 'Dairy', price: 0.9 },
    { id: 4, name: 'Soup', type: 'Grocery', price: 0.6 },
    { id: 5, name: 'Butter', type: 'Dairy', price: 1.2 },
  ],
  cart: [],
  addProductToCart: (product) => {},
  removeProductFromCart: (productId) => {},
});
