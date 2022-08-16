import React, { useState, useReducer } from 'react';

import ShopContext from './shop-context';
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT } from './reducers';

const GlobalState = (props) => {
  const products = [
    { id: 1, name: 'Bread', type: 'Baked', price: 1.1 },
    { id: 2, name: 'Milk', type: 'Dairy', price: 0.5 },
    { id: 3, name: 'Cheese', type: 'Dairy', price: 0.9 },
    { id: 4, name: 'Soup', type: 'Grocery', price: 0.6 },
    { id: 5, name: 'Butter', type: 'Dairy', price: 1.2 },
  ];
  const [cartState, dispatch] = useReducer(shopReducer, {
    cart: [],
    subTotal: 0,
  });
  const availableDiscounts = [
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
      type: 'BOGOHP',
      discount: 0.5,
    },
    {
      id: 3,
      productId: 'Butter',
      offerId: 'Butter',
      type: '3rdOff',
      discount: 33.3,
    },
  ];

  const addProductToCart = (product) => {
    setTimeout(() => {
      dispatch({ type: ADD_PRODUCT, product: product });
    }, 100);
  };

  const removeProductFromCart = (productId) => {
    setTimeout(() => {
      dispatch({ type: REMOVE_PRODUCT, productId: productId });
    }, 100);
  };

  return (
    <ShopContext.Provider
      value={{
        products: products,
        cart: cartState.cart,
        subTotal: cartState.subTotal,
        totalDiscounts: cartState.totalDiscounts,
        total: cartState.total,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default GlobalState;
