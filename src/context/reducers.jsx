import shopContext from './shop-context';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

function twoDP(number, lang = 'en-GB') {
  var formatter = new Intl.NumberFormat(lang, {
    maximumSignificantDigits: 2,
  });

  return Number(formatter.format(number));
}

const addProductToCart = (product, state) => {
  let updatedCart = [...state.cart];
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
      { ...state.offers },
      updatedCart
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
      { ...state.offers },
      updatedCart
    );

    // send back to the array
    updatedCart[updatedItemIndex] = checkedProduct;
  }

  //console.log('sending:');
  //console.log(updatedCart);

  //check for secondary discounts
  updatedCart = calcSecondaryDiscounts(updatedCart, {
    ...state.offers,
  });

  //console.log('returned:');
  //console.log(updatedCart);

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
  let updatedCart = [...state.cart];
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
    { ...state.offers },
    updatedCart
  );

  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  //check for secondary discounts
  updatedCart = calcSecondaryDiscounts(updatedCart, {
    ...state.offers,
  });

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

//check for secondary discounts
const calcSecondaryDiscounts = (cart, offers) => {
  let modifiedCart = cart;
  const discountList = offers;
  let updatedItem = {};

  Object.keys(discountList).map((key) => {
    switch (discountList[key].type) {
      case 'BOGIHP':
        const getId = discountList[key].getId;
        const getName = discountList[key].get;
        const onId = discountList[key].onId;
        const onName = discountList[key].on;
        const discount = discountList[key].discount;

        const getIdInCart = modifiedCart.findIndex(
          (item) => item.id === getId
        );

        const onIdInCart = modifiedCart.findIndex(
          (item) => item.id === onId
        );

        if (getIdInCart >= 0 && onIdInCart >= 0) {
          // you have both items in the cart
          updatedItem = {
            ...modifiedCart[getIdInCart],
          };

          // work out the total discount total
          updatedItem.discountTotalSaved = twoDP(
            updatedItem.price - updatedItem.price * (discount / 100)
          );

          updatedItem.discountText =
            discount + '% OFF (with Soup, limit 1 per order)';

          modifiedCart[getIdInCart] = updatedItem;
        } else {
          // you don't have both items in the cart - reset the discount status
          updatedItem = {
            ...modifiedCart[getIdInCart],
          };

          // work out the total discount total
          updatedItem.discountTotalSaved = 0;

          updatedItem.discountText = '';

          modifiedCart[getIdInCart] = updatedItem;
        }

        break;
      default:
        break;
    }
  });
  return modifiedCart;
};

// update the cart entry adding the discounts
const calculateCartDiscounts = (
  product,
  offers,
  allItemsInCart,
  state
) => {
  const currentProduct = product;
  const currentCart = allItemsInCart || {};
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
    //check if the offered items are on the same product (onID === getId)
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
            updatedProduct.price * updatedProduct.quantity
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
