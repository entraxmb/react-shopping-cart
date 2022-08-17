import React from 'react';

export default React.createContext({
  products: [
    {
      id: 1,
      name: 'Bread',
      type: 'Baked',
      price: 1.1,
      discountApplied: '',
    },
    {
      id: 2,
      name: 'Milk',
      type: 'Dairy',
      price: 0.5,
      discountApplied: '',
    },
    {
      id: 3,
      name: 'Cheese',
      type: 'Dairy',
      price: 0.9,
      discountApplied: '',
    },
    {
      id: 4,
      name: 'Soup',
      type: 'Grocery',
      price: 0.6,
      discountApplied: '',
    },
    {
      id: 5,
      name: 'Butter',
      type: 'Dairy',
      price: 1.2,
      discountApplied: '3rd Off',
    },
  ],
  cart: [],
  addProductToCart: (product) => {},
  removeProductFromCart: (productId) => {},
  availableDiscounts: [
    {
      id: 1,
      productId: 'Cheese',
      offerId: 'Cheese',
      type: 'BOGOF',
      discount: 100,
    },
    {
      id: 2,
      productId: 'Soup',
      offerId: 'Bread',
      type: 'BOGHP',
      discount: 0.5,
    },
    {
      id: 3,
      productId: 'Butter',
      offerId: 'Butter',
      type: 'BYGTO',
      discount: 33.3,
    },
  ],
  subTotal: 0,
  totalDiscounts: 0,
  total: 0,
});
