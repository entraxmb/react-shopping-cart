import React, { useContext, useEffect } from 'react';
import Header from '../../components/header/header';
import ShopContext from '../../context/shop-context';

import './cart.css';

/*function getNewSubTotal(context) {
  let st = 0;

  if (context.cart.length > 0) {
    context.cart.map(function (item, i) {
      st += item.price * item.quantity;
    });
  }

  return st;
}*/

function checkDiscountType(text) {
  if (text !== null && text.length > 0) {
    return (
      <span className="badge bg-info offer-applied">{text}</span>
    );
  }
  return null;
}

function checkDiscountSaving(text) {
  let output = Number(text);
  if (output !== null && output !== '' && output !== 0) {
    return (
      <span className="offer-saving">save £{output.toFixed(2)}</span>
    );
  }
  return null;
}

function checkTotalDiscounts(text) {
  if (text !== null && text.length > 0) {
    return <span>£{text}</span>;
  }
  return <span className="black-text">£&nbsp;&nbsp;-</span>;
}

function checkDecimalPlaces(text) {
  let output = Number(text);
  if (output !== null && output !== '') {
    return output.toFixed(2);
  }
  return null;
}

const CartPage = (props) => {
  const context = useContext(ShopContext);

  useEffect(() => {
    /*console.log(context);
    context.calculateCartDiscounts(context.cart);*/
  }, []);

  return (
    <ShopContext.Consumer>
      {(context) => (
        <>
          <Header
            cartItemNumber={context.cart.reduce((count, curItem) => {
              return count + curItem.quantity;
            }, 0)}
          />
          <main>
            <div className="row g-5">
              <div className="table-responsive">
                {context.cart.length <= 0 && (
                  <p>No Item(s) in the Cart!</p>
                )}
                <table
                  id="tblCart"
                  data-testid="tblCart"
                  className="table table-striped table-sm"
                >
                  <thead>
                    <tr className="border-bottom">
                      <th scope="col">Product</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Price</th>
                      <th scope="col">Total</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {context.cart.map((cartItem) => (
                      <tr data-testid="tblCartItem" key={cartItem.id}>
                        <td>
                          {cartItem.name}
                          {checkDiscountType(cartItem.discountText)}
                        </td>
                        <td>{cartItem.quantity}</td>
                        <td>£{checkDecimalPlaces(cartItem.price)}</td>
                        <td>
                          £{checkDecimalPlaces(cartItem.lineTotal)}
                        </td>
                        <td>
                          {checkDiscountSaving(
                            cartItem.discountTotalSaved
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={context.removeProductFromCart.bind(
                              this,
                              cartItem.id
                            )}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan="3"
                        className="blank-cell cell-text-right"
                      >
                        <strong>Sub-Total:</strong>
                      </td>
                      <td colSpan="2">
                        <strong>
                          £{context.subTotal?.toFixed(2) || '0.00'}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        className="blank-cell cell-text-right"
                      >
                        Discounts:
                      </td>
                      <td colSpan="2" className="discount-total">
                        {checkTotalDiscounts(
                          context.totalDiscounts?.toFixed(2) || '-'
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        className="blank-cell cell-text-right"
                      >
                        <strong>Total:</strong>
                      </td>
                      <td colSpan="2">
                        <strong>
                          £{context.total?.toFixed(2) || ''}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </>
      )}
    </ShopContext.Consumer>
  );
};

export default CartPage;
