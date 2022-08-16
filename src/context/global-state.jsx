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
  const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });

  const addProductToCart = (product) => {
    setTimeout(() => {
      dispatch({ type: ADD_PRODUCT, product: product });
    }, 700);
  };

  const removeProductFromCart = (productId) => {
    setTimeout(() => {
      dispatch({ type: REMOVE_PRODUCT, productId: productId });
    }, 700);
  };

  return (
    <ShopContext.Provider
      value={{
        products: products,
        cart: cartState.cart,
        addProductToCart: addProductToCart,
        removeProductFromCart: removeProductFromCart,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default GlobalState;
