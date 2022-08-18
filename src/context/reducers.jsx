export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

function twoDP(number, lang = 'en-GB') {
  var formatter = new Intl.NumberFormat(lang, {
    maximumSignificantDigits: 2,
  });

  return Number(formatter.format(number));
}

const addProductToCart = (product, state) => {
  const updatedCart = [...state.cart];
  let updatedItem = {};
  let checkedProduct = {};
  var newSubTotal = 0;
  var newTotalDiscounts = 0;
  var newTotal = 0;
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    // check and apply discounts
    checkedProduct = calculateCartDiscounts(
      { ...product },
      { ...state.offers }
    );

    updatedCart.push(checkedProduct);
  } else {
    //pull the correct line item into the array
    updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity++;

    // check and apply discounts
    checkedProduct = calculateCartDiscounts(
      { ...updatedItem },
      { ...state.offers }
    );

    // send back to the array
    updatedCart[updatedItemIndex] = checkedProduct;
  }

  // work out the new sub-total
  newSubTotal = calcSubTotal(updatedCart);

  // work out the total discounts
  newTotalDiscounts = calcNewTotalDiscounts(updatedCart);

  // work out the new cart total
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
  let checkedProduct = {};
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );

  const updatedSubTotal = { ...state }.subTotal;
  var newSubTotal = 0;
  var newTotalDiscounts = 0;
  var newTotal = 0;

  let updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;

  // check and apply discounts
  updatedItem = calculateCartDiscounts(
    { ...updatedItem },
    { ...state.offers }
  );

  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  // update the new sb-total
  newSubTotal = calcSubTotal(updatedCart);

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

const calcSubTotal = (cart) => {
  var newSubTotal = 0;

  Object.keys(cart).map((key) => {
    newSubTotal = newSubTotal + cart[key].price * cart[key].quantity;
  });

  return newSubTotal;
};

// loop through the cart getting the discounts
const calcNewTotalDiscounts = (cart) => {
  let totalDiscounts = 0;

  Object.keys(cart).map((key) => {
    totalDiscounts = totalDiscounts + cart[key].discountTotalSaved;
  });

  return totalDiscounts;
};

const calcNewTotal = (subTotal, totalDiscounts) => {
  return subTotal - totalDiscounts;
};

// update the cart entry adding the discounts
const calculateCartDiscounts = (product, offers, state) => {
  const currentProduct = product;
  let updatedProduct = { ...product };
  let quantity = product.quantity || 0;
  let discountText = product.discountText || '';
  let discountPricePerUnit = product.discountedPricePerUnit || 0;
  let discountSavingPerUnit = product.discountSavingPerUnit || 0;
  let discountTotalSaved = product.discountTotalSaved || 0;
  let originalPricePerUnit =
    product.discountedFromPricePricePerUnit || 0;

  if ('quantity' in updatedProduct !== true) {
    updatedProduct = { ...updatedProduct, quantity: 1 };
  }

  quantity = updatedProduct.quantity;

  if ('lineTotal' in updatedProduct !== true) {
    updatedProduct = {
      ...updatedProduct,
      lineTotal: twoDP(updatedProduct.price * quantity),
    };
  }

  Object.keys(offers).map((key) => {
    if (updatedProduct.id === offers[key].onId) {
      switch (offers[key].type) {
        case 'BOGOF':
          if (updatedProduct.quantity > 1) {
            discountText = 'BOGOF';
          }

          const mCalc = Math.floor(
            updatedProduct.quantity - updatedProduct.quantity / 2
          );

          discountSavingPerUnit = twoDP(updatedProduct.price * mCalc);

          // work out the total discount total
          discountTotalSaved = twoDP(discountSavingPerUnit);

          // now update the totals
          updatedProduct.lineTotal = twoDP(
            updatedProduct.price * quantity
          );

          if (mCalc > 1) {
            discountText += ' *multi-buy*';
          }

          break;
        case '3rdOff':
          discountText = '3rd OFF';
          if (updatedProduct.quantity > 1) {
            discountText += ' *multi-buy*';
          }

          if (updatedProduct.quantity <= 1) {
            // take a 1/3 off the price of each butter
            discountSavingPerUnit = twoDP(updatedProduct.price / 3);
          } else {
            discountSavingPerUnit =
              updatedProduct.discountSavingPerUnit;
          }

          // work out the total discount total
          discountTotalSaved = twoDP(
            discountSavingPerUnit * updatedProduct.quantity
          );

          // now update the totals
          updatedProduct.lineTotal = twoDP(
            updatedProduct.price * quantity
          );

          break;
        default:
          break;
      }
    }
  });

  return {
    ...updatedProduct,
    discountText: discountText,
    discountedFromPricePricePerUnit: originalPricePerUnit,
    discountedPricePerUnit: discountPricePerUnit,
    discountSavingPerUnit: discountSavingPerUnit,
    discountTotalSaved: discountTotalSaved,
  };
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
