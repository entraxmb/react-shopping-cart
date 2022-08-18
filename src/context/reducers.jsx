export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
//export const CALCULATE_DISCOUNTS = 'CALCULATE_DISCOUNTS';

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
  //const updatedSubTotal = { ...state }.subTotal;
  //console.log(updatedSubTotal);
  //const updatedTotalDiscounts = { ...state }.totalDiscounts;
  //const updatedTotal = { ...state }.total;
  //const availableDiscounts = { ...state }.availableDiscounts;
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );
  var newSubTotal = 0;
  //var newTotalDiscounts = 0;
  //var newTotal = 0;
  var tmpQty = 0;

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

    //updatedCart[updatedItemIndex].quantity++;

    // check and apply discounts
    checkedProduct = calculateCartDiscounts(
      { ...updatedItem },
      { ...state.offers }
    );

    // send back to the array
    updatedCart[updatedItemIndex] = checkedProduct;
  }

  //console.log('item:');
  //console.log(updatedCart[updatedItemIndex]);
  //console.log('cart');
  //console.log(updatedCart);

  //update the Sub-Total
  /*newSubTotal = calcSubTotal(
    { ...state }.subTotal,
    product.price,
    tmpQty,
    true
  );*/

  // work out the discounts
  /*newTotalDiscounts = calcNewTotalDiscounts(
    updatedCart,
    availableDiscounts
  );*/

  //newTotal = calcNewTotal(newSubTotal, newTotalDiscounts);

  return {
    ...state,
    cart: updatedCart,
    subTotal: newSubTotal,
    //totalDiscounts: newTotalDiscounts,
    //total: newTotal,
  };
};

const removeProductFromCart = (productId, state) => {
  const updatedCart = [...state.cart];
  let checkedProduct = {};
  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === productId
  );

  const updatedSubTotal = { ...state }.subTotal;
  //const availableDiscounts = { ...state }.availableDiscounts;
  //var tmpPrice = 0;
  //var tmpQty = 0;
  var newSubTotal = 0;
  //var newTotalDiscounts = 0;
  //var newTotal = 0;

  let updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  updatedItem.quantity--;

  //console.log('in');
  //console.log(updatedItem);

  // check and apply discounts
  updatedItem = calculateCartDiscounts(
    { ...updatedItem },
    { ...state.offers }
  );

  // console.log('out');
  //console.log(updatedItem);

  //tmpPrice = updatedItem.price;

  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
    //tmpQty = 0;
  } else {
    // check and apply discounts
    /*updatedItem = calculateCartDiscounts(updatedItem, {
      ...state.offers,
    });*/

    updatedCart[updatedItemIndex] = updatedItem;
    //tmpQty = updatedItem.quantity;
  }

  //update the Sub-Total
  /*newSubTotal = calcSubTotal(
    updatedSubTotal,
    tmpPrice,
    tmpQty,
    false
  );*/

  // work out the discounts
  /*newTotalDiscounts = calcNewTotalDiscounts(
    updatedCart,
    availableDiscounts
  );*/

  //newTotal = calcNewTotal(newSubTotal, newTotalDiscounts);
  //calculateCartDiscounts(updatedCart, { ...state.offers });

  return {
    ...state,
    cart: updatedCart,
    subTotal: newSubTotal,
    //totalDiscounts: newTotalDiscounts,
    //total: newTotal,
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

/* const calcNewTotalDiscounts = (cart, availableDiscounts) => {

  console.log(cart);
  console.log('other');
  console.log(availableDiscounts);

  

  return null;
}; */

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
  //let lineTotal = 0;

  /*if ('updatedItem' in updatedProduct !== true) {
    updatedProduct = { ...updatedProduct.updatedItem };
  }*/

  //let quantity = 1;
  if ('quantity' in updatedProduct !== true) {
    updatedProduct = { ...updatedProduct, quantity: 1 };
  }

  quantity = updatedProduct.quantity;

  //let lineTotal = 1;
  if ('lineTotal' in updatedProduct !== true) {
    updatedProduct = {
      ...updatedProduct,
      lineTotal: twoDP(updatedProduct.price * quantity),
    };
  }

  // var newPrice = 0;

  Object.keys(offers).map((key) => {
    //console.log(key); // 👉️ name, country
    //console.log(updatedProduct.id + ' --- ' + offers[key].onId); // 👉️ James, Chile

    if (updatedProduct.id === offers[key].onId) {
      //console.log('Happy Days');
      switch (offers[key].type) {
        case '3rdOff':
          discountText = '3rd OFF';
          if (updatedProduct.quantity > 1) {
            discountText += ' *multi-buy*';
          }

          if (updatedProduct.quantity <= 1) {
            // take a 1/3 off the price of each butter
            discountPricePerUnit = twoDP(
              updatedProduct.price - updatedProduct.price / 3
            );
            discountSavingPerUnit = twoDP(updatedProduct.price / 3);

            //update the original price
            originalPricePerUnit = twoDP(updatedProduct.price);

            // now switch that round, it is now the discounted price
            updatedProduct.price = twoDP(discountPricePerUnit);
          } else {
            /*originalPricePerUnit =
              updatedProduct.originalPricePerUnit;*/

            discountSavingPerUnit =
              updatedProduct.discountSavingPerUnit;
          }

          //update the total saved
          // work out the total discount total
          /*discountTotalSaved = twoDP(
            (originalPricePerUnit - discountPricePerUnit) *
              updatedProduct.quantity
          );*/

          discountTotalSaved = twoDP(
            discountSavingPerUnit * updatedProduct.quantity
          );

          // now update the totals
          //console.log('bob: ');
          //console.log(updatedProduct.price * quantity);
          updatedProduct.lineTotal = twoDP(
            updatedProduct.price * quantity
          );
          //update the line total
          /*updatedProduct.lineTotal = twoDP(
            updatedProduct.price * quantity
          );*/

          break;
        default:
          break;
      }
    }
  });

  //push the discount info into the product (even if no discounts)

  /*updatedProduct = {
    ...updatedProduct,
    discountText: discountText,
    discountedFromPricePricePerUnit: originalPricePerUnit,
    discountedPricePerUnit: discountPricePerUnit,
    discountSavingPerUnit: discountSavingPerUnit,
    discountTotalSaved: discountTotalSaved,
  };*/

  /*console.log('updated product item:');
  console.log({ product });

  console.log('discounts:');*/
  //console.log({ updatedProduct });

  return {
    ...updatedProduct,
    discountText: discountText,
    discountedFromPricePricePerUnit: originalPricePerUnit,
    discountedPricePerUnit: discountPricePerUnit,
    discountSavingPerUnit: discountSavingPerUnit,
    discountTotalSaved: discountTotalSaved,
    /*...state,
    cart: cart,
    //subTotal: newSubTotal,
    //totalDiscounts: newTotalDiscounts,
    //total: newTotal,*/
    /*text: discountText,
    pricePerUnit: discountPricePerUnit,
    savingPerUnit: discountSavingPerUnit,
    total: discountTotal,*/
  };
};

export const shopReducer = (state, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.product, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.productId, state);
    /*case CALCULATE_DISCOUNTS:
      return calculateCartDiscounts(action.cart, state);*/
    default:
      return state;
  }
};
