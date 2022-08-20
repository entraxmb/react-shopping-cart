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

  useEffect(() => {
    const timestamp = new Date().getTime();
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
            <div className="row row-cols-1">
              <div className="col-md col table-responsive">
                <table
                  id="tblCart"
                  data-testid="tblCart"
                  className="table table-sm"
                >
                  <thead className="table-light">
                    <tr className="border-bottom">
                      <th scope="col" className="col-sm-5">
                        Product
                      </th>
                      <th scope="col" className="col-sm-2"></th>
                      <th scope="col" className="col-sm-1">
                        Qty
                      </th>
                      <th scope="col" className="col-sm-1">
                        Price
                      </th>
                      <th scope="col" className="col-sm-1">
                        Total
                      </th>
                      <th scope="col" className="col-sm-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {context.cart.length <= 0 && (
                      <tr>
                        <td colSpan={6}>
                          <p>No Item(s) in the Cart!</p>
                        </td>
                      </tr>
                    )}

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
                        <td>
                          {checkDiscountSaving(
                            cartItem.discountTotalSaved
                          )}
                        </td>
                        <td>{cartItem.quantity}</td>
                        <td>£{checkDecimalPlaces(cartItem.price)}</td>

                        <td>
                          £{checkDecimalPlaces(cartItem.lineTotal)}
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
                      <td className="blank-cell">{footerText}</td>
                      <td colSpan="3" className="cell-text-right">
                        <strong>Sub-Total:</strong>
                      </td>
                      <td className="footer-cell">
                        <strong>
                          £{context.subTotal?.toFixed(2) || '0.00'}
                        </strong>
                      </td>
                      <td className="blank-cell"></td>
                    </tr>
                    <tr className="blank-row">
                      <td className="blank-cell"></td>
                      <td colSpan="3" className="cell-text-right">
                        Discounts:
                      </td>
                      <td className="discount-total footer-cell">
                        {checkTotalDiscounts(
                          context.totalDiscounts?.toFixed(2) || '-'
                        )}
                      </td>
                      <td className="blank-cell"></td>
                    </tr>
                    <tr className="blank-row">
                      <td className="blank-cell"></td>
                      <td colSpan="3" className="cell-text-right">
                        <strong>Total:</strong>
                      </td>
                      <td className="footer-cell">
                        <strong>
                          £{context.total?.toFixed(2) || ''}
                        </strong>
                      </td>
                      <td className="blank-cell"></td>
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
