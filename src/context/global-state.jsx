/*
 ** Key:
 **
 ** BOGIHP - Buy One get another item Half Price
 ** BOGOF  - Buy One get One of the Same Type Free
 ** 3rdOff - Get 3rd Off this Product
 **/

import React, { useState, useReducer } from 'react';

import ShopContext from './shop-context';
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT } from './reducers';

const GlobalState = (props) => {
  const products = [
    {
      id: 1,
      name: 'Bread',
      type: 'Baked',
      price: 1.1,
    },
    {
      id: 2,
      name: 'Milk',
      type: 'Dairy',
      price: 0.5,
    },
    {
      id: 3,
      name: 'Cheese',
      type: 'Dairy',
      price: 0.9,
    },
    {
      id: 4,
      name: 'Soup',
      type: 'Grocery',
      price: 0.6,
    },
    {
      id: 5,
      name: 'Butter',
      type: 'Dairy',
      price: 1.2,
    },
  ];

  const offers = [
    {
      id: 1,
      on: 'Cheese',
      onId: 3,
      get: 'Cheese',
      getId: 3,
      type: 'BOGOF',
      discount: 100,
    },
    {
      id: 2,
      on: 'Soup',
      onId: 4,
      get: 'Bread',
      getId: 1,
      type: 'BOGIHP',
      discount: 50,
    },
    {
      id: 3,
      on: 'Butter',
      onId: 5,
      get: 'Butter',
      getId: 5,
      type: '3rdOff',
      discount: 33.3,
    },
  ];

  const [cartState, dispatch] = useReducer(shopReducer, {
    cart: [],
    subTotal: 0,
    totalDiscounts: 0,
    total: 0,
    offers: offers,
  });

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

  /*const calculateCartDiscounts = (cart) => {
    setTimeout(() => {
      dispatch({ type: CALCULATE_DISCOUNTS, cart: cart });
    }, 100);
  };*/

  return (
    <ShopContext.Provider
      value={{
        products: products,
        cart: cartState.cart,
        subTotal: cartState.subTotal,
        totalDiscounts: cartState.totalDiscounts,
        total: cartState.total,
        offers: cartState.offers,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default GlobalState;
