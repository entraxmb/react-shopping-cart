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
                    <tr>
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
                        <td>{cartItem.quantity}</td>
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
                      <td></td>
                      <td></td>
                      <td>
                        <strong>Sub-Total:</strong>
                      </td>
                      <td>
                        <strong>
                          £{context.subTotal?.toFixed(2) || '0.00'}
                        </strong>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Discounts:</td>
                      <td className="discount-total">
                        £
                        {context.totalDiscounts?.toFixed(2) || '0.00'}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <strong>Total:</strong>
                      </td>
                      <td>
                        <strong>
                          £{context.total?.toFixed(2) || '0.00'}
                        </strong>
                      </td>
                      <td></td>
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
