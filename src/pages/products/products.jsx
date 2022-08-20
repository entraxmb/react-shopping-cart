import React from 'react';
import Header from '../../components/header/header';
import ShopContext from '../../context/shop-context';
import './offer-box.css';

const ProductsPage = (props) => {
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
              <div className="col-md-8 col table-responsive">
                <table
                  id="tblProducts"
                  data-testid="tblProducts"
                  className="table table-striped table-sm"
                >
                  <thead className="table-light">
                    <tr className="border-bottom">
                      <th scope="col" className="col-sm-7">
                        Product
                      </th>
                      <th scope="col" className="col-sm">
                        Price
                      </th>
                      <th scope="col" className="col-sm-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {context.products.map((product) => (
                      <tr
                        data-testid="tblProductItem"
                        key={product.id}
                      >
                        <td>
                          <strong>{product.name}</strong>
                        </td>
                        <td>Price: £{product.price.toFixed(2)}</td>
                        <td>
                          <button
                            className="cell-button btn btn-primary btn-sm"
                            onClick={context.addProductToCart.bind(
                              this,
                              product
                            )}
                          >
                            Add to Cart
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-4 col">
                <div className="card mb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3 text-center">
                    <h4 className="my-0 fw-normal">Offers</h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-group w-auto">
                      <li className="mb-0 opacity-75">
                        Buy a Cheese, you get a second Cheese FREE!
                      </li>
                      <li className="mb-0 opacity-75">
                        Buy Soup, you get a half price Bread!
                      </li>
                      <li className="mb-0 opacity-75">
                        Get a Third off Butter!
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </ShopContext.Consumer>
  );
};

export default ProductsPage;
