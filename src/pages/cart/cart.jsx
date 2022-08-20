import React, { useContext, useEffect } from 'react';
import Header from '../../components/header/header';
import ShopContext from '../../context/shop-context';

import './cart.css';

var discountBadge = '';
var footerText = '';
var isFooterTextVisible = false;

function checkDiscountType(text) {
  if (text !== null && text.length > 0) {
    showDiscountBadge(text);
  } else {
    discountBadge = '';
  }

  return;
}

function checkForFooterText(text) {
  if (text !== null && text.length > 0) {
    if (text === 'FALSE') {
      showFooterText('');
      isFooterTextVisible = false;
    } else {
      showFooterText(text);
      isFooterTextVisible = true;
    }
  }
  return;
}

function showDiscountBadge(text) {
  if (text !== null && text.length > 0) {
    discountBadge = (
      <span className="offer-applied badge bg-info">{text}</span>
    );
  }
  return discountBadge;
}

function showFooterText(text) {
  if (text !== null && text.length > 0) {
    footerText = <span className="footer-text">{text}</span>;
  } else {
    footerText = '';
  }
  return footerText;
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

  useEffect(() => {}, []);

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
                  className="table table-sm"
                >
                  <thead className="table-light">
                    <tr className="border-bottom">
                      <th scope="col" className="col-3">
                        Product
                      </th>
                      <th scope="col" className="col2">
                        Qty
                      </th>
                      <th scope="col" className="col2">
                        Price
                      </th>
                      <th scope="col" className="col"></th>
                      <th scope="col" className="col">
                        Total
                      </th>
                      <th scope="col" className="col"></th>
                      <th scope="col" className="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {context.cart.map((cartItem) => (
                      <tr data-testid="tblCartItem" key={cartItem.id}>
                        <td>
                          {cartItem.name}
                          {checkDiscountType(cartItem.discountText)}
                          {discountBadge}
                          {checkForFooterText(
                            cartItem.footnote || ''
                          )}
                        </td>
                        <td>{cartItem.quantity}</td>
                        <td>£{checkDecimalPlaces(cartItem.price)}</td>
                        <td></td>
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
                            className="cell-button btn btn-danger btn-sm"
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
                  </tbody>
                  <tfoot className="tfooter">
                    <tr className="blank-row">
                      <td colSpan="3" className="blank-cell">
                        {footerText}
                      </td>
                      <td className="cell-text-right footer-cell">
                        <strong>Sub-Total:</strong>
                      </td>
                      <td className="footer-cell">
                        <strong>
                          £{context.subTotal?.toFixed(2) || '0.00'}
                        </strong>
                      </td>
                      <td colSpan="2" className="blank-cell"></td>
                    </tr>
                    <tr className="blank-row">
                      <td colSpan="3" className="blank-cell"></td>
                      <td className="cell-text-right footer-cell">
                        Discounts:
                      </td>
                      <td className="discount-total footer-cell">
                        {checkTotalDiscounts(
                          context.totalDiscounts?.toFixed(2) || '-'
                        )}
                      </td>
                      <td colSpan="2" className="blank-cell"></td>
                    </tr>
                    <tr className="blank-row">
                      <td colSpan="3" className="blank-cell"></td>
                      <td className="cell-text-right footer-cell">
                        <strong>Total:</strong>
                      </td>
                      <td className="footer-cell">
                        <strong>
                          £{context.total?.toFixed(2) || ''}
                        </strong>
                      </td>
                      <td colSpan="2" className="blank-cell"></td>
                    </tr>
                  </tfoot>
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
