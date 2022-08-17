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

function checkDiscount(discount) {
  if (discount !== null && discount.length > 0) {
    return <span class="badge bg-info offer-applied">{discount}</span>;
  }
  return null;
}

const CartPage = (props) => {
  const context = useContext(ShopContext);

  useEffect(() => {
    //console.log(context);
  }, []);

  //const subTotal = getNewSubTotal(context);

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
                    </tr>
                  </thead>
                  <tbody>
                    {context.cart.map((cartItem) => (
                      <tr data-testid="tblCartItem" key={cartItem.id}>
                        <td>{cartItem.name}</td>
                        <td>
                          {cartItem.quantity}
                          {checkDiscount(cartItem.discountApplied)}
                        </td>
                        <td>£{cartItem.price.toFixed(2)}</td>
                        <td>
                          £
                          {(
                            cartItem.price.toFixed(2) *
                            cartItem.quantity
                          ).toFixed(2)}
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
                        colspan="3"
                        className="blank-cell cell-text-right"
                      >
                        <strong>Sub-Total:</strong>
                      </td>
                      <td colspan="2">
                        <strong>
                          £{context.subTotal?.toFixed(2) || '0.00'}
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="3"
                        className="blank-cell cell-text-right"
                      >
                        Discounts:
                      </td>
                      <td colspan="2" className="discount-total">
                        £
                        {context.totalDiscounts?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="3"
                        className="blank-cell cell-text-right"
                      >
                        <strong>Total:</strong>
                      </td>
                      <td colspan="2">
                        <strong>
                          £{context.total?.toFixed(2) || '0.00'}
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
