export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  const updatedSubTotal = { ...state }.subTotal;
  const updatedTotalDiscounts = { ...state }.totalDiscounts;
  const updatedTotal = { ...state }.total;
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );
  var newSubTotal = 0;
  var newTotalDiscounts = 0;
  var newTotal = 0;
  var tmpQty = 0;

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1 });
    tmpQty = 1;
  } else {
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity++;
    updatedCart[updatedItemIndex] = updatedItem;
    tmpQty = updatedItem.quantity;
  }

  //update the Sub-Total
  newSubTotal = calcSubTotal(
    updatedSubTotal,
    product.price,
    tmpQty,
    true
  );

  newTotalDiscounts = calcNewTotalDiscounts(updatedCart);

  newTotal = calcNewTotal(newSubTotal, newTotalDiscounts);

  return {
    ...state,
    cart: updatedCart,
    subTotal: newSubTotal,
    totalDiscounts: newTotalDiscounts,
    total: newTotal,
  };
};

const removeProductFromCart = (productId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );

  const updatedSubTotal = { ...state }.subTotal;
  var tmpPrice = 0;
  var tmpQty = 0;
  var newSubTotal = 0;
  var newTotalDiscounts = 0;
  var newTotal = 0;

  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;

  tmpPrice = updatedItem.price;

  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
    tmpQty = 0;
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
    tmpQty = updatedItem.quantity;
  }

  //update the Sub-Total
  newSubTotal = calcSubTotal(
    updatedSubTotal,
    tmpPrice,
    tmpQty,
    false
  );

  // work out the discounts
  newTotalDiscounts = calcNewTotalDiscounts(updatedCart);

  newTotal = calcNewTotal(newSubTotal, newTotalDiscounts);

  return {
    ...state,
    cart: updatedCart,
    subTotal: newSubTotal,
    totalDiscounts: newTotalDiscounts,
    total: newTotal,
  };
};

const calcSubTotal = (currentSubTotal, price, qty, add) => {
  var newSubTotal = 0;

  if (add) {
    newSubTotal = currentSubTotal + price;
  } else {
    newSubTotal = currentSubTotal - price;
  }

  return newSubTotal;
};

const calcNewTotalDiscounts = (cart) => {
  console.log(cart);

  //loop through the cart checking for discounts
  /*cart.map((cartItem) => (
    if(c)
  );*/

  return null;
};

const calcNewTotal = (subTotal, totalDiscounts) => {
  return subTotal - totalDiscounts;
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    default:
      return state;
  }
};
